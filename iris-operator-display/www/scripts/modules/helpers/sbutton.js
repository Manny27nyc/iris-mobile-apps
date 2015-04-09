define(['jquery','bootstrap'], function(){
	
	return function(modal){
		return {
    	time : undefined,
    	clicked : 0,
		click_req : 5,
    	click : function(){
			var d = new Date();
			var now = d.getTime();
        	if (!this.time){
            	this.time = now;
            	this.clicked = 0;
            	return;
        	}

        	this.clicked = now - this.time < 2000 ? (this.clicked + 1) : 0;
        	this.time = now;
        
        	if (this.clicked > this.click_req){
				$(modal).modal();
        	}
    	}
		};
	};
});