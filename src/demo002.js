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
import "./assets/js/appinfo.js";
import { createApp, version } from 'vue';
import AppDemo002 from './AppDemo002.vue';
console.info("Vue version",version);
console.info("AppDemo002 loading ...");
createApp(AppDemo002).mount('#app');

//cannot use Demo002 : Component name "Demo002" should always be multi-word 
