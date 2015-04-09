define(function() {
	return {
	ip : {
		title : 'Адрес сервера',
		type : 'string',
		minLength : 4
	},
	port : {
		title : 'Порт',
		type : 'integer',
		default : 61614,
		minimum : 1,
        maximum : 999999
	},
	office_id : {
		title : 'Номер офиса',
		type : 'integer',
		default : 1,
		type : 'string'
	},
	operator_id : {
		title : 'Номер оператора',
		type : 'integer',
		default : 1,
		minimum : 0,
        maximum : 999
	},	
	amqp_namespace : {
		title : 'ID установки',
		type : 'string',
		default : ''
	},
	pin : {
		title : 'PIN-код',
		type : 'string'
	}
};
});