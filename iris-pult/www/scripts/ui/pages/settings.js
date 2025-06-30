// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
define(['modules/helpers/formfields','modules/settings'],function(formfields,settings){
	console.log('settings ui init');
	
	var openExternalWindow = function() {
		requirejs(['modules/pages'],function(pages){
			pages.open('pages/externalWindow.html','#main-page');
		});	
	};
	
	return {
		load : function() {
			formfields.makeForm(document.getElementById('settings-content'));
			
			if (!settings.hasSettings()) {
				$('#settings-back').attr('disabled','disabled');
			}
			
			$('#save-settings').click(function(e){
				e.preventDefault();
				var saved = formfields.getValues();
				
				if (saved) {
					openExternalWindow();
				}
			});
			
			$('#settings-back').click(function(){
				if (settings.hasSettings()) {
					openExternalWindow();
				}
			});
			
			$('#settingsbtn').click(function(){
				$('#settings-sidebar').toggle();
				$(this).toggleClass('active');
			});
			
			$("#restart-app").click(function(){
				location.reload();	
			});
		
			$("#reconnect-app").click(function(){
				QCH.Connect();
			});
		
			$("#exit-app").click(function(){
				navigator.app.exitApp();
			});
		}	
	}
});