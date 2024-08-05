import "jquery";
import "jquery-ui";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery-ui-dist/jquery-ui.css";
import "bootstrap";
import "bootbox";
import "./assets/jquery/js/jquery.maskedinput.js";
import "./assets/clockpicker/bootstrap-clockpicker.js";
import "./assets/clockpicker/bootstrap-clockpicker.css";
import "./assets/css/font-awesome.css";
import "./assets/css/component.css";
import "./assets/css/base_style.css";
import "./assets/css/program_style.css";
import "./assets/css/user_style.css";
import program_message from './assets/json/program_message.json';
import default_labels from './assets/json/default_label.json';
import program_labels from './assets/json/program_label.json';
import { appInit } from "./assets/js/app.info.js";
appInit({program_message,default_labels,program_labels});
import { createApp, version } from 'vue';
import AppDemo002 from './AppDemo002.vue';
console.info("Vue version",version);
createApp(AppDemo002).mount('#app');

//cannot use Demo002 : Component name "Demo002" should always be multi-word 
