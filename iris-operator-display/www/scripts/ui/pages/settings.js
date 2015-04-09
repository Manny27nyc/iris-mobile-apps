define(['modules/helpers/formfields', 'modules/settings'], function (formfields, settings) {
    console.log('settings ui init');

    var openExternalWindow = function () {
        requirejs(['modules/pages'], function (pages) {
            pages.open('pages/operator-display.html', '#main-page');
        });
    };

    return {
        load: function () {
            formfields.makeForm(document.getElementById('settings-content'));

            if (!settings.hasSettings()) {
                $('#settings-back').attr('disabled', 'disabled');
            }

            $('#save-settings').click(function (e) {
                e.preventDefault();
                var saved = formfields.getValues();

                if (saved) {
                    openExternalWindow();
                    location.reload();
                }
            });

            $('#settings-back').click(function () {
                if (settings.hasSettings()) {
                    openExternalWindow();
                }
            });

            $('#settingsbtn').click(function (e) {
                e.preventDefault();
                $('#settings-sidebar').toggle();
                $(this).toggleClass('active');
            });

            $("#restart-app").click(function (e) {
                e.preventDefault();
                location.reload();
            });

            $("#debug-app").click(function (e) {
                e.preventDefault();
                $('#debug').toggle();
            });

            $("#clear-settings").click(function () {
                requirejs(['modules/storage'], function (storage) {
                    storage.clear();
                    $('input').val('');
                });
            });

            $("#exit-app").click(function () {
                navigator.app.exitApp();
            });
        }
    }
});