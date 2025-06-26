/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(['modules/amqp/connection'], function (connection) {

    var queue_pull = [],
        queue_id = 0;

    connection.on('connect', function () {
        var client = connection.getClient();

        if (client === false) {
            return;
        }
        for (var i = 0, l = queue_pull.length; i < l; i += 1) {
            client.subscribe(queue_pull[i].path, queue_pull[i].callback);
        }
    });

    return {
        subscribe: function (path, callback, options) {
            //@TODO: some optimization could be done here. ex., one subscribe for same events
            var default_options = {
                post_box: 'topic'
            };

            if (typeof options === 'undefined') {
                options = default_options;
            }
            queue_id++;

            queue_pull.push({
                'queue_id': queue_id,
                'path': "/" + options.post_box + "/" + path,
                'callback': callback
            });

            var client = connection.getClient();

            if (client === false) {
                return;
            }

            client.subscribe("/topic/" + path, callback);
            return queue_id;
        },
        unsubscribe: function (sub_id) {

            return true;
        }
    };

});