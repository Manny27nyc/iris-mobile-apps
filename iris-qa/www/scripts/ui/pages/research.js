define([
    'modules/settings',
    'modules/research/research',
    'modules/operator/operator',
    'modules/KB/knowledge-base',
    'modules/linb-elements/hold-screen'
    ], function (settings, research, Operator, kb, HoldScreen) {
    //cache your dom objects for greater good!
    var hold_container = $('#hold-container');
    var research_container = $('#research-container');
    var settings_button = $('.settings-button');

    var hideHold = function () {
        hold_container.hide();
        settings_button.hide();
        research_container.show();
    };

    var showHold = function () {
        hold_container.show();
        settings_button.show();
        research_container.hide();
    };

    var showGoodbye = function () {
        $('#final-popup').show().delay(2000).fadeOut('slow');
    };


    var operator = new Operator(settings.get('amqp_namespace'), settings.get('office_id'), settings.get('operator_id'));

    console.log('operator created');

    var hold_screen = new HoldScreen(operator);

    hold_screen.render('linb-content');

    operator.on('request_in_progress', function (data) {
        var service_id = data.Request.ServiceId;
        var request_id = data.RequestId.toString();
        var office_id = settings.get('office_id');

        kb.getQA(office_id, service_id).then(function (data) {

            research.run(data).then(function (results) {
                results.reqId = request_id;
                showHold();

                if (research.isCompleted()) {
                    showGoodbye();
                }

                kb.saveQAResults(results);
            }).catch(function () {
                showHold();
                console.log('results is empty, nothing to send');
            });
            
            hideHold();
        });
    });

    operator.on('call_next', function () {
        console.log('research terminated');
        research.terminate();
    });

    return {
        load: function () {
            console.log('research page init');

            showHold();

            requirejs(['modules/helpers/sbutton'], function (sbutton) {
                var settings_button = new sbutton("#pin-popup");

                $('.settings-button').click(function () {
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
                if (typeof settings.get('pin') === 'undefined' || (settings.get('pin') == $('#enter-pin').val())) {
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
    };
});