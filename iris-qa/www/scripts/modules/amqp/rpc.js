/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(['modules/amqp/connection', 'bluebird'], function (connection, Promise) {
    var rpc_pull = [];
    var waiting_for_reply = [];

    function defer() {
        var resolve, reject;
        var promise = new Promise(function () {
            resolve = arguments[0];
            reject = arguments[1];
        });
        return {
            resolve: resolve,
            reject: reject,
            promise: promise
        };
    };

    var sendStored = function () {
        for (var i = 0, l = rpc_pull.length; i < l; i += 1) {
            send(rpc_pull[i]);
        }
        rpc_pull = [];
    };

    var send = function (params) {
        var data_to_send = JSON.stringify(params.data);
        var client = connection.getClient();
        var tx = client.begin();

        var options = {
            "transaction": tx.id,
            "reply-to": '/temp-queue/get_rpc' + tx.id,
            "content-type": "text/plain"
        };
        client.send('/reply-queue/' + params.path, options, data_to_send);

        if (params['dont-store'] !== true) {
            waitReply(tx.id, params.defer);
        }

        tx.commit();
    };

    var waitReply = function (id, callback) {
        if (typeof callback === 'undefined' || callback === null) return;

        waiting_for_reply.push({
            "id": id,
            "callback": callback
        });

        if (waiting_for_reply.length > 100) {
            console.warn('Too many not answered rpc-calls!');
        }

    };

    var storeRPC = function (params) {
        rpc_pull.push(params);
    };

    var getCallback = function (id) {
        for (var i = 0; i < waiting_for_reply.length; i++) {
            if (waiting_for_reply[i].id == id) {
                return {
                    "callback": waiting_for_reply[i].callback,
                    "index": i
                };
            }
        }
        return false;
    };

    connection.on('receive', function (message) {
        var subscription = message.headers.subscription;
        var tx_id = subscription.replace('/temp-queue/get_rpc', '');
        var waiting = getCallback(tx_id);

        if (!waiting) {
            return;
        }

        var callback_defer = waiting.callback;
        var index = waiting.index;
        var body = message.body;

        if (body.indexOf('__iris_proto_object') !== -1) {
            requirejs(['modules/dehydrate'], function (dehydrate) {
                callback_defer.resolve(dehydrate(body));
            });
        } else {
            callback_defer.resolve(JSON.parse(body));
        }

        waiting_for_reply.splice(index, 1);
    });

    connection.on('connect', function () {
        sendStored();
    });

    var storeOrSend = function (params) {

        if (connection.isConnected()) {
            send(params);
        } else {
            storeRPC(params);
        }
    };

    return {
        execute: function (path, data) {
            var d = new defer();
            var params = {
                'defer': d,
                'path': path,
                'data': data
            };

            storeOrSend(params);
            return d.promise;
        },
        send: function (path, data) {
            var params = {
                'path': path,
                'data': data,
                'dont-store': true
            };

            storeOrSend(params);

            return true;
        },

    };
});