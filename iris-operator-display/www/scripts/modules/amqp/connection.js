// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
define(['modules/settings', 'modules/events/event-list', 'stomp'], function (settings, EventList) {
    console.log('connection init');

    var recconnect_interval = 10000;
    var connected = false;
    var client = null;
    var connect_interval = 0;
    var ws;
    var url = 'http://' + settings.get('ip') + ':' + settings.get('port') + '/stomp';

    var events = new EventList(this)
        .addEvent('lost')
        .addEvent('receive')
        .addEvent('connect');

    var initClient = function () {
        if (ws !== undefined) {
            try {
                ws.close();
                client.disconnect(function () {});
            } catch (e) {}
        }

        ws = new SockJS(url);
        client = Stomp.over(ws);

        client.heartbeat.outgoing = 0;
        client.heartbeat.incoming = 0;
    };

    var restartClient = function () {
        console.log('reconnecting');
        if (connected) events.notify('lost');

        connected = false;

        if (connect_interval) {
            clearInterval(connect_interval);
        }

        connect_interval = setTimeout(function () {
            startClient();
        }, recconnect_interval);

    };

    var startClient = function () {
        initClient();
        client.connect('guest', 'guest', on_connect, on_error, '/');
        client.onreceive = on_receive;
        client.debug = null;

    };

    var on_connect = function () {
        console.log('amqp connected');

        connected = true;

        clearInterval(connect_interval);
        events.notify('connect');
    };


    var on_error = function () {
        console.log('something bad happens');
        restartClient();
    };

    var on_receive = function (message) {
        events.notify('receive', message);
    };



    recconnect_interval = 2000;
    restartClient();
    recconnect_interval = 10000;

    return {
        restart: function () {
            restartClient();
        },
        getClient: function () {
            return connected ? client : false;
        },
        on: function (event_name, callback) {
            events.subscribe(event_name, callback);
        },
        isConnected: function () {
            return connected;
        }

    };
});