/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(['modules/settings','const/formfields','jsoneditor','jquery'],function(settings, formfields_manifest){
	var editor;

	formfields_manifest.init();
	
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