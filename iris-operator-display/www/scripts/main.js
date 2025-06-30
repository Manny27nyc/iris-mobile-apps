// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
define(['modules/pages', 'jquery'], function (pages) {
    console.log('main start');
    pages.init();

    //    if (typeof console != "undefined")
    //        if (typeof console.log != 'undefined')
    //            console.olog = console.log;
    //        else
    //            console.olog = function () {};
    //
    //    console.log = function (message) {
    //        console.olog(message);
    //        $('#debug').append('<p>' + message + '</p>');
    //    };
    //    console.error = console.debug = console.info = console.log
    setInterval(function () {
        $("#debug").empty();
    }, 45 * 60 * 1000);

    requirejs(['modules/helpers/doomclock'], function (doomclock) {
        var life_time = 12 * 60 * 60 * 1000;
        doomclock.start(life_time);
    });

    requirejs(['util'], function (util) {
        window.util = util;
    });

    requirejs(['UpdateClockUtil'], function (server) {
        window.server = server;
    });





});