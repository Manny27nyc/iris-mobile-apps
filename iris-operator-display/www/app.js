console.log('app start');
var __APP_LINB_ASSETS__ = "lib";

requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../scripts',
        classes: '../scripts/classes',
        modules: '../scripts/modules',
        const: '../scripts/constants',
        ui: '../scripts/ui',
        bootstrap: 'bootstrap.min',
        linb: 'linb-all',
        'linb-util': 'LinbUtil',
        'update-clock-util': 'UpdateClockUtil',
        stomp: 'stomp.min',
        sock: 'sockjs-0.3.min',
        "moment-timezone": 'moment-timezone-with-data-2010-2020.min'
    },
    shim: {
        'jsoneditor': {
            exports: 'JSONEditor'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'linb': {
            deps: ['linb-util']
        },
        'hydrate': {
            exports: 'Hydrate'
        },
        'iris': {},
        'stomp': {
            deps: ['sock']
        }
    }

});

requirejs(['app/main']);