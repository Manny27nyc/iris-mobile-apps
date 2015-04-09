define(function () {
    var EOperatorState = {
        LoggedOff: 'logged-off',
        NotReady: 'not-ready',
        Ready: 'ready',
        Wait: 'wait',
        Processing: 'processing',
        Undefined: 'undefined'
    };

    function getOperatorState(event_type_id) {
        switch (event_type_id) {
        case 1 /*Оказание услуг приостановлено*/ :
            return EOperatorState.NotReady;
        case 2 /*Оказание услуг возобновлено*/ :
            return EOperatorState.Ready;
        case 3 /*Начало обеденного перерыва*/ :
            return EOperatorState.NotReady;
        case 4 /*Конец обеденного перерыва*/ :
            return EOperatorState.Ready;
        case 9 /*Вход оператора*/ :
            return EOperatorState.Ready;
        case 10 /*Выход оператора*/ :
            return EOperatorState.LoggedOff;
        case 11 /*Вызов на обслуживание*/ :
            return EOperatorState.Wait;
        case 20 /*Отложен талон*/ :
            return EOperatorState.Ready;
        case 21 /*Начало технического перерыва*/ :
            return EOperatorState.NotReady;
        case 22 /*Конец технического перерыва*/ :
            return EOperatorState.Ready;
        case 27 /*Посетитель подошел*/ :
            return EOperatorState.Processing;
        case 30 /*Талон просрочен*/ :
            return EOperatorState.Ready;
        case 32 /*Передача талона*/ : // При передаче талона его обслуживание всегда прекращается
            return EOperatorState.Ready;
        case 34 /*Посетитель подошел повторно*/ :
            return EOperatorState.Processing;
        case 44 /*Запрос обслужен*/ :
            return EOperatorState.Ready;
        }
        return EOperatorState.Undefined;
    };

    var blank = function (data) {
        return data;
    };

    var events = {
        "state_change": {
            events: '*',
            prepare: function (message) {
                var data = JSON.parse(message.body);
                var event_type_id = data.EventTypeId;
                var state = getOperatorState(event_type_id);
                data.operator_state = state;

                return data;
            }
        }
    };

    return {
        hasEvent: function (event_name) {
            return events.hasOwnProperty(event_name);
        },
        dataPreparation: function (event_name) {
            if (events.hasOwnProperty(event_name)) {
                return events[event_name].prepare;
            }
            return blank;
        },
        getEvents: function (event_name) {
            return events[event_name].events;
        }
    }
});