/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
/*global setImmediate: false, setTimeout: false, console: false */
(function () {

    var server = {};

    // global on the server, window in the browser
    var root, previous_util;

    root = this;
    if (root != null) {
        previous_util = root.server;
    }

    server.noConflict = function () {
        root.server = previous_util;
        return server;
    };

    //// exported server module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        if (typeof setImmediate === 'function') {
            server.nextTick = function (fn) {
                // not a direct alias for IE10 compatibility
                setImmediate(fn);
            };
            server.setImmediate = server.nextTick;
        } else {
            server.nextTick = function (fn) {
                setTimeout(fn, 0);
            };
            server.setImmediate = server.nextTick;
        }
    } else {
        server.nextTick = process.nextTick;
        if (typeof setImmediate !== 'undefined') {
            server.setImmediate = setImmediate;
        } else {
            server.setImmediate = server.nextTick;
        }
    }

    server.QServerTime = function () {
        this.currentServerTime = null;
        this.lastServerTimeUpdate = null;
        this.lastServerTimestamp = null;
        /**
         * @property {integer} deltaTimezoneOffset Разница смещений временных зон на сервере и клиенте.
         * Используется для приведения серверного времени к фиктивному клиентскому.
         * Т.е. отображает оно те же часы минуты секунды, что и на сервере, но на клиенте.
         * Это достигается фиктивным сдвигом в рамках часового пояса клиента.
         */
        this.deltaTimezoneOffset = null;
    };
    with(server.QServerTime) {

        /**
         * Получить текущее время сервера, либо преобразованное значение параметра intServerTime.
         * @param {integer} intServerTime Время, полученное с сервера. Например, в событиях талонов или операторов.
         * @return {integer} Текущее время сервера, либо преобразованное значение параметра intServerTime, в миллисекундах.
         */
        prototype.getTime = function (intServerTime) {
            var timeNow = new Date;
            if (!this.currentServerTime || !this.lastServerTimeUpdate) {
                return timeNow.getTime();
            }
            if ("undefined" === typeof intServerTime) {
                intServerTime = this.currentServerTime.getTime();
            } else {
                intServerTime += this.deltaTimezoneOffset;
            }

            return intServerTime + (timeNow.getTime() - this.lastServerTimeUpdate.getTime());
        };

        /**
         * Получить время в часовом поясе сервера
         * @param {integer} intServerTime Время, полученное с сервера. Например, в событиях талонов или операторов.
         * @return {integer} Время в часовом поясе сервера, в миллисекундах.
         */
        prototype.getTimeServerShift = function (intServerTime) {
            return intServerTime + this.deltaTimezoneOffset;
        };

        /**
         * Получить текущее время сервера.
         * @return {Date} Текущее время сервера.
         */
        prototype.getObjDate = function () {
            return new Date(this.getTime());
        };

        /**
         * @param {Date} objDate
         * @return string Дата и время в формате ГГГГ-ММ-ДД ЧЧ:ММ:СС
         */
        prototype.formatDateTime = function (objDate) {
            return this.formatDate(objDate) + " " + this.formatTime(objDate);
        };

        /**
         * @param {Date} objDate
         * @return string Дата в формате ГГГГ/ММ/ДД
         */
        prototype.formatDate = function (objDate) {
            if (!objDate.getFullYear || !objDate.getMonth || !objDate.getDate) {
                return null;
            }

            // дату в формат "Y/n/j" DateTime'а
            var MM = objDate.getMonth() + 1;
            if (MM < 10) {
                MM = "0" + ("" + MM);
            }
            var DD = objDate.getDate();
            if (DD < 10) {
                DD = "0" + ("" + DD);
            }
            return "" + objDate.getFullYear() + '/' + MM + '/' + DD;
        };

        /**
         * @param {Date} objDate
         * @return string Дата в формате ГГГГ/ММ/ДД
         */
        prototype.formatDate_dmY = function (objDate) {
            if (!objDate.getFullYear || !objDate.getMonth || !objDate.getDate) {
                return null;
            }

            // дату в формат "Y/n/j" DateTime'а
            var MM = objDate.getMonth() + 1;
            if (MM < 10) {
                MM = "0" + ("" + MM);
            }
            var DD = objDate.getDate();
            if (DD < 10) {
                DD = "0" + ("" + DD);
            }
            return "" + DD + "." + MM + "." + objDate.getFullYear();
        };

        /**
         * @param {Date} objDate
         * @return string Дата в формате ГГГГ/ММ/ДД
         */
        prototype.formatDate_dm = function (objDate) {
            if (!objDate.getMonth || !objDate.getDate) {
                return null;
            }

            // дату в формат "Y/n/j" DateTime'а
            var MM = objDate.getMonth() + 1;
            if (MM < 10) {
                MM = "0" + ("" + MM);
            }
            var DD = objDate.getDate();
            if (DD < 10) {
                DD = "0" + ("" + DD);
            }
            return "" + DD + "." + MM;
        };

        /**
         * @param {Date} objDate
         * @param {string} Разделитель. По умолчанию это ':'
         * @param {boolean} noseconds если true, выводим формат ЧЧ:ММ
         * @return string время в формате ЧЧ:ММ:СС
         */
        prototype.formatTime = function (objDate, glue, noSeconds) {
            if (!objDate.getHours || !objDate.getMinutes || !objDate.getSeconds) {
                return null;
            }
            if (!glue) {
                glue = ":";
            }

            // время в формат "H:i:s" DateTime'а
            var strTime = "";

            if (objDate.getHours() < 10) {
                strTime += '0';
            }
            strTime += objDate.getHours() + glue;

            if (objDate.getMinutes() < 10) {
                strTime += '0';
            }
            strTime += objDate.getMinutes();

            if (!noSeconds) {
                strTime += glue;
                if (objDate.getSeconds() < 10) {
                    strTime += '0';
                }
                strTime += objDate.getSeconds();
            }

            return strTime;
        };

        /**
         */
        prototype.getServerTimestamp = function () {
            var timeNow = new Date;
            if (!this.currentServerTime || !this.lastServerTimeUpdate) {
                return null;
            }
            return this.lastServerTimestamp + (timeNow.getTime() - this.lastServerTimeUpdate.getTime());
        };

        /**
         * Функция, принимающая текущее значение серверного времени и синхронизирующая с ней
         * дату на стороне клиента. ВАЖНО : часовой пояс на дате клиента остаётся локальным,
         * но часы, минуты, секунды и вся остальная информация соответствует серверной
         * @param {integer} intServerTime Текущее время на сервере, в миллисекундах.
         */
        prototype.setServerTime = function (intServerTime) {
            this.lastServerTimeUpdate = new Date();
            this.currentServerTime = new Date(intServerTime + this.deltaTimezoneOffset);
            this.lastServerTimestamp = intServerTime;
        };
        /**
         * Set the server timezone offset
         * @param {integer} intServerTimezoneOffset the server timezone offset, in milliseconds.
         */
        prototype.setServerTimezoneOffset = function (intServerTimezoneOffset) {
            var tm = new Date;
            var localTimezoneOffset = tm.getTimezoneOffset(); // минуты => миллисекунды
            this.deltaTimezoneOffset = (localTimezoneOffset - intServerTimezoneOffset) * 60 * 1000;
        };
    }

    server.objServerTime = new server.QServerTime();

    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return server;
        });
    }
    // Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = server;
    }
    // included directly via <script> tag
    else {
        root.server = server;
    }

}());