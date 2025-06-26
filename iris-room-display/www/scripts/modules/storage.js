/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define( function() {
    console.log('init storage');
	var db = null;
    try {
        if(window.localStorage ) db = window.localStorage;            
    }
    catch (e)
    {
         console.log("can't find local storage");
         return undefined;
    }  

	return {
    storeFields : function(object)    {
        for (var property in object) {
          if (object.hasOwnProperty(property)) {
              db.setItem(property,object[property]);
            }
        }
        return true;   
    },
    clear : function(){
		db.clear();
    },
	clearTemp : function(){
        for (var i = 0; i<db.length; i++){
			var key = db.key(i);
			if (key.indexOf('temp.') === 0) {
            	db.removeItem(key);
			}
        }
	},
	storeTemp : function(object) {
		var temp = {};
		
		for (var property in object) {
          if (object.hasOwnProperty(property)) {
              temp['temp.'+property] = object[property];
            }
        } 
		
		this.storeFields(temp);
	},
		getItem : function(key){
			return db.getItem(key);
		}
	};
    
  });