/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(['modules/settings','jsoneditor','jquery'],function(settings){
	var editor;
	//move to  jsoneditor deps
	JSONEditor.defaults.options.theme = 'bootstrap3';
	JSONEditor.defaults.languages.ru = {
		error_maximum_excl: "Значение должно быть меньше {{0}}",
		error_maximum_incl: "Максимальное допустимое значение {{0}}",
  		error_minimum_excl: "Значение должно быть больше {{0}}",
  		error_minimum_incl: "Минимальное допустимое значение {{0}}",
  		error_maxLength: "Длина должна состовлять не более {{0}} символов",
  		error_minLength: "Длина должна состовлять не менее {{0}} символов",
		error_pattern: "Неверный формат",
		error_type: "Значение должно быть целым числом",
		error_notempty: "Обязательное поле"
	};
	JSONEditor.defaults.language = 'ru';
	
	//=========
	return {
		makeForm : function(target){
			var self = this;
			var properties = requirejs('const/settings');
			
			var t_editor = new JSONEditor(target,{
				schema: {
      				type: "object",
					title : 'Настройки',
					properties: properties
  				},
				disable_edit_json : true,
				disable_collapse : true,
				disable_properties : true
			});	
			
						
			t_editor.on("ready", function(){
				if (settings.hasSettings() ){
					var values = settings.getSettings();
					editor.setValue(values);
				}
			});
			
			editor = t_editor;
		},
		getValues : function(){
			var errors = editor.validate();
			
			if (errors.length) {
				console.log(errors);
				return false;
			}
			else {
				var values = editor.getValue();
				settings.setSettings(values);
				
				return true;
			}
		}
	}
});