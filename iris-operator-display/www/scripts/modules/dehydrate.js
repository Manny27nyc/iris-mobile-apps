/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
define(['hydrate','iris'], function(Hydrate, iris) {
	
	var dehydrate = function(data) {
			var resolver = iris.makeHydrateContextResolver(Hydrate);
			var hydrate = new Hydrate(resolver);

			return iris.dehydrateObject(data, hydrate);
	};
	
	return dehydrate;
});