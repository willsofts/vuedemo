<template>
<div class="header-layer" v-show="visible">
    <nav class="program-controlbar navbar navbar-expand-sm navbar-top navbar-header-title">
        <h1 class="page-header-title"><div class="navbar-header"><label>{{ labels.caption_title }}</label></div></h1>
        <ul class="navbar-nav navbar-right ml-auto program-control-layer">
          <li class="dropdown user-dropdown"><A href="javascript:void(0)" class="program-linker dropdown-toggle" data-toggle="dropdown" data-bs-toggle="dropdown"><span>{{ pageId }}</span></A>
            <ul class="dropdown-menu dropdown-menu-right dropdown-menu-end page-header-menu" v-if="displayMenu">
              <slot></slot>
              <template v-if="displayLanguage">
              <li v-for="item in multiLanguages" :key="item.lang"><a href="javascript:void(0)" @click="changeLanguage(item.lang)" class="pagemenu-linker"><img class="img-lang" :class="'img-lang-' + item.lang" />&nbsp;<span :class="{'item-selected' : currentLanguage == item.lang}">{{ labels[item.label] }}</span></a></li>
              </template>
              <hr class="menu-separator" v-show="displayVersion && displayLanguage"/>
              <li v-if="displayVersion"><A href="javascript:void(0)" @click="showVersion" class="pagemenu-linker"><em class="fa fa-info-circle fa-class" aria-hidden="true"></em>&nbsp;<span>{{ labels.version_label }} {{ version }}</span></A></li>
              <li v-if="displayBuild" class="build-version"><A href="javascript:void(0)" class="pagemenu-linker"><em class="fa fa-at fa-class" aria-hidden="true"></em>&nbsp;<span>{{ build }}</span></A></li>
            </ul>
          </li>
        </ul>
    </nav>
</div>
</template>
<style>
.item-selected { text-decoration: underline; }
.build-version { font-size: 0.9rem; }
</style>
<script>
import { ref } from "vue";
import { Utilities } from '@/assets/js/Utilities';

export default {
  props: {
    pid: String,
    labels: Object,
    visible: {
      type: [String,Boolean],
      default: true,
    },    
    version: {
      type: String,
      default: "1.0.0",
    },
    viewVersion: {
      type: [String,Boolean],
      default: true,
    },
    showLanguage: {
      type: [String,Boolean],
      default: false,
    },    
    multiLanguages: {
      type: Array,
      default() { return [{lang:"EN", label: "EN_lang"}, {lang:"TH", label: "TH_lang"}] },
    },
    language: {
      type: String,
      default: "EN",
    },
    build: {
      type: String,
      default: "",
    },
    showBuild: {
      type: [String,Boolean],
      default: false,
    },
    alertBuild: {
      type: [String,Boolean],
      default: true,
    },
  },
  emits: ["show-version","language-changed"],
  setup(props) {
    const currentLanguage = ref(props.language && props.language.trim().length > 0 ? props.language : "EN");
    return { currentLanguage };
  },
  computed: {
    pageId() { return this.$props.pid.toUpperCase(); },
    isAlertBuild() { return Utilities.parseBoolean(this.$props.alertBuild); },
    displayBuild() { return Utilities.parseBoolean(this.$props.showBuild); },
    displayVersion() { return Utilities.parseBoolean(this.$props.viewVersion); },
    displayLanguage() { return Utilities.parseBoolean(this.$props.showLanguage); },
    displayMenu() { 
      return this.$slots.default || this.displayVersion || this.displayLanguage;
    },
  },
  methods: {
    showVersion() {
      console.log("show version: "+this.$props.pid,"build version: "+this.$props.build);
      if(this.isAlertBuild && !this.displayBuild) alert("Build: "+this.$props.build);
      this.$emit('show-version', this.$props.pid, this.$props.build);
    },
    changeLanguage(lang) {
      this.currentLanguage = lang;
      this.$emit('language-changed', lang);
    }
  },
};
</script>
