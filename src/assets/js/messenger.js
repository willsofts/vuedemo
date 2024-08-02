import { getApiUrl, getBaseUrl, getCdnUrl, getImgUrl, getDefaultLanguage, getApiToken, getBaseStorage, setApiUrl, setBaseUrl, setCdnUrl, setImgUrl, setDefaultLanguage, setApiToken, getDefaultRawParameters  } from "./appinfo.js";
import { DH } from "./dh.js";

var messagingCallback;
var currentWindow;
export function setMessagingCallback(callback) {
    messagingCallback = callback;
}
export function setCurrentWindow(curwin) {
    currentWindow = curwin;
}
export function getCurrentWindow() { return currentWindow; }
export function getStorage(key) {
	if("local"==getBaseStorage()) {
		return localStorage.getItem(key);
	}
    return sessionStorage.getItem(key);
}
export function setStorage(key,value) {
	if("local"==getBaseStorage()) {
		localStorage.setItem(key,value);
		return;
	}
	sessionStorage.setItem(key,value);
}
export function removeStorage(key) {
	if("local"==getBaseStorage()) {
		localStorage.removeItem(key);
		return;
	}
    sessionStorage.removeItem(key);
}
export function getAccessorInfo() {
    let info = getStorage("accessorinfo");
    if(info && info!="") {
        try { return JSON.parse(info); } catch(ex) { console.error(ex); }
    }    
    return null;
}
export function getAccessorToken() {
    let json = getAccessorInfo();
    if(json && json.authtoken) {
        return json.authtoken;
    }
    let token = getApiToken();
	if(token && token!="") return token;
    return "";
}
export function saveAccessorInfo(json) {
	setStorage("accessorinfo",JSON.stringify(json));
}
export function removeAccessorInfo() {
	removeStorage("accessorinfo");
}
export function sendMessageInterface(win) {
    let moderator = win?"opener":"parent";
	let info = getAccessorInfo();
	let msg = {type: "storage", moderator: moderator, API_URL: getApiUrl(), BASE_URL: getBaseUrl(), CDN_URL: getCdnUrl(), IMG_URL: getImgUrl(), DEFAULT_LANGUAGE: getDefaultLanguage(), API_TOKEN: getApiToken(), accessorinfo: info};
	return sendMessageToFrame(msg,win);
}
export function sendMessageToFrame(data,win) {
    if(!data) return false;
    try {
		console.log("sendMessageToFrame:",data);
        if(!win) win = document.getElementsByTagName('iframe')[0].contentWindow;    
        if(win) win.postMessage(JSON.stringify(data), "*");	
        return true;
    } catch(ex) { console.log(ex); }
    return false;
}
export function requestAccessorInfo(callback) {
    if(callback) setMessagingCallback(callback);
    let msg = { type: "accessorinfo" };
    console.log("requestAccessorInfo: ",msg);
    console.log("window.opener",window.opener);
    console.log("window.parent",window.parent);
    if(window.opener) {
        return sendMessageToOpener(msg);
    }
    return sendMessageToParent(msg);
}
export function sendMessageToParent(data) {
    if(!data) return;
    try {
        console.log("sendMessageToParent:",data);
        window.parent.postMessage(JSON.stringify(data), "*");
        return true;
    } catch(ex) { console.log(ex); }
    return false;
}
export function sendMessageToOpener(data) {
    if(!data) return;
    try {
        console.log("sendMessageToOpener:",data);
        window.opener.postMessage(JSON.stringify(data), "*");
        return true;
    } catch(ex) { console.log(ex); }
    return false;
}
export function handleRequestMessage(data) {
    console.log("handleRequestMessage: data",data);
    if(data.type=="storage") {
        if(data.API_URL !== undefined) setApiUrl(data.API_URL);
        if(data.BASE_URL !== undefined) setBaseUrl(data.BASE_URL);
        if(data.CDN_URL !== undefined) setCdnUrl(data.CDN_URL);
        if(data.IMG_URL !== undefined) setImgUrl(data.IMG_URL);
        if(data.DEFAULT_LANGUAGE !== undefined) setDefaultLanguage(data.DEFAULT_LANGUAGE);
        if(data.API_TOKEN !== undefined) setApiToken(data.API_TOKEN);
        if(data.accessorinfo) {
            saveAccessorInfo(data.accessorinfo);
        }
        console.info("handleRequestMessage: accessor info",data.accessorinfo);
        console.info("handleRequestMessage: DEFAULT_LANGUAGE="+getDefaultLanguage(),", BASE_STORAGE="+getBaseUrl(),", DEFAULT_RAW_PARAMETERS="+getDefaultRawParameters());
        console.info("handleRequestMessage: API_URL="+getApiUrl(),", BASE_URL="+getBaseUrl(),", CDN_URL="+getCdnUrl(),", IMG_URL="+getImgUrl());
        console.info("handleRequestMessage: API_TOKEN="+getApiToken());        
    }
    if(messagingCallback) messagingCallback(data);
}
export function setupDiffie(json) {
	console.log("setupDiffie",getAccessorToken());
    let info = json.body.info;
    if(info) {
        const dh = new DH();
        dh.prime = info.prime;
        dh.generator = info.generator;
        dh.otherPublicKey = info.publickey;
        dh.compute();
        dh.updatePublicKey();
        info.privatekey = dh.privateKey;
        info.publickey = dh.publicKey;
        info.sharedkey = dh.sharedKey;
        info.otherpublickey = dh.otherPublicKey;
        saveAccessorInfo(json.body);
    }
}
export function getDH() {
    let json = getAccessorInfo();
    if(json && json.info) {
        let info = json.info;
        if(info.prime && info.generator && info.publickey && info.privatekey && info.sharedkey && info.otherpublickey) {
            const dh = new DH();
            dh.prime = info.prime;
            dh.generator = info.generator;
            dh.otherPublicKey = info.publickey;
            dh.privateKey = info.privatekey;
            dh.publicKey = info.publickey;
            dh.sharedKey = info.sharedkey;
            dh.otherPublicKey = info.otherpublickey;
            return dh;
        }
    }
    return null;
}
window.onmessage = function(e) {
    console.log("window-messenger: onmessage:",e.data);
    try {
        let payload = e.data;
        if(typeof payload === 'string') { payload = JSON.parse(e.data); }
        //in case of parent window, try to send accessor info
        /*
        if(payload.type=="accessorinfo") {					
            sendMessageInterface(getCurrentWindow());
            return;
        }*/
        //in case of child window, try to handle request message
        handleRequestMessage(payload);
    } catch(ex) { console.error(ex); }
}
