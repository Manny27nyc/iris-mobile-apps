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