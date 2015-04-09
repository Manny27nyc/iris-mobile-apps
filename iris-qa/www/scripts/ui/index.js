define(['modules/settings', 'modules/pages'], function (settings, pages) {
    console.log('index ui init');

    return {
        load: function () {
            if (settings.hasSettings()) {
                console.log('settings r ok!');
                pages.open('pages/research.html', '#main-page');
            } else {
                console.log('settings aint ok!');
                pages.open('pages/settings.html', '#main-page');
            }
        }
    }
});