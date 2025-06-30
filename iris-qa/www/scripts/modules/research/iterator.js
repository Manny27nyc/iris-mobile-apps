// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
define(function () {
    console.log('init iterator');
    var Iterator = function (list) {
        this.questions = this.prepareObjectList(list);
        this.count = this.questions.length;
        this.child = null;
        this.current = -1;
        this.selected_answer = 0;
    };

    Iterator.prototype.checkAnswerRouts = function () {
        var answer = this.getSelectedAnswer();
        if (typeof answer.qa === 'object') {
            this.child = new Iterator(answer.qa);
            return this.child.next();
        }

        return null;
    };

    Iterator.prototype.getSameLevelQuestion = function () {
        this.current++;

        return this.current >= this.count ? null : this.questions[this.current];
    };

    Iterator.prototype.next = function () {
        var next = this.hasChild() ? this.child.next() : this.checkAnswerRouts();

        if (next === null) {
            if (this.hasChild()) this.child = null;
            next = this.getSameLevelQuestion();
        }

        return next;
    };

    Iterator.prototype.hasChild = function () {
        return this.child !== null;
    };

    Iterator.prototype.pick = function (number) {
        if (this.hasChild()) {
            this.child.pick(number);
        } else {
            //@TODO: this is pretty hacky, we should work with lists in json notation
            this.selected_answer = this.prepareObjectList(this.questions[this.current].answers)[number - 1];
        }
    };

    Iterator.prototype.prepareObjectList = function (list) {
        var result = [];
        for (l in list) {
            if (list.hasOwnProperty(l)) {
                result.push(list[l]);
            }
        }
        return result;
    }

    Iterator.prototype.getSelectedAnswer = function () {
        return this.selected_answer || {};
    }

    return Iterator;
});