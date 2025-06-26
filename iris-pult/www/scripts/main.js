/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(['modules/pages'],function(pages){
	console.log('main start');
	pages.init();
	
	requirejs(['modules/helpers/doomclock'],function(doomclock){
		doomclock.start(12*60*60*1000);
	});
});