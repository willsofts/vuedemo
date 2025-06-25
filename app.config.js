const appVariables = {
    API_URL: "http://localhost:8080",
    BASE_URL: "http://localhost:8080",
	IMG_URL: "http://localhost:8080",
    MULTI_LANGUAGES: ["EN","TH"],
    META_INFO: { DIALOG_TYPE: "BB", DISPLAY_PAGE_HEADER: "true", LOAD_LABEL: true }
};
function getAppConfigs() {
    return appVariables;
}
function getAppConfig(key) {
    return appVariables[key];
}
console.log("appVariables",appVariables);
