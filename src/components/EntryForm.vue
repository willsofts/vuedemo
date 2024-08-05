<template>
  <DialogForm ref="dialogForm">
    <template v-slot:header>
      <h4 class="modal-title" v-if="insertMode">{{ labels.title_new }}</h4>
      <h4 class="modal-title" v-if="updateMode">{{ labels.title_edit }}</h4>
    </template>
    <template v-slot:default>
        <div class="row row-height">
          <div class="col-height col-md-4">
            <label for="account">{{ labels.account_label }}</label>
            <div class="input-group has-validation" :class="{'has-error': v$.account.$error}">
              <InputMask ref="account" v-model="localData.account" id="account" name="account" picture="XXXXXXXXXXXX" :disabled="disabledKeyField"/> 
              <label class="required">*</label>
            </div>
            <span v-if="v$.account.$error" class="has-error">{{ v$.account.$errors[0].$message }}</span>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-4">
            <label for="amount">{{ labels.amount_label }}</label>
            <div class="input-group" :class="{'has-error': v$.amount.$error}">
              <InputMoney ref="amount" v-model="localData.amount" id="amount" name="amount" decimal="2" /> 
            </div>
            <span v-if="v$.amount.$error" class="has-error">{{ v$.amount.$errors[0].$message }}</span>
          </div>
          <div class="col-height col-md-3">
            <label for="pincode">{{ labels.pincode_label }}</label>
            <div class="input-group" :class="{'has-error': v$.pincode.$error}">
              <InputMask ref="pincode" v-model="localData.pincode" id="pincode" name="pincode" picture="XXXXXXXX" /> 
            </div>
            <span v-if="v$.pincode.$error" class="has-error">{{ v$.pincode.$errors[0].$message }}</span>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-7">
            <label for="title">{{ labels.title_label }}</label>
            <input ref="title" type="text" v-model="localData.title" id="title" class="form-control input-md" maxlength="100" />
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-4">
            <label for="effectdate">{{ labels.effectdate_label }}</label>
            <div class="input-group" :class="{'has-error': v$.effectdate.$error}">
              <InputDate ref="effectdate" v-model="localData.effectdate" id="effectdate" name="effectdate" /> 
            </div>
            <span v-if="v$.effectdate.$error" class="has-error">{{ v$.effectdate.$errors[0].$message }}</span>
          </div>
          <div class="col-height col-md-3">
            <label for="edittime">{{labels.effecttime_label}}</label>
            <div class="input-group" :class="{'has-error': v$.effecttime.$error}">
              <InputTime ref="effecttime" v-model="localData.effecttime" id="effecttime" name="effecttime" /> 
            </div>
            <span v-if="v$.effecttime.$error" class="has-error">{{ v$.effecttime.$errors[0].$message }}</span>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-1">
            <label for="age">{{ labels.age_label }}</label>
          </div>
          <div class="col-height col-md-2">
            <div class="input-group" :class="{'has-error': v$.age.$error}">
              <InputNumber ref="age" v-model="localData.age" id="age" name="age" /> 
            </div>
            <span v-if="v$.age.$error" class="has-error">{{ v$.age.$errors[0].$message }}</span>
          </div>
          <div class="col-height col-md-5">
            <div class="form-check">
              <input ref="domestic" type="checkbox" id="domestic" :true-value="1" :false-value="0" v-model="localData.domestic" class="form-control input-md form-check-input"/>
              <label for="domestic" class="form-check-label">{{ labels.domestic_label }}</label>
              <span v-if="v$.domestic.$error" class="has-error">{{ v$.domestic.$errors[0].$message }}</span>
            </div>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-1">
            <label>{{ labels.gender_label }}</label>
          </div>
          <div class="col-height col-md-2">
            <div class="form-check">
            <input ref="gender" type="radio" id="male" value="M" v-model="localData.gender" class="form-control input-md form-check-input"/>
            <label for="male" class="form-check-label">{{ labels.male_label }}</label>
            </div>
          </div>
          <div class="col-height col-md-2">
            <div class="form-check">
            <input ref="gender" type="radio" id="female" value="F" v-model="localData.gender" class="form-control input-md form-check-input"/>
            <label for="female" class="form-check-label">{{ labels.female_label }}</label>
            </div>
          </div>
          <span v-if="v$.gender.$error" class="has-error">{{ v$.gender.$errors[0].$message }}</span>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-1">
            <label>{{ labels.licenses_label }}</label>
          </div>    
        <template v-for="item in dataCategory.licenses" :key="item.id">
          <div class="col-height col-md-2">
            <div class="form-check">
              <input ref="licenses" type="checkbox" :id="item.id" :value="item.id" v-model="localData.licenses" class="form-control input-md form-check-input"/>
              <label :for="item.id" class="form-check-label">{{item.text}}</label>
            </div>
          </div>
        </template>
        <span v-if="v$.licenses.$error" class="has-error">{{ v$.licenses.$errors[0].$message }}</span>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-3">
            <label>{{ labels.marrystatus_label }}</label>
            <div class="input-group" :class="{'has-error': v$.marrystatus.$error}">
              <select ref="marrystatus" v-model="localData.marrystatus" class="form-control input-md">
                <option value=""></option>          
                <option v-for="item in dataCategory.marrystatus" :key="item.id" :value="item.id">{{item.text}}</option>
              </select>
            </div>
            <span v-if="v$.marrystatus.$error" class="has-error">{{ v$.marrystatus.$errors[0].$message }}</span>
          </div>
          <div class="col-height col-md-3">
            <label>{{ labels.languages_label }}</label>
            <div class="input-group" :class="{'has-error': v$.languages.$error}">
              <select ref="languages" v-model="localData.languages" class="form-control input-md" multiple>
                <option v-for="item in dataCategory.languages" :key="item.id" :value="item.id">{{item.text}}</option>
              </select>
            </div>
            <span v-if="v$.languages.$error" class="has-error">{{ v$.languages.$errors[0].$message }}</span>
          </div>
        </div>
        <div class="row row-height">
          <div class="col-height col-md-8">
            <label for="remark">{{ labels.remark_label }}</label>
            <input ref="remark" type="text" v-model="localData.remark" id="remark" class="form-control input-md" maxlength="100" />
          </div>
        </div>
    </template>
    <template v-slot:footer>
      <button class="btn btn-dark btn-sm" @click="saveClick" v-if="insertMode"><em class="fa fa-save fa-btn-icon"></em>{{ labels.save_button }}</button>
      <button class="btn btn-dark btn-sm" @click="updateClick" v-if="updateMode"><em class="fa fa-save fa-btn-icon"></em>{{ labels.update_button }}</button>
      <button class="btn btn-dark btn-sm" data-dismiss="modal"><em class="fa fa-close fa-btn-icon"></em>{{ labels.cancel_button }}</button>
    </template>
  </DialogForm>
</template>
<script>
import { ref, computed, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, helpers, between } from '@vuelidate/validators';
import $ from "jquery";
import { DEFAULT_CONTENT_TYPE, getApiUrl }  from '@/assets/js/app.info.js';
import { startWaiting, stopWaiting, submitFailure, detectErrorResponse }  from '@/assets/js/app.util.js';
import { confirmUpdate, confirmSave, confirmDelete, successbox, serializeParameters } from '@/assets/js/app.util.js';
import { replaceString } from "@/assets/js/msg.util.js";
import InputDate from '@/controls/InputDate.vue';
import InputTime from '@/controls/InputTime.vue';
import InputNumber from '@/controls/InputNumber.vue';
import InputMoney from '@/controls/InputMoney.vue';
import InputMask from '@/controls/InputMask.vue';
import DialogForm from './DialogForm.vue';

const defaultData = {
  account: '',
  amount: 0.00,
  pincode: "",
  title: "",
  effectdate: "",
  effecttime: "",
  age: 0,
  domestic: "1",
  gender: "M",
  licenses: [],
  marrystatus: "",
  languages: [],
  remark: "",
};

export default {
  components: {
    DialogForm, InputDate, InputTime, InputNumber, InputMoney, InputMask
  },
  props: {
    modes: Object,
    labels: Object,
    dataCategory: Object
  },
  emits: ["data-saved","data-updated","data-deleted"],
  setup(props) {
    const mode = ref({action: "new", ...props.modes});
    const localData = ref({ ...defaultData }); 
    const disabledKeyField = ref(false);
    const reqalert = ref(props.labels.empty_alert);
    const agealert = ref(props.labels.age_alert);
    const requiredMessage = () => {
      return helpers.withMessage(reqalert, required);
    }
    const betweenMessage = () => {
      return helpers.withMessage((params) => { 
        return replaceString(agealert.value,[params.$params.min,params.$params.max]);
      }, between(1,150));
    }
    const validateRules = computed(() => { 
      return {
        account: { required: requiredMessage() },
        amount: { required: requiredMessage() },
        pincode: { required: requiredMessage() },
        effectdate: { required: requiredMessage() },
        effecttime: { required: requiredMessage() },
        age: { required: requiredMessage(), between: betweenMessage() },
        domestic: { required: requiredMessage() },
        gender: { required: requiredMessage() },
        marrystatus: { required: requiredMessage() },
        licenses: { required: requiredMessage() },
        languages: { required: requiredMessage() },
      } 
    });
    const v$ = useVuelidate(validateRules, localData, { $lazy: true, $autoDirty: true });
    return { mode, v$, localData, disabledKeyField, reqalert, agealert };
  },
  created() {
    watch(this.$props, (newProps) => {      
      this.reqalert = newProps.labels.empty_alert;
      this.agealert = newProps.labels.age_alert;
    });
  },
  computed: {
    insertMode() {
      return this.mode.action=="insert" || this.mode.action=="new";
    },
    updateMode() {
      return this.mode.action=="update" || this.mode.action=="edit";
    },
  },
  mounted() {
    this.$nextTick(function () {
      $("#modaldialog_layer").find(".modal-dialog").draggable();
    });
  },
  methods: {
    reset(newData,newMode) {
      if(newData) this.localData = {...newData};
      if(newMode) this.mode = {...newMode};
    },
    submit() {      
      this.$emit('update:formData', this.localData);
    },
    async saveClick() {
      console.log("click: save");
      let valid = await this.validateForm();
      if(!valid) return;
      this.startSaveRecord();
    },
    async updateClick() {
      console.log("click: update");
      let valid = await this.validateForm();
      if(!valid) return;
      this.startUpdateRecord();
    },
    async validateForm(focusing=true) {
      const valid = await this.v$.$validate();
      console.log("validate form: valid",valid);
      console.log("error:",this.v$.$errors);
      if(!valid) {
        if(focusing) {
          this.focusFirstError();
        }
        return false;
      }
      return true;
    },
    focusFirstError() {
      if(this.v$.$errors && this.v$.$errors.length > 0) {
        let input = this.v$.$errors[0].$property;
        let el = this.$refs[input];
        if(el) el.focus(); //if using ref
        else $("#"+input).trigger("focus"); //if using id
      }
    },
    showDialog() {
      //$("#modaldialog_layer").modal("show");
      $(this.$refs.dialogForm.$el).modal("show");
    },  
    hideDialog() {
      //$("#modaldialog_layer").modal("hide");
      $(this.$refs.dialogForm.$el).modal("hide");
    },
    resetRecord() {
      //reset to default data 
      this.reset(defaultData,{action:"insert"});
      //reset validator
      this.v$.$reset();
      //enable key field
      this.disabledKeyField = false;
    },
    startInsertRecord() {
      this.resetRecord();
      this.showDialog();
    },
    startSaveRecord() {
      confirmSave(() => {
        this.saveRecord(this.localData);
      });
    },
    startUpdateRecord() {
      confirmUpdate(() => { 
        this.updateRecord(this.localData);
      });
    },
    startDeleteRecord(dataKeys) {
      confirmDelete(Object.values(dataKeys),() => {
        this.deleteRecord(dataKeys);
      });
    },
    saveRecord(dataRecord) {
        let jsondata = {ajax: true};
        //Object.assign(jsondata,dataRecord);
        let formdata = serializeParameters(jsondata,dataRecord);
        startWaiting();
        $.ajax({
          url: getApiUrl()+"/api/demo002/insert",
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
            console.log("success",data);
            if(detectErrorResponse(data)) return;
            successbox(() => {
              //reset data for new record insert
              this.resetRecord();
              this.$refs.account.focus();
            });
            this.$emit('data-saved',dataRecord,data);
          }
      });
    },
    updateRecord(dataRecord) {
        let jsondata = {ajax: true};
        //Object.assign(jsondata,dataRecord);
        let formdata = serializeParameters(jsondata,dataRecord);
        startWaiting();
        $.ajax({
          url: getApiUrl()+"/api/demo002/update",
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
            console.log("success",data);
            if(detectErrorResponse(data)) return;
            successbox(() => {
              this.hideDialog();
            });
            this.$emit('data-updated',dataRecord,data);
          }
      });
    },
    retrieveRecord(dataKeys) {
      let jsondata = {ajax: true};
      //Object.assign(jsondata,dataKeys);
      let formdata = serializeParameters(jsondata,dataKeys);
      startWaiting();
      $.ajax({
        url: getApiUrl()+"/api/demo002/retrieve",
        data: formdata.jsondata,
        headers : formdata.headers,
        type: "POST",
        dataType: "json",
        contentType: DEFAULT_CONTENT_TYPE,
        error : function(transport,status,errorThrown) {
          console.error("retrieveRecord: error: status",status,"errorThrown",errorThrown);
          submitFailure(transport,status,errorThrown);
        },
        success: (data) => {
          stopWaiting();
          console.log("retrieveRecord: success",data);
          if(data.body.dataset) {
            this.reset(data.body.dataset,{action:"edit"});
            this.v$.$reset();
            this.disabledKeyField = true;
            this.showDialog();
          }
        }
      });	
    },
    deleteRecord(dataKeys) {
      let jsondata = {ajax: true};
      //Object.assign(jsondata,dataKeys);
      let formdata = serializeParameters(jsondata,dataKeys);
      startWaiting();
      $.ajax({
        url: getApiUrl()+"/api/demo002/remove",
        data: formdata.jsondata,
        headers : formdata.headers,
        type: "POST",
        dataType: "json",
        contentType: DEFAULT_CONTENT_TYPE,
        error : function(transport,status,errorThrown) {
          console.error("deleteRecord: error: status",status,"errorThrown",errorThrown);
          submitFailure(transport,status,errorThrown);
        },
        success: (data) => {
          stopWaiting();
          console.log("deleteRecord: success",data);
          if(detectErrorResponse(data)) return;
          successbox();
          this.$emit('data-deleted',dataKeys,data);
        }
      });	
    },
  }
};
</script>
