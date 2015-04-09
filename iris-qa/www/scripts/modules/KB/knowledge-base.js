define(['modules/amqp/amqp', 'modules/settings'], function (amqp, settings) {
    console.log('init kb');

    var makePath = function (namespace) {
        namespace = namespace || settings.get('amqp_namespace');

        return 'iris_rpc_kb_get_queue_' + namespace;
    };

    var makeData = function (office_id, kbPath) {
        return {
            "officeId": office_id,
            "kbPath": kbPath
        };
    };

    var prepareLinbScript = function (linb_script) {
        var script = linb_script !== null ? linb_script : '';
        script = script.replace(/&br;/g, '\n').replace(/&quot;/g, '\'');
        return script;
    };

    return {
        getOperatorDisplayAsync: function (office_id, operator_id, namespace) {
            var path = makePath(namespace);
            var data = makeData(office_id, "/operator/" + operator_id + "/operatorDisplayDesign/code");
            var p = amqp.execute(path, data)
                .then(prepareLinbScript);

            return p;
        },
        getHoldDesignAsync: function (office_id, operator_id, namespace) {
            var path = makePath(namespace);
            var data = makeData(office_id, "/operator/" + operator_id + "/qaTerminalDesign/code");
            var p = amqp.execute(path, data)
                .then(prepareLinbScript);

            return p;
        },
        getTimezoneAsync: function (namespace) {
            var path = makePath(namespace);
            var data = makeData(null, "/serverConfig/timezone");

            return amqp.execute(path, data);
        },
        getQA: function (office_id, service_id, namespace) {
            var path = makePath(namespace);
            var data = makeData(office_id, "/service/" + service_id + "/qa");

            return amqp.execute(path, data);
        },
        saveQAResults: function (results, namespace) {

            if (results.results.length === 0) return false;

            namespace = namespace || settings.get('amqp_namespace');
            var path = "iris_rpc_set_qa_result_queue_" + namespace;
            console.log(results);
            amqp.send(path, results);
            return true;
        }
    };
});