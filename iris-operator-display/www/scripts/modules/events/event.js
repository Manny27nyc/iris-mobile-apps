/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(function () {
    var event = function (name) {
        var name = name;
        var callbacks = [];
        var ids = [];
        var id = 0;

        return {
            subscribe: function (callback) {
                var result = id;
                callbacks.push(callback);
                ids.push(id);
                id += 1;
                return result;
            },
            unsubscribe: function (id) {
                if (ids.indexOf(id) === -1) return false;
                var callback_index = ids.indexOf(id);

                callbacks.splice(callback_index, 1);
                ids.splice(callback_index, 1);

                return true;
            },
            notify: function (sender) {
                for (var i = 0, l = callbacks.length; i < l; i += 1) {
                    callbacks[i].apply(sender, Array.prototype.slice.call(arguments, 1));
                }
            },
            getName: function () {
                return name;
            }
        };
    };
    return event;
});