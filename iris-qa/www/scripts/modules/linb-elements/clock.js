// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
define(['moment-timezone', 'UpdateClockUtil', 'modules/KB/knowledge-base'], function (moment, clockUtil, kb) {
    var ready = false;

    return {
        update: function (time) {
            if (ready) {
                clockUtil.objServerTime.setServerTime(time * 1000);
            } else {
                console.warn('clock not ready');
            }
        },
        init: function () {
            var clock_ready = kb.getTimezoneAsync().then(function (server_timezone) {
                if (typeof server_timezone === 'undefined') return;
                server_offset = moment().tz(server_timezone).zone();
                clockUtil.objServerTime.setServerTimezoneOffset(server_offset);
                ready = true;
            });
            return clock_ready;
        }
    }


});