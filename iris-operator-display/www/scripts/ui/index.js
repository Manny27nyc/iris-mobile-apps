// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
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