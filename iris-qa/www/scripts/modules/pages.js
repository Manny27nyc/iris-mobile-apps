define(['jquery'], function () {
    console.log('init pages');
    var current_page = '';
    var preparePage = function (pagename) {
        var next_module = 'ui/' + pagename;

        requirejs([next_module], function (next) {
            if (next.hasOwnProperty('load')) {
                next.load();
            }

        });
    };

    return {
        init: function () {
            requirejs(['ui/index'], function (index) {
                index.load();
            });
        },
        open: function (url, target) {
            if (current_page) {
                var old_one = 'ui/' + current_page;
                console.log(old_one);
                requirejs([old_one], function (prev) {
                    if (prev.hasOwnProperty('final')) {
                        prev.final();
                    }
                });
            }

            $(target).load(url, function () {
                var pagename = url.replace('.html', '');
                current_page = pagename;
                console.log('loading page: ', pagename);
                preparePage(pagename);
            });
        }
    };
});