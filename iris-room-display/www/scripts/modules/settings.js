define(['const/settings','modules/storage'],function(manifest,storage){
	var settings = undefined;
    var keys = [];
    var hasSettings = false;
	
	var getKeys = function() {
			for ( key in  manifest){
				keys.push(key);
			}
		return keys;
	};
	
	var init = function() {
		keys = keys.length != 0 ? keys : getKeys();
	};
	
	init();
	
	return { 
		getSettings : function(){
       		settings = settings || this.checkStorage();
			return settings;
	 	},
		setSettings : function(object) {
			for (var i=0; i < keys.length; i++){
				var key = keys[i];
				settings[key] =	object[key];
			}
			storage.storeFields(object);	
		},		
	 	checkSettingsAvailable : function(){
			var a = true;
			for (var i = 0; i<this.keys.length; i++){
				a = this.settings.hasOwnProperty(this.keys[i]) && a;
			}
			return a;
		},
		checkStorage : function() {
      		var settings = {};
      	    var stored_keys = 0;
            for (var i = 0; i < keys.length; i++){
				var key = keys[i];
				settings[key] = storage.getItem(key);
			}
      		return  settings;
		},		
		hasSettings : function() {
			var stored_keys = 0;
			this.getSettings();
			
			for (var i=0; i < keys.length; i++){
				var key = keys[i];
				if (settings.hasOwnProperty(key)) {
					stored_keys =  settings[key] !== null ? stored_keys + 1 : stored_keys;
				}
			}

			hasSettings = stored_keys == keys.length;

			return hasSettings;
		}
    };
	
	
	
});