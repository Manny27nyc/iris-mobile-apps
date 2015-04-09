define(['modules/pages'],function(pages){
	console.log('main start');
	pages.init();
	
	requirejs(['modules/helpers/doomclock'],function(doomclock){
		doomclock.start(12*60*60*1000);
	});
});