/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(['jquery'],function(){
	console.log('init pages');
	
	var preparePage = function(pagename) {
			var module_name = 'ui/'+pagename;
			
			requirejs([module_name], function(module) {
				if (module.hasOwnProperty('load')) {
					module.load();
				}
			});
	};
	
	return {
		init : function(){
			requirejs(['ui/index'],function(index) {
				index.load();
			});
		},
		open : function(url,target) {
			$(target).load(url,function(){
				var pagename = url.replace('.html','');
				preparePage(pagename);	
			});
		}		
	};
});