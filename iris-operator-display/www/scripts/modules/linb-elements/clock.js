/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
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