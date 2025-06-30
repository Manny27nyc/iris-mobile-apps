// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
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