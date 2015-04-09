define(['modules/KB/knowledge-base', 'bluebird'], function (kb, Promise) {
    console.log('Hold screen object init');

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

    var HoldScreen = function (operator) {
        console.log('init hold-screen');
        var placeholder = '--',
            d = new defer(),
            element_received = d.promise;
        //abstract linb element here 
        var script_received = kb.getHoldDesignAsync(operator.get('office_id'), operator.get('id'))
            .then(function (script) {
                return new Promise(function (resolve, reject) {
                    if (!script) {
                        reject('Empty Linb Script');
                    } else {
                        resolve(script);
                    }
                });
            });

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
            LinbUtil_SetData4DesignComponents('ODOperatorNumber', placeholder, null);
            LinbUtil_RefreshComponentsData();
        }).catch(function () {
            console.log('Empty script received by hold screen init chain');
        });


        return {
            render: function (element_id) {
                //@TODO: if init_complete isFullFilled, then just draw it to specified DOM element
                d.resolve(element_id);
                return init_complete;
            }
        };
    };

    return HoldScreen;
});