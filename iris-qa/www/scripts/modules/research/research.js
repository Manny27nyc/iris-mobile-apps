define(['modules/research/iterator', 'bluebird'], function (Iterator, Promise) {
    console.log('init research object');
    var results = [],
        current,
        current_question,
        iterator = false,
        question_body = "#question-body",
        question_content = "#question-content",
        answer_variants_body = "#answer-variants",
        greetings_box = "#greetings",
        finishResearch = false,
        stopResearch = false,
        all_questions_completed = false;

    var restart = function () {

        results = [];
        current = -1;
        current_question = false;
        all_questions_completed = false;
        // $(greetings_box).show();
        $(question_body).show();
    };

    var getQuestions = function (data) {
        iterator = new Iterator(data);
        current_question = iterator.next();
    };

    var saveResults = function () {

        if (results.length === 0 && typeof stopResearch === 'function') {
            stopResearch('empty');
        }

        var data = {
            results: results
        };

        if (typeof finishResearch === 'function') {
            finishResearch(data);
        }

        results = [];
    };



    var checkAvailableButtons = function () {
        /*if (current === 0) {
            $(prevButton).hide();
        } else {
            $(prevButton).show();
        }*/
    };

    var storeResults = function (value) {
        var data = {
            code: current_question.id,
            answer: value
        }
        results.push(data);
    }

    var sayGoodbye = function () {
        $(answer_variants_body).empty();
        $(question_body).hide();
        all_questions_completed = true;
        saveResults();
    };

    var next = function (selected) {
        $(greetings_box).hide();

        current++;

        if (typeof selected !== 'undefined') {
            iterator.pick(selected);
        }

        current_question = iterator.next();

        if (current_question !== null) {
            show();
        } else {
            sayGoodbye();
        }
    };

    var show = function () {
        $(question_content).html(current_question.title);
        var answer_picked = insertAnswers();

        answer_picked.then(function (params) {
            storeResults(params.value);
            next(params.selected);
        });

        checkAvailableButtons();
    };

    var insertAnswers = function () {
        var answers = current_question.answers;

        $(answer_variants_body).empty();

        var answer_picked = new Promise(function (resolve, reject) {
            var counter = 0;
            for (var key in answers) {
                counter += 1;

                var answer = answers[key];
                var params = {
                    value: answer.id,
                    selected: counter
                };
                var t_el = $('<button class="btn btn-default answer-variant">' + answer.title + '</button>')
                    .click(params, function (e) {
                        resolve(e.data);
                    });

                $(answer_variants_body).append(t_el);
            }
        });

        return answer_picked;
    };

    var terminate = function () {
        all_questions_completed = false;
        saveResults();
    };

    return {
        run: function (data) {
            var research_complete = new Promise(function (resolve, reject) {
                finishResearch = resolve;
                stopResearch = reject;
                restart();
                getQuestions(data);
                show();
            });

            return research_complete;
        },
        isCompleted: function () {
            return all_questions_completed;
        },
        terminate: terminate
    };
});