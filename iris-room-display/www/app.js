// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
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