<template>
<div id="searchpanel" class="panel-body search-panel">
    <div class="row row-height">
        <div class="col-height col-md-2">
            <label for="account">{{ labels.account_label }}</label>
            <InputMask v-model="localData.account" picture="XXXXXXXXXXXX" /> 
        </div>
        <div class="col-height col-md-2">
            <label for="effectdate">{{ labels.effectdate_label }}</label>
            <InputDate v-model="localData.effectdate" /> 
        </div>
        <div class="col-height col-md-2">
            <label>{{ labels.marrystatus_label }}</label>
            <Select2 v-model="localData.marrystatus" :options="dataCategory.marrystatus" :settings="{multiple: true}" />
        </div>
        <div class="col-height col-md-2">
            <label>{{ labels.title_label }}</label>
            <input type="text" v-model="localData.title" class="form-control input-md" maxlength="50" />
        </div>
        <div class="col-height col-md">
            <br/>
            <button @click="searchClick" class="btn btn-dark btn-sm btn-ctrl"><i class="fa fa-search fa-btn-icon" aria-hidden="true"></i>{{ labels.search_button }}</button>
            <button @click="insertClick" class="btn btn-dark btn-sm btn-ctrl pull-right"><i class="fa fa-plus fa-btn-icon" aria-hidden="true"></i>{{ labels.insert_button }}</button>
        </div>
    </div>
    <div id="listpanel" class="table-responsive fa-list-panel">
        <DataTable ref="dataTable" :settings="tableSettings" :labels="labels" :dataset="dataset" @data-select="dataSelected" @data-sort="dataSorted" :formater="formatData" />
        <DataPaging ref="dataPaging" :settings="pagingSettings" @page-select="pageSelected" />
    </div>
</div>
</template>
<script>
import { ref } from 'vue';
import $ from "jquery";
import { DEFAULT_CONTENT_TYPE, getApiUrl }  from '@/assets/js/app.info.js';
import { startWaiting, stopWaiting, submitFailure, serializeParameters }  from '@/assets/js/app.util.js'
import { Paging } from "@/assets/js/Paging.js";
import InputDate from '@/controls/InputDate.vue';
import InputMask from '@/controls/InputMask.vue';
import DataTable from '@/controls/DataTable.vue';
import DataPaging from '@/controls/DataPaging.vue';
import Select2 from 'vue3-select2-component';

const defaultData = {
  account: '',
  effectdate: "",
  marrystatus: "",
  title: "",
};

const tableSettings = {
    sequence: { label: "seqno_label" },
    columns: [
        {name: "account", type: "STRING", sorter: "account", label: "account_head", css: "text-center" },
        {name: "amount", type: "DECIMAL", sorter: "amount", label: "amount_head", css: "text-right" },
        {name: "age", type: "INTEGER", sorter: "age", label: "age_head", css: "text-center" },
        {name: "gender", type: "STRING", sorter: false, label: "gender_head", css: "text-center", unescape: true },
        {name: "effectdate", type: "DATE", sorter: "effectdate", label: "effectdate_head", css: "text-center" },
        {name: "effecttime", type: "TIME", sorter: "effecttime", label: "effecttime_head", css: "text-center" },
        {name: "title", type: "STRING", sorter: "title", label: "title_head", css: "text-left" }
    ],        
    actions: [
        {type: "button", action: "edit"},
        {type: "button", action: "delete"},
    ],
};

export default {
  components: {
    InputDate, InputMask, DataTable, DataPaging, Select2
  },
  props: {
    labels: Object,
    formData: Object,
    dataCategory: Object
  },
  emits: ["data-select","data-insert"],
  setup(props) {
    const localData = ref({ ...defaultData, ...props.formData });
    let paging = new Paging();
    let pagingSettings = paging.setting;
    let filters = {};
    //select2 data options must in format {id:?, text:?}
    //const statusOptions = props.dataCategory.marrystatus.map((item) => { return {id: item.key, text: item.text}});
    const dataset = ref({});
    return { localData, tableSettings, pagingSettings, paging, filters, dataset };
  },
  methods: {
    reset(newData) {
      if(newData) this.localData = {...newData};
    },
    getPagingOptions(settings) {
      if(!settings) settings = this.pagingSettings;
      return {page: settings.page, limit: settings.limit, rowsPerPage: settings.rowsPerPage, orderBy: settings.orderBy?settings.orderBy:"", orderDir: settings.orderDir?settings.orderDir:"" };
    },
    insertClick() {
      this.$emit('data-insert',this.filters);
    },
    searchClick() {
      this.filters = {...this.localData};
      this.resetFilters();
      this.search();
    },
    resetFilters() {
      this.pagingSettings.page = 1;
      this.pagingSettings.orderBy = "";
      this.pagingSettings.orderDir = "";
    },
    search(ensurePaging=false) {
      if(ensurePaging) {
        if(this.pagingSettings.rows <= 1 && this.pagingSettings.page > 1) {
          this.pagingSettings.page = this.pagingSettings.page - 1;
        }
      }
      console.log("search: pagingSettings",this.pagingSettings);
      let options = this.getPagingOptions();
      this.collecting(options,this.filters);
    },
    collecting(options,criterias) {
      console.log("collecting: options",options,", criteria",criterias);
      let jsondata = Object.assign({ajax: true},options);
      //Object.assign(jsondata,criterias);
      let formdata = serializeParameters(jsondata,criterias);
      startWaiting();
      $.ajax({
        url: getApiUrl()+"/api/demo002/collect",
        data: formdata.jsondata,
        headers : formdata.headers,
        type: "POST",
        dataType: "json",
        contentType: DEFAULT_CONTENT_TYPE,
        error : function(transport,status,errorThrown) {
          console.error("error: status",status,"errorThrown",errorThrown);
          submitFailure(transport,status,errorThrown);
        },
        success: (data) => {
          stopWaiting();
          console.log("collecting: success",data);
          if(data.body) {
            this.$refs.dataTable.reset(data.body);
            this.$refs.dataPaging.reset(data.body?.offsets);
            this.pagingSettings.rows = data.body?.rows?.length;
          }
        }
      });	
    },
    pageSelected(item) {
      console.log("page selected:",item);
      this.pagingSettings.page = item.page;
      let options = this.getPagingOptions();
      this.collecting(options,this.filters);
    },
    dataSelected(item,action) {
      console.log("dataSelected",item,"action",action);
      this.$emit('data-select', item, action);
    },
    dataSorted(sorter,direction) {
      console.log("dataSorted",sorter,"direction",direction);
      this.pagingSettings.orderBy = sorter;
      this.pagingSettings.orderDir = direction;
      let options = this.getPagingOptions();
      this.collecting(options,this.filters);
    },
    formatData(data,field) {
      if(field.name=="gender") {
        if("M"==data) {
          //return this.labels.male_label; //"Male";
          return '<em class="fa fa-male"></em>';
        } else if("F"==data) {
          //return this.labels.female_label; //"Female";
          return '<em class="fa fa-female"></em>';
        } else return data;  
      }
      return this.$refs.dataTable.formatField(data,field);
    },    
  }
};
</script>
