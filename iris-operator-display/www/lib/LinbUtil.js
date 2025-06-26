/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
var mediaPath = location.protocol + '//' + location.hostname + '/iris/assets/ui_uploads/';
var arrLinbComponent2Data = {};
var iptvChannels = [];
/**
 * @type object Хэш файлов, чьи изменения необходимо отслеживать.
 */
var filesToTrackChanges = {};

function LinbUtil_WorkplacetypeFromUri() {
	if ("undefined" === typeof purl) {
		return "room_display";
	}
	if ("undefined" !== typeof (purl().param("tt"))) {
		return "ticket_template";
	}
	if ("undefined" !== typeof (purl().param("od"))) {
		return "operator_display";
	}
	if ("undefined" !== typeof (purl().param("static"))) {
		return "static_display";
	}
	return "room_display";
}

function LinbUtil_decode( strCode ) {
	strCode = strCode.replace(/&quot;/g, '\"');
	strCode = strCode.replace(/&quot/g, '\"');

	strCode = strCode.replace(/&br;/g, "\n");
	strCode = strCode.replace(/&br/g, "\n");

	//strCode = strCode.replace(/'/g, "&megaquot");
	//strCode = strCode.replace(/\/\//g, "&comment>");

	return strCode;
}

function LinbUtil_encode( strCode ) {
	strCode = strCode.replace(/"/g, '&quot;');
	//strCode = strCode.replace(/'/g, "&megaquot");
	//strCode = strCode.replace(/\/\//g, "&comment>");
	strCode = strCode.replace(/\n/g, "&br;");

	return strCode;
}

function LinbUtil_RefreshComponentsData() {
	//console.log('LinbUtil_RefreshComponentsData');
	if ( (typeof(linb) != 'undefined') && ( arrLinbComponent2Data ) ) {
		for( var strComponentType in arrLinbComponent2Data) {
			//console.log('LinbUtil_RefreshComponentsData : "' + strComponentType + '" updateing with "' + arrLinbComponent2Data[strComponentType].data + '"' );

			objComponentsMagicContainer = eval('linb.UI.' + strComponentType + '.getAll();')
			var data = util.clone(arrLinbComponent2Data[strComponentType].data);

			if ( typeof(objComponentsMagicContainer) == 'object' ) {
				switch( strComponentType ) {
					/*
					case 'RDOperatorNumber' :
						objComponentsMagicContainer.each( function(o) { var boxed = o.boxing(); if ( data != boxed.getCaption()) {boxed.setCaption(data);} } );
						break;

					case 'RDRequestNumber' :
						objComponentsMagicContainer.each( function(o) { var boxed = o.boxing(); if ( data != boxed.getCaption()) {boxed.setCaption(data);} } );
						break;

					case 'ODRequestNumber' :
						objComponentsMagicContainer.each( function(o) { var boxed = o.boxing(); if ( data != boxed.getCaption()) {boxed.setCaption(data);} } );
						break;
					*/
					case 'RDRequestTable' :
					case 'RDOperatorTable' :
					case 'RDImageTable' :
						objComponentsMagicContainer.each( function(o) { o.box.SetRowData(o, data); } );
						break;

					default:
						objComponentsMagicContainer.each( function(o) { var boxed = o.boxing(); if ( data != boxed.getCaption()) {boxed.setCaption(data);} } );
						break;
				}
			}
		}
	}
}

function LinbUtil_SetData4DesignComponents( strComponentType, data, strAdditionalOptions ) {
	//console.log( "LinbUtil_SetData4DesignComponents( " + strComponentType + ", " + /*data*/'1' + ", " + strAdditionalOptions + " )" );

	if ( arrLinbComponent2Data ) {
		arrLinbComponent2Data[strComponentType] = {'data' : data, 'parametr' : strAdditionalOptions};
	}
}

function LinbUtil_IniPlayers() {
	//console.log( "LinbUtil_IniPlayers" );

	pls = linb.UI.Player.getAll();
	if ( pls ) {
		pls.each( 
			function(jsLinbPl, ind) {
				console.log( jsLinbPl );
				jsLinbPl.box.RefreshMedia.apply( jsLinbPl );
			}
		);
	}
}

function LinbUtil_IptvPlayersVisibility( blnVisible ) {
	if ( 'undefined' == typeof(blnVisible) ) {
		blnVisible = true;
	}

	var arrIptvPlayers = linb.UI.Iptv.getAll();

	arrIptvPlayers.each(
		function(objPlayer) {
			var playerDiv = document.getElementById( objPlayer.vlc_id );

			if ( playerDiv ) {
				if ( blnVisible ) {
					playerDiv.style.visibility = 'visible';
				}
				else {
					playerDiv.style.visibility = 'hidden';
				}
			}
		}
	);
}

function LinbUtil_SetUpdatedContent2MarqueeFromFile( strSerialId, strContent ) {
	var blnOutput2log = false;
	if (blnOutput2log) console.log( "LinbUtil_SetUpdatedContent2MarqueeFromFile( " + strSerialId + ", '" + strContent + "' )" );

	var arrMarqueeFromFile = linb.UI.MarqueeFromFile.getAll();

	arrMarqueeFromFile.each( 
		function(obj) { 
			if (blnOutput2log) console.log(obj); 

			if ( obj.serialId == strSerialId ) {
				if (blnOutput2log) console.log( "target founded" ); 
				obj.box.updateContent.apply( obj, [strContent] );
			}
		} 
	);
}

/**
 * Регистрирует заинтересованность в отслеживании изменений в указанном файле для указанного контрола linb.
 * @param {string} strFilePath Путь к файлу, изменения которого необходимо отслеживать
 * @param {string} strSerialId Идентификатор контрола linb, настроенного на отображение содержимого этого файла.
 */
function LinbUtil_RegisterFile4MarqueeFromFile( strFilePath, strSerialId ) {
	if ("undefined" === typeof filesToTrackChanges[strFilePath]) {
		filesToTrackChanges[strFilePath] = {};
	}
	filesToTrackChanges[strFilePath][strSerialId] = 1;

	var objForm = document.forms[0];
	qc.pA(objForm.id, "pxyRegisterUpdateForMarqueeFromFile", "QClickEvent", '{"file" : "' + strFilePath + '", "serialId" : "' + strSerialId + '"}' , "none");
}

// Получить ключ по значению. Используется для обратного перевода локализованных значений на английский.
// http://stackoverflow.com/questions/9907419/javascript-object-get-key-by-value
function getKeyByValue(obj, value ) {
	for( var prop in obj ) {
		if( obj.hasOwnProperty( prop ) ) {
			 if( obj[ prop ] === value )
				 return prop;
		}
	}
	return null;
}
