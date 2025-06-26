/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(function(){
	return {
		start : function(time_to_end){
			setTimeout(function(){
				location.reload()
			},time_to_end);
		}
	}
});