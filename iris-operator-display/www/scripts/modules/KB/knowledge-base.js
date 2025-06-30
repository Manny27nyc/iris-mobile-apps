// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
define(['modules/amqp/amqp', 'modules/settings'], function (amqp, settings) {

    var makePath = function (namespace) {
        return 'iris_rpc_kb_get_queue_' + namespace;
    };

    var makeData = function (office_id, kbPath) {
        return {
            "officeId": office_id,
            "kbPath": kbPath
        };
    };

    return {
        getLinbDesignAsync: function (office_id, operator_id, namespace) {
            namespace = namespace || settings.get('amqp_namespace');

            var path = makePath(namespace);
            var data = makeData(office_id, "/operator/" + operator_id + "/operatorDisplayDesign/code");
            var p = amqp.execute(path, data)
                .then(function (row_script) {
                    var script = row_script !== null ? row_script : '';
                    script = script.replace(/&br;/g, '\n').replace(/&quot;/g, '\'');

                    return script;
                });

            return p;
        },
        getTimezoneAsync: function (namespace) {
            namespace = namespace || settings.get('amqp_namespace');

            var path = makePath(namespace);
            var data = makeData(null, "/serverConfig/timezone");

            return amqp.execute(path, data);
        }
    };
});