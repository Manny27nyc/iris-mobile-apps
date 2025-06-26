/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(['modules/settings','modules/pages'],function(settings,pages){
	console.log('index ui init');
	
		
	return {
		load : function() {
			if (settings.hasSettings()) {
				console.log('settings r ok!');
				__APP_LINB_ASSETS__ = "http://"+settings.getSettings().ip+"/iris/linb/linb";
				pages.open('pages/operator-display.html','#main-page');
			}	
			else {	
				console.log('settings aint ok!');
				pages.open('pages/settings.html','#main-page');
			}
		}
	}
});