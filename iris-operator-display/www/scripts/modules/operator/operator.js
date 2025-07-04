// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
define(['modules/operator/events'], function (OperatorEvents) {

    var Operator = function (installation, office_id, operator_id) {

        var attr = {
            "installation": installation,
            "office_id": office_id,
            "id": operator_id
        };


        this.on = function (name, callback) {
            events.subscribe(name, callback);
        };

        this.get = function (name) {
            if (attr.hasOwnProperty(name)) {
                return attr[name];
            }
        };

        var events = new OperatorEvents(this);

    };

    return Operator;
});