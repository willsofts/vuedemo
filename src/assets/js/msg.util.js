import $ from "jquery";
import { getDefaultLanguage, getProgramMessage, getApiUrl, getMetaInfo, DEFAULT_CONTENT_TYPE } from "./app.info";
import { getAccessorToken, getStorage, setStorage } from "./messenger";

export function getMessageCode(errcode, params, defaultMessage) {
    if(errcode && errcode.trim().length>0) {
		let program_message = getProgramMessage();
        let lang = getDefaultLanguage();
        if(!lang || lang.trim().length==0) lang = "EN";
		let msg = null;
		//try find out from storage cached first
		let message_code = getStorage("message_code");
		if(message_code) {
			msg = message_code.find((item) => { return item.code == errcode; });
		}
		if(!msg) msg = program_message.find((item) => { return item.code == errcode; });
		if(msg) {
			let text = msg[lang];
			if(text && text.trim().length>0) {
				return replaceString(text, params);
			}
		}
    }
	return defaultMessage?defaultMessage:errcode;
}

export function replaceString(str, arrStr){                           	
	if(arrStr) {
		let regex = /%s/;
		for(let i=0;i<arrStr.length;i++){
			let t_str = arrStr[i];
			str = str.replace(regex, t_str);
		}
	} 
	if(str) {
		let regex = /%s/g;
		str = str.replace(regex,"");
	}
	return str;
}

export function mergeMessageCodes(data_messages) {
	if(!data_messages) return false;
	if(!Array.isArray(data_messages) || data_messages.length <= 0) return false;
	let program_message = getProgramMessage();
	program_message.unshift(...data_messages);
	return true;
}

function getApiMessageCode() {
    return getApiUrl() + (getMetaInfo().API_MESSAGE_CODE || "/api/msgcode/fetch");
}

export function loadAndMergeMessageCode(callback, loadMessageCode = String(getMetaInfo()?.LOAD_MESSAGE_CODE)=="true", url = getApiMessageCode()) {
	if(!loadMessageCode) return;
	//if exist in storage then do not make request
	if(getStorage("message_code")) {
		return;
	}
	fetchMessageCode(null,function(success,data) {
		if(success) {
			setStorage("message_code",data.body);
			if(callback) callback(success,data.body);
		}
	},url);
}

export function fetchMessageCode(code, callback, url = getApiMessageCode()) {
    console.log("fetchMessageCode: ",code);
	let authtoken = getAccessorToken();
	$.ajax({
		url: url,
		type: "POST",
		data: code ? JSON.stringify({ msgcode: code }) : "",
		dataType: "json",
		headers : { "authtoken": authtoken },
		contentType: DEFAULT_CONTENT_TYPE,
		error : function(transport,status,errorThrown) {
			console.error(errorThrown);
			if(callback) callback(false,errorThrown,transport);
		},
		success: function(data) {
			if(callback) callback(true,data);
		}
	});		
}
