define(['modules/settings', 'modules/operator/operator', 'modules/linb-elements/operator-display', 'jquery', 'linb'], function (settings, Operator, OperatorDisplay) {
    console.log('operator-display ui init');

    var showHold = function () {
        $('#hold').show();
    };

    var hideHold = function () {
        $('#hold').hide();
    };

    var operator = new Operator(settings.get('amqp_namespace'), settings.get('office_id'), settings.get('operator_id'));
    
    var operator_display = new OperatorDisplay(operator);

    operator_display.render('linb-content').then(function () {
        console.log('Display initialization chain successfully completed');
    });


    operator.on('state_change', function (data) {
        var params = {
            state: data.operator_state
        };

        if (data.hasOwnProperty('Request') && data.Request.hasOwnProperty('HrId')) {
            params.request_number = data.Request.HrId;
        }

        operator_display.update(params);
    });



    return {
        load: function () {
            var settings_values = settings.getSettings();
            showHold();

            requirejs(['modules/helpers/sbutton'], function (sbutton) {
                var settings_button = new sbutton("#pin-popup");

                $('#linb-content').click(function () {
                    settings_button.click();
                });
            });

            $('#pin-popup .pin-close').click(function () {
                $('#pin-popup').modal('hide');
                $('#linb-content').show();
            });

            $('#pin-popup').on('show.bs.modal', function (e) {
                $('#linb-content').hide();
            });

            $('#pin-ok').click(function () {
                if (!settings_values.hasOwnProperty('pin') || (settings_values.pin == $('#enter-pin').val())) {
                    requirejs(['modules/pages'], function (pages) {
                        $('#pin-popup').modal('hide');
                        $('.modal-backdrop').remove();
                        pages.open('pages/settings.html', '#main-page');
                    });
                    return;
                }
                $('#enter-pin').val('');
            });

        }
    }
});