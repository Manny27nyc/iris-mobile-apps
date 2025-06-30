// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
/*global setImmediate: false, setTimeout: false, console: false */
(function () {

    var util = {};

    // global on the server, window in the browser
    var root, previous_util;

    root = this;
    if (root != null) {
      previous_util = root.util;
    }

    util.noConflict = function () {
        root.util = previous_util;
        return util;
    };

    //// exported util module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        if (typeof setImmediate === 'function') {
            util.nextTick = function (fn) {
                // not a direct alias for IE10 compatibility
                setImmediate(fn);
            };
            util.setImmediate = util.nextTick;
        }
        else {
            util.nextTick = function (fn) {
                setTimeout(fn, 0);
            };
            util.setImmediate = util.nextTick;
        }
    }
    else {
        util.nextTick = process.nextTick;
        if (typeof setImmediate !== 'undefined') {
            util.setImmediate = setImmediate;
        }
        else {
            util.setImmediate = util.nextTick;
        }
    }

	// http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-a-javascript-object/1042676#1042676
	// extends 'from' object with members from 'to'. If 'to' is null, a deep clone of 'from' is returned
	function extend(from, to)
	{
		if (from == null || typeof from != "object") return from;
		if (from.constructor != Object && from.constructor != Array) return from;
		if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
			from.constructor == String || from.constructor == Number || from.constructor == Boolean)
			return new from.constructor(from);

		to = to || new from.constructor();

		for (var name in from)
		{
			to[name] = typeof to[name] == "undefined" ? extend(from[name], null) : to[name];
		}

		return to;
	}

	util.clone = function (o) {
		return extend(o);
	}

	/**
	 * Сортирует массив объектов по полю name. Если такго поля нет,
	 * можно указать свою функцию извлечения поля для сортировки - getName
	 * @param {Object} objArray Массив для сортировки
	 * @param {Function} getName Функция для извлечения из объекта поля для сортирвки массива,
	 * например, function(o) { return o.name; }
	 * @return Отсортированный массив объектов.
	 * ВНИМАНИЕ! эта функция НЕ изменяет исходный массив объектов.
	 */
	util.sortArrayByName = function (objArray, getName) {
		var objArraySorted = util.clone(objArray);
		if ("undefined" == typeof(getName)) {
			getName = function(o) {
				return o.name;
			};
		}
		var test = "test";
		if ("undefined" != typeof(test.toLocaleLowerCase) && "undefined" != typeof(test.localeCompare)) {
			objArraySorted.sort(function(lh, rh){
				return getName(lh).toLocaleLowerCase().localeCompare(getName(rh).toLocaleLowerCase());
			});
		}
		return objArraySorted;
	}

	util.typeOf = function (obj) {
		if ( typeof(obj) == 'object' ) {
			if (obj.length) {
				return 'array';
			} else {
				return 'object';
			}
		} else {
			return typeof(obj);
		}
	}

	util.getHtmlById = function (id) { 
		var elem = document.getElementById(id);
		if (elem) {
			return elem.innerHTML;
		}
		return '';
	}

	util.setHtmlById = function (id, txt) {
		var elem = document.getElementById(id);
		if (elem) {
			elem.innerHTML = txt;
		}
	}

	util.showElemById = function (id, blnShow) {
		$elem = $j("#" + id);
		if (blnShow) {
			$elem.show();
		} else {
			$elem.hide();
		}
//		var elem = document.getElementById(id);
//		if (!elem) {
//			return;
//		}
//		//if (elem.style.visibility && elem.style.visibility.length > 0) {
//			elem.style.visibility = blnShow ? 'visible' : 'hidden';
//		//}
//		//if (elem.style.display && elem.style.display.length > 0) {
//			elem.style.display = blnShow ? 'inline' : 'none';
//		//}
	}

	util.ShowDialogBox = function (strControlId, blnShow) {
		var dlg = $j(("#" + strControlId));
		if (!dlg) {
			alert("Internal error: failed to find dialog specified: " + strControlId);
			return;
		}
		var strFormId = "RequestEditForm";
		if (arguments.length > 2) {
			strFormId = arguments[2];
		}
		var strDialogClass = strControlId;
		if (arguments.length > 3) {
			strDialogClass = arguments[3];
		}
		// fix для ошибки: cannot call methods on dialog prior to initialization; attempted to call method 'isOpen' 
		// http://forum.jquery.com/topic/better-way-to-tell-if-widget-already-rendered#14737000000505311
//		var isOpen = dlg.is(':data(dialog)');
		// после обновления до 1.11.1 стало так
		var isOpen = dlg.is(':data(uiDialog)');
		if (isOpen) {
			isOpen = dlg.dialog("isOpen");
		}
		if (blnShow) {
			if (true !== isOpen) {
				dlg.css("background", "none");
				dlg.dialog({position: "middle", dialogClass: strDialogClass, autoOpen: false, modal: true, width: 'auto', height: 'auto'/*,  open: function() { $j(this).parent().appendTo("#" + strFormId); $j(".ui-widget-overlay").appendTo("#" + strFormId); }*/}).dialog("open");

				var uiDialog = $j(".ui-dialog");
				var divMain = $j('#main');
				if ( uiDialog && divMain ) {
					var pos = divMain.position();
					if (pos) {
						uiDialog.css( {'top' : pos.top} );
					}
				}
			}
		} else {
			if (true === isOpen) {
				dlg.dialog("close");
			}
		}
	}

	util.setElementVisibility = function (ctl_id, isVisible) {
		var ctl = document.getElementById(ctl_id);

		if (ctl) {
			if (isVisible) {
				ctl.style.visibility = 'visible';
			}
			else {
				ctl.style.visibility = 'hidden';
			}
		}
	}
	
	// сопоставление имён полей в коротком варианте (для передачи по сети)
	// и в полном варианте, для работы на стороне клиента.
	util.short2realFieldNameArray = {
		'a': 'id'
		, 'b': 'hrId'
		, 'c': 'type'
		, 'd': 'timeEvent'
		, 'e': 'timeBegin' // requestTimeBegin для super.js
		, 'f': 'timeLength'
		, 'g': 'svcId'
		, 'h': 'serviceCount'
		, 'i': 'eventId'
		, 'j': 'isComplete'
		, 'k': 'employeeId'
		, 'l': 'operatorId'
		, 'm': 'priority'
		, 'n': 'eventTypeId'
		, 'o': 'clientInfo'
		, 'p': 'stateId'
		, 'q': 'complexParentId'
		, 'r': 'requestEmployeeId'
		, 's': 'comeBackOperatorId'
		, 't': 'preferentialPrefix'
	};

	util.short2realSuperFieldNameArray = util.clone(util.short2realFieldNameArray);
	util.short2realSuperFieldNameArray.e = 'requestTimeBegin';
	
	// сопоставление имён полей в коротком варианте (для передачи по сети)
	// и в полном варианте, для работы на стороне клиента.
	util.short2realOperatorFieldNameArray = {
		'a': 'operatorId'
		, 'b': 'employeeId'
		, 'c': 'eventId'
		, 'd': 'available'
		, 'e': 'timeEvent'
		, 'f': 'eventTypeId'
		, 'g': 'requestId'
		, 'h': 'requestHrId'
	};

	util.normalizeObjectFields = function(data, map) {
		for(var key in map) {
			if(data.hasOwnProperty(key)){
				data[map[key]] = data[key];
				delete data[key];
			}
		}
	};

	// AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return util;
        });
    }
    // Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = util;
    }
    // included directly via <script> tag
    else {
        root.util = util;
    }

}());
