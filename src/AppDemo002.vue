<!-- App.vue -->
<template>
  <div id="fswaitlayer" class="fa fa-spinner fa-spin"></div>
  <div class="pt-page pt-page-current pt-page-controller search-pager">
    <PageHeader ref="pageHeader" :labels="labels" pid="demo002" version="1.0.0" showLanguage="true" @language-changed="changeLanguage" />
    <SearchForm ref="searchForm" :labels="labels" :dataCategory="dataCategory" @data-select="dataSelected" @data-insert="dataInsert" />
  </div>
  <teleport to="#modaldialog">
    <EntryForm ref="entryForm" :labels="labels" :dataCategory="dataCategory" @data-saved="dataSaved" @data-updated="dataUpdated" @data-deleted="dataDeleted" />
  </teleport>
</template>
<script>
import { ref } from 'vue';
import $ from "jquery";
import PageHeader from '@/controls/PageHeader.vue';
import SearchForm from '@/components/SearchForm.vue';
import EntryForm from '@/components/EntryForm.vue';
import { getLabelModel } from "@/assets/js/label.util.js";
import { DEFAULT_CONTENT_TYPE, getDefaultLanguage, setDefaultLanguage, getApiUrl } from "@/assets/js/app.info.js";
import { startApplication, serializeParameters } from "@/assets/js/app.util.js";

export default {
  components: {
    PageHeader, SearchForm, EntryForm
  },
  setup() {
    const dataChunk = {};
    const dataCategory = {
      marrystatus: [{id: "S", text: "Single"}, {id: "M", text: "Married"},{id: "D", text: "Divorce"},{id: "W", text: "Widow"}],
      licenses: [{id: "CAR", text: "Car"},{id: "TRUCK", text: "Truck"},{id: "BOAT", text: "Boat"}],
      languages: [{id: "TH", text: "Thai"},{id: "EN", text: "English"},{id: "CN", text: "Chinese"},{id: "KR", text: "Korea"},{id: "JP", text: "Japan"}]
    };
    let labels = ref(getLabelModel());
    let alreadyLoading = ref(false);
    return { labels, dataCategory, dataChunk, alreadyLoading };
  },
  mounted() {
    console.log("App: mounted ...");
    this.$nextTick(() => {
      //ensure ui completed then invoke startApplication 
      startApplication("demo002",(data) => {
        this.messagingHandler(data);
        this.loadDataCategories(!this.alreadyLoading,() => {
          this.$refs.pageHeader.changeLanguage(getDefaultLanguage());
        });
      });
      //try to find out parameters from url
      const searchParams = new URLSearchParams(window.location.href);
      console.log("param: authtoken=",searchParams.get("authtoken"),", language=",searchParams.get("language"));      
    });
  },
  methods: {
    messagingHandler(data) {
      console.log("messagingHandler: data",data); 
    },
    changeLanguage(lang) {
      setDefaultLanguage(lang);
      let labelModel = getLabelModel(lang);
      this.labels = labelModel;
      this.resetDataCategories(lang);
    },
    loadDataCategories(loading,callback) {
      console.log("loadDataCategories: loading",loading);
      if(!loading) return;
      let jsondata = {tablename: ["kt_marrystatus", "kt_languages"], orderfield: "seqno"};
      let formdata = serializeParameters(jsondata);
      $.ajax({
        url: getApiUrl()+"/api/datatable/list",
        data: formdata.jsondata,
        headers : formdata.headers,
        type: "POST",
        dataType: "json",
        contentType: DEFAULT_CONTENT_TYPE,
        error : function(transport,status,errorThrown) {
          console.error("loadDataCategories: error: status",status,"errorThrown",errorThrown);
        },
        success: (data) => {
          this.alreadyLoading = true;
          console.log("loadDataCategories: success",data);
          if(data.body) {
            for(let item of data.body) {
              if(item.tablename && item.resultset && item.resultset.rows) {
                this.dataChunk[item.tablename] = item.resultset.rows;
              }
            }
            console.log("data chunk",this.dataChunk);
            this.resetDataCategories();
            if(callback) callback();
          }
        }
      });	
    },
    resetDataCategories(lang) {
      if(!lang) lang = getDefaultLanguage();
      if(!lang || lang.trim().length==0) lang = "EN";
      let marrystatus;
      let languages;
      let kt_marrystatus = this.dataChunk["kt_marrystatus"];
      if(kt_marrystatus) {
        marrystatus = kt_marrystatus.map((item) => { return { id: item.statusid, text: "EN"==lang?item.nameen:item.nameth } });
      }
      let kt_languages = this.dataChunk["kt_languages"];
      if(kt_languages) {
        languages = kt_languages.map((item) => { return { id: item.langid, text: "EN"==lang?item.nameen:item.nameth } });
      }
      if(marrystatus) this.dataCategory.marrystatus = marrystatus;
      if(languages) this.dataCategory.languages = languages;
    },
    dataSelected(item,action) {
      //listen action from search form
      console.log("App: dataSelected",item,"action",action);
      if("edit"==action) {
        this.$refs.entryForm.retrieveRecord({account: item.account});
      } else if("delete"==action) {
        this.$refs.entryForm.startDeleteRecord({account: item.account});
      }
    },
    dataInsert(filters) {
      //listen action from search form
      console.log("App: record insert",filters);
      this.$refs.entryForm.startInsertRecord();
    },
    dataSaved(data,response) {
      //listen action from entry form when after saved
      console.log("App: record saved");
      console.log("data",data,"response",response);
      this.$refs.searchForm.search();
    },
    dataUpdated(data,response) {
      //listen action from entry form when after updated
      console.log("App: record updated");
      console.log("data",data,"response",response);
      this.$refs.searchForm.search();
    },
    dataDeleted(data,response) {
      //listen action from entry form when after deleted
      console.log("App: record deleted");
      console.log("data",data,"response",response);
      this.$refs.searchForm.search(true);
    },
  }
};
</script>