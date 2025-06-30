// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
define(function() {
	return {
	ip : {
		title : 'Адрес сервера',
		type : 'string',
		description : 'например, http://127.0.0.1'
	},
	office_id : {
		title : 'Номер офиса',
		type : 'string',
		default : "1",
		minLength : 1
	},
	operator_id : {
		title : 'Номер оператора',
		type : 'integer',
		default : 1,
		minimum : 0,
        maximum : 999
	},
	workdir : {
		title : 'Рабочая папка',
		type : 'string',
		default : 'iris_mo',
		minLength : 1
	},
	pin : {
		title : 'PIN-код',
		type : 'string'
	}
};
});