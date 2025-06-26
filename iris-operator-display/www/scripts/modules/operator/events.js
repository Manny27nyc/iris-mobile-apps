/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(['modules/amqp/amqp', 'modules/operator/events_atomic', 'modules/operator/events_compound'], function (amqp, atomic, compound) {

    var OperatorEvents = function (operator) {

        var installation = operator.get('installation');
        var office_id = operator.get('office_id');
        var operator_id = operator.get('id');

        var getPath = function (event_name) {
            var path = 'iris.event.operator.' + event_name + '.in_' + installation + '.cn_null.of_' + office_id + '.op_' + operator_id + '.#';
            return path;
        };

        return {
            subscribe: function (event_name, callback) {
                if (atomic.hasEvent(event_name)) {
                    var path = getPath(event_name);
                    var sub = amqp.subscribe(path, callback);
                    return '';
                } else
                if (compound.hasEvent(event_name)) {
                    var event = compound.getEvents(event_name);
                    var path = getPath(event);
                    var prepare = compound.dataPreparation(event_name);

                    var sub = amqp.subscribe(path, function (message) {
                        var data = prepare.call(compound, message);
                        callback(data);
                    });

                    return sub;
                } else {
                    console.log('Event does not exist');
                    return false;
                }
            },
            unsubscribe: function (id) {
                return false;
            }
        }
    };

    return OperatorEvents;
});