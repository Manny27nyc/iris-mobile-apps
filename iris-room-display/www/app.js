/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
console.log('app start');

requirejs.config({
    baseUrl: 'lib',
	paths : {
		app : '../scripts',
		modules : '../scripts/modules',
		const : '../scripts/constants',
		ui : '../scripts/ui',
		bootstrap : 'bootstrap.min'
	},
	shim: {
		'jsoneditor' : {
			exports : 'JSONEditor'
		},
		'bootstrap' : {
			deps : ['jquery']
		}
	}
	
});

requirejs(['app/main']);