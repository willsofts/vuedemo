import $ from "jquery";
import { getDefaultLanguage, getDefaultLabels, getProgramLabels, getApiUrl, DEFAULT_CONTENT_TYPE, getMetaInfo } from "./app.info";
import { getAccessorToken } from "./messenger";

export function getLabel(name, defaultLabel, lang = getDefaultLanguage()) {
    let result = undefined;
    let default_labels = getDefaultLabels();
    let program_labels = getProgramLabels();
    if(!lang || lang.trim().length==0) lang = "EN";
    let label_item = getLabelItem(name,lang,program_labels);
    if(label_item) {
        result = label_item.value;
    }
    if(!result) {
        label_item = getLabelItem(name,lang,default_labels);
        if(label_item) {
            result = label_item.value;
        }
    }
    return result?result:defaultLabel;
}

export function getLabelItem(name, lang, label_category) {
    if(!lang || lang.trim().length==0) lang = "EN";
    let lang_item = label_category.find((item) => { return item.language == lang; });
    if(!lang_item) lang_item = label_category.find((item) => { return item.language == "EN"; });
    if(lang_item) {
        return lang_item.label.find((item) => { return item.name == name; });
    }
    return undefined;
}

export function getLabelObject(lang = getDefaultLanguage(), label_category) {
    if(!lang || lang.trim().length==0) lang = "EN";
    let lang_item = label_category.find((item) => { return item.language == lang; });
    if(!lang_item) lang_item = label_category.find((item) => { return item.language == "EN"; });
    if(lang_item) {
        return lang_item.label;
    }
    return undefined;
}

export function getLabelModel(lang = getDefaultLanguage()) {
    let default_labels = getDefaultLabels();
    let program_labels = getProgramLabels();
    let default_item = getLabelObject(lang, default_labels);
    let program_item = getLabelObject(lang, program_labels);
    let default_model = {};
    let program_model = {};
    if(default_item) {
        default_item.forEach(element => { default_model[element.name] = element.value; });
    }
    if(program_item) {
        program_item.forEach(element => { program_model[element.name] = element.value; });
    }
    return Object.assign(default_model, program_model);
}

export function mergeProgramLabels(data_labels) {
    if(!data_labels) return false;
    if(!Array.isArray(data_labels) || data_labels.length <= 0) return false;
    let program_labels = getProgramLabels();
    for(let data of data_labels) {
        let lang = data.language;
        let lang_item = program_labels.find((item) => { return item.language == lang; });
        if(lang_item) {
            let concat_labels = [...lang_item.label, ...data.label];
            lang_item.label = [...new Map(concat_labels.map(item => [item.name, item])).values()];
        }
    }
    return true;
}

function getApiLabel() {
    return getApiUrl() + (getMetaInfo().API_LABEL || "/api/label/fetch");
}

export function loadAndMergeLabel(id, callback, loadLabel = String(getMetaInfo()?.LOAD_LABEL)=="true", url = getApiLabel()) {
    if(!loadLabel) return;
    fetchLabel(id,function(success,data) {
        if(success) {
            let merged = mergeProgramLabels(data.body);
            if(merged && callback) callback(success,data);
        }
    },url);
}

export function fetchLabel(id, callback, url = getApiLabel()) {
    console.log("fetchLabel: ",id);
	let authtoken = getAccessorToken();
	$.ajax({
		url: url,
		type: "POST",
		data: JSON.stringify({ labelid: id }),
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
