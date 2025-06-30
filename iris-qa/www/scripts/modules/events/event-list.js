// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
define(['modules/events/event'], function (event) {

    var event_list = function (sender, names) {

        var events_pull = {};

        var addEvent = function (name) {
            if (String(name).length)
                events_pull[name] = new event(name);
            return this;
        };

        var getEvent = function (name) {
            if (events_pull.hasOwnProperty(name)) {
                return events_pull[name];
            } else {
                //@error handler
                console.log('wrong event name');
                return false;
            }

            return this;
        };
        var build = function () {
            for (var i = 0, l = names.length; i < l; i += 1) {
                addEvent(name[i]);
            }
        };

        var notify = function (name) {
            var disp_event = getEvent(name);
            var args = Array.prototype.slice.call(arguments, 1);
            args.unshift(sender);
            disp_event.notify.apply(disp_event, args);
        };

        var subscribe = function (name, callback) {
            var selected_event = getEvent(name);
            if (selected_event) {
                return selected_event.subscribe(callback);
            }

            return false;
        };

        var unsubscribe = function (name) {
            var selected_event = getEvent(name);
            selected_event.unsubscribe(callback);
        };

        return {
            notify: notify,
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            addEvent: addEvent
        }


    };
    return event_list;
});