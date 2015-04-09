define(function(){
	return {
		start : function(time_to_end){
			setTimeout(function(){
				location.reload()
			},time_to_end);
		}
	}
});