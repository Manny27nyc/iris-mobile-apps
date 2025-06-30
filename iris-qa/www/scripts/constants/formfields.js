// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
define(function(){
	var ru = {
			error_maximum_excl: "Значение должно быть меньше {{0}}",
			error_maximum_incl: "Максимальное допустимое значение {{0}}",
			error_minimum_excl: "Значение должно быть больше {{0}}",
			error_minimum_incl: "Минимальное допустимое значение {{0}}",
			error_maxLength: "Длина должна состовлять не более {{0}} символов",
			error_minLength: "Длина должна состовлять не менее {{0}} символов"
		};

	return {
		init : function(JSONeditor){
			JSONEditor.defaults.options.theme = 'bootstrap3';
			JSONEditor.defaults.languages.ru = ru;
			JSONEditor.defaults.language = 'ru';
		}
	}
});