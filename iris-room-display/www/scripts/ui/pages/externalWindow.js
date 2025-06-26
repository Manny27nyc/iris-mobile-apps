/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(['modules/settings', 'modules/helpers/sbutton', 'jquery'],function(settings,sbutton){
	console.log('externalWindow ui init');
	
	var showHold = function() {
                $('#hold').show();
            };

	var hideHold = function() {
                $('#hold').hide();
    };
	
	var makeUrl = function() {
				var values = settings.getSettings();
               	var url = "";
		 		if (values.ip.indexOf('http') !== 0) {
					url += 'http://';
				}
                url += values.ip;
                url += '/';
                url += values.workdir;
                url += '/equeue_ui/room_display.php?id=';
                url += values.display_id;
                url += '&&office_id=';
                url += values.office_id;
                return url;
	};
	
	var prepareExternalWindow = function(){
		hideHold();	
	};
	
	var addFrame = function() {
		var url = makeUrl();
		var iframe = $('<iframe>')
			.attr('src', url)
            .on('load', function() {
				prepareExternalWindow();
				console.log('ext window loaded');
			});
		$('#external-window').empty().append(iframe);
	};
	
	var settings_button = new sbutton("#pin-popup");
	
	
	
	return {
		load : function() {
			showHold();
			addFrame();
		
			$('.settings-button').click(function(){
        		settings_button.click();
			});
			
			$('#pin-popup .pin-close').click(function(){
				$('#pin-popup').hide();
			});
		
			$('#pin-ok').click(function(){
				var settings_values = settings.getSettings();
			
				if ( !settings_values.hasOwnProperty('pin') || (settings_values.pin == $('#enter-pin').val()) ){
					requirejs(['modules/pages'],function(pages){
						$('#pin-popup').modal('hide');
						$('.modal-backdrop').remove();
						pages.open('pages/settings.html','#main-page');
					});
					return ;
				}
			
				$('#enter-pin').val('');
			});
		}
	}
});