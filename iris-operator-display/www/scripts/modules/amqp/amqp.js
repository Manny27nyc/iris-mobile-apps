define(['modules/amqp/connection', 'modules/amqp/queue', 'modules/amqp/rpc', 'modules/events/event-list'], function (connection, queue, rpc, EventList) {
    console.log('amqp init');

    //connection indicator
    connection.on('lost', function () {
        requirejs(['modules/helpers/connection-indicator'], function (indicator) {
            indicator.off();
        });
    });

    connection.on('connect', function () {
        requirejs(['modules/helpers/connection-indicator'], function (indicator) {
            indicator.on();
        });
    });

    var events = new EventList(this)
        .addEvent('heartbeat');

    var options = {
        post_box: 'exchange'
    };

    queue.subscribe('iris_time_events/iris.event.time', function (d) {
        events.notify('heartbeat', d);
    }, options);


    var heartbeat = function (retry_count) {
        var heartbeats_heap = 0;
        var interval = 10 * 1000;

        var timer = setInterval(function () {
            heartbeats_heap++;
            if (heartbeats_heap > retry_count) {
                console.warn('No heartbeat. Restart');
                heartbeats_heap = 0;
                connection.restart();
            }
        }, interval + 3000);

        events.subscribe('heartbeat', function () {
            if (heartbeats_heap > 0) {
                heartbeats_heap--;
            }
        });
    };

    heartbeat(3);

    return {
        subscribe: function (path, callback, options) {
            return queue.subscribe(path, callback, options);
        },
        execute: function (path, data) {
            var p = rpc.execute(path, data);
            return p;
        },
        unsubscribe: function (sub_id) {
            return queue.subscriptions(sub_id);
        },
        on: function (event_name, callback) {
            events.subscribe(event_name, callback);
        }
    };
});