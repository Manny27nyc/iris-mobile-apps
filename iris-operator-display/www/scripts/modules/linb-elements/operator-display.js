define(['modules/KB/knowledge-base', 'bluebird', 'modules/amqp/amqp', 'modules/linb-elements/clock'], function (kb, Promise, amqp, clock) {

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

    var OperatorDisplay = function (operator) {
        var script = '',
            placeholder = '--',
            default_color = '#515151',
            caption = '.linb-odrequestnumber-caption',
            default_size = '250pt',
            d = new defer(),
            element_received = d.promise;

        var script_received = kb.getLinbDesignAsync(operator.get('office_id'), operator.get('id'));

        var init_complete = Promise.props({
            script: script_received,
            element_id: element_received
        }).then(function (params) {
            var element = params.element_id;
            var script = params.script;
            var append = 'customAppend : function(parent, subId, left, top){ linb("' + element + '").append(this._nodes); return true; }';

            script = script.replace("customAppend : function(parent, subId, left, top){\n            return false;\n        }", append);
            script = '<script type="text/javascript">' + script + '</script>';

            var script_element = $(script);

            $('#' + element).empty();

            $('body').append(script_element);
        }).then(function () {
            return new Promise(function (resolve, reject) {
                linb.Com.load("App", resolve, "en");
            });
        }).then(function () {
            LinbUtil_SetData4DesignComponents('ODRequestNumber', placeholder, null);
            LinbUtil_SetData4DesignComponents('ODOperatorNumber', operator.get('id'), null);
            LinbUtil_RefreshComponentsData();
        }).then(function () {
            default_color = $(caption).css('color');
            default_size = $(caption).css('font-size');
        }).then(function () {
            clock.init().then(function () {
                amqp.on('heartbeat', function (d) {
                    clock.update(d.body);
                });
            });
        });


        return {
            render: function (element_id) {
                d.resolve(element_id);
                return init_complete;
            },
            update: function (params) {
                //params = {
                //  state: 'string',
                //  request_number: 'string', //optional
                //};
                var state = params.state,
                    operator_label = operator.get('id'),
                    request_label = params.request_number || placeholder;

                switch (state) {
                case 'logged-off':
                    request_label = operator_label = placeholder;
                    $(caption).css('color', default_color).css('font-size', default_size);
                    break;
                case 'not-ready':
                    request_label = 'Перерыв';
                    $(caption).css('color', default_color).css('font-size', '70pt');
                    break;
                case 'processing':
                    $(caption).css('color', '#4A2819').css('font-size', default_size);
                    break;
                case 'ready':
                    $(caption).css('color', default_color).css('font-size', default_size);
                    break;
                case 'wait':
                    $(caption).css('color', '#C65028').css('font-size', default_size);
                    break;

                }
                LinbUtil_SetData4DesignComponents('ODOperatorNumber', operator_label, null);
                LinbUtil_SetData4DesignComponents('ODRequestNumber', request_label, null);
                LinbUtil_RefreshComponentsData();
            }
        };
    };

    return OperatorDisplay;
});