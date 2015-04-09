define(function () {
    var events = ["pause", "pause_finish", "lunch", "lunch_finish", "enter_event", "exit_event", "call_next", "return_request", "remove_request", "priority_up", "priority_down", "postpone_request", "tech_pause", "tech_pause_finish", "infomat_enable", "infomat_disable", "open_request", "request_in_progress", "request_expired", "request_moved", "request_in_progress_once_more", "excellent_mark", "good_mark", "bad_mark", "open_reserved_request", "request_served", "request_routed", "request_return_to_complete", "create_request_by_route", "request_moved_datetime", "request_moved_service"];

    return {
        hasEvent: function (event_name) {
            return (events.indexOf(event_name) !== -1);
        },
        getPath: function (event_name) {
            var path;
            return path;
        }
    };
});