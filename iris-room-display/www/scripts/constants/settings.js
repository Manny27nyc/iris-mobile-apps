/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
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
	display_id : {
		title : 'Номер дисплея',
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