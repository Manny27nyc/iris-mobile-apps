/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(['jquery'],function(ui){
	console.log('init pages');
	var prepareLinks = function() {
				var self = this;
			$('a[data-target]').click(function(e){
				e.preventDefault();
				var target = '#'+$(this).attr('data-target');
				var url =	$(this).attr('href');
				self.open(url,target);
			});
	};
	
	return {
		init : function(){
			prepareLinks.call(this);
			requirejs(['ui/index'],function(index) {
				index.load();
			});
		},
		open : function(url,target) {
			var self = this;
			$(target).load(url,function(){
				var pagename = url.replace('.html','');
				self.preparePage(pagename);	
			});
		},
		preparePage : function(pagename) {
			var module_name = 'ui/'+pagename;
			
			requirejs([module_name], function(module) {
				if (module.hasOwnProperty('load')) {
					module.load();
				}
			});
		} 
	};
});