/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
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