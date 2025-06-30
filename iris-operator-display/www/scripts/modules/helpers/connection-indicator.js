// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
define(function () {
    return {
        on: function () {
            $('.indicator').removeClass('disconnected').addClass('connected');
        },
        off: function () {
            $('.indicator').addClass('disconnected').removeClass('connected');
        }
    }
});