// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
define(function(){
	return {
		start : function(time_to_end){
			setTimeout(function(){
				location.reload()
			},time_to_end);
		}
	}
});