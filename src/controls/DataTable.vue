<template>
<table class="data-table table table-bordered table-hover table-striped tablesorter">
	<thead class="data-table-header">
		<tr>
      <template v-if="hasSequence">
			<th class="text-center th-sequence"><label>{{ labels[headers.sequence.label] }}</label></th>
      </template>
      <template v-for="(item,index) in headers.columns" :key="index">
        <template v-if="item.sorter">
          <th class="text-center th-data"><A href="javascript:void(0)" class="alink-sorter fa-data-sort" @click="dataSort(item)"><label v-html="labels[item.label]"></label></A></th>
        </template>
        <template v-else>
          <th class="text-center th-data"><label v-html="labels[item.label]"></label></th>
        </template>
      </template>
      <template v-if="hasActions">
			<th class="text-center th-action"><em class="fa fa-bolt" aria-hidden="true"></em></th>
      </template>
		</tr>
	</thead>
	<tbody class="data-table-body">
    <template v-if="hasDataSet">
        <tr v-for="(item,index) in datas?.rows" :key="index">
          <template v-if="hasSequence">
            <td class="text-center"><label>{{ page.recordsNumber(index+1) }}</label></td>
          </template>
          <template v-for="(column,colIndex) in headers.columns" :key="colIndex">
            <td :class="column.css">
                <a href="javascript:void(0)" class="alink-data fa-data-edit" @click="dataSelect(item)"><span v-if="column.unescape" v-html="formatData(item[column.name],column)"></span><span v-else>{{ formatData(item[column.name],column) }}</span></a>
            </td>
          </template>
          <template v-if="hasActions">
            <td class="text-center">
              <template v-for="(action,actionIndex) in headers.actions" :key="actionIndex">
                <template v-if="action.type=='button'">
                  <button :class="action.css" @click="dataSelect(item,action.action)">
                    <template v-if="action.icon"><em :class="action.icon"></em></template>
                  </button>
                </template>
                <template v-if="action.type=='a'">
                  <A href="javascript:void(0)" class="alink-action" :class="action.css" @click="dataSelect(item,action.action)">
                    <template v-if="action.icon"><em :class="action.icon"></em></template>
                  </A>
                </template>
              </template>
            </td>
          </template>
        </tr>
    </template>
    <template v-if="recordNotFound">
        <tr>
            <td class="text-center" :colspan="columnCount">
                {{ labels.record_notfound }}
            </td>
        </tr>
    </template>
	</tbody>
</table>	
</template>
<script>
import { ref } from 'vue';
import { Paging } from "@/assets/js/Paging.js";
import { ensureTableSetting, formatDataTable } from "@/assets/js/ctrl.util.js";

/*
const tableSettings = {
        sequence: { label: "seqno_label" },
        columns: [
          {name: "account", type: "STRING", sorter: "account", label: "account_head" },
          {name: "amount", type: "DECIMAL", sorter: "amount", label: "amount_head" },
          {name: "age", type: "INTEGER", sorter: "age", label: "age_head" },
          {name: "effectdate", type: "DATE", sorter: "effectdate", label: "effectdate_head" },
          {name: "effecttime", type: "TIME", sorter: "effecttime", label: "effecttime_head" }
        ],
        actions: [
          {type: "button", action: "edit", css: "btn-edit fa-data-edit"},
          {type: "button", action: "delete", css: "btn-delete fa-data-delete"}
          {type: "button", action: "view", css: "btn-view fa-data-view"},
          {type: "a", action: "show", css: "fa-data-show", icon: "fa fa-eye"}
        ],
    };
*/
export default {
  props: {
    labels: Object,
    dataset: {
      type: Object,
      default() { return {}; },
    },
    settings: Object,
    formater: Function,
  },
  setup(props) {
    const datas = ref({ ...props.dataset }); 
    const page = new Paging(props.dataset?.offsets);
    const sorting = ref({});
    const setting = ensureTableSetting(props.settings);
    const headers = ref(setting); 
    console.info("setup: table settings",setting);
    return { datas, page, sorting, headers };
  },
  computed: {
    hasSequence() {
      return this.headers.sequence;
    },
    hasActions() {
      return this.headers.actions?.length > 0;
    },
    columnCount() {
      let counter = this.hasSequence ? 1 : 0;
      counter += this.hasActions ? 1 : 0;
      return counter + this.headers.columns?.length;
    },
    hasDataSet() {
        return this.datas?.rows?.length > 0;
    },
    recordNotFound() {
      return this.datas?.rows?.length == 0;
    }
  },
  emits: ["data-select","data-sort"],
  methods: {
    reset(newData) {
      if(newData) {
        this.datas = {...newData};
        this.page.reset(newData?.offsets);
      }
    },
    dataSelect(item,action='edit') {
      this.$emit('data-select', item,action);
    },
    getDirection(orderDir) {
      if(orderDir) {
        return "ASC"==orderDir?"DESC":"ASC";
      }
      return "ASC";
    },
    dataSort(item) {
      let sorter = item.sorter;
      let direction = this.getDirection(this.sorting[sorter]);
      this.sorting[sorter] = direction;
      this.$emit('data-sort', sorter, direction);
    },
    formatData(data,field) {
      if(this.$props.formater) {
        let result = this.$props.formater.call(this,data,field);
        if(result) return result;
      }
      return this.formatField(data,field);
    },
    formatField(data,field) {
      return formatDataTable(data,field);
    },
  }
};
</script>
