/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(['pages','jquery'],function(pages){
	
	return {
		prepareLinks : function(context){
			$('a[data-target]').click(function(e){
				e.preventDefault();
				var target = '#'+$(this).attr('data-target');
				var url =	$(this).attr('href');
				pages.open(url,target);
			});		
		}
	}
});