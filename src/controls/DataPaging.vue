<template>
<div class="fschaptertablelayer">
<table class="fschaptertable">
	<tr class="fschapterrow"><td class="fschaptercolumn">
	<div class="fschapterlayer">
    <ul class="page-table-class pagination pagination-sm" >
        <li v-for="(item,index) in pager" :key="index" class="page-item page-column-class" :class="item.css">
            <A HREF="javascript:void(0)" @click="pageSelect(item)" class="page-link pagenoclass fa-data-page" :class="item.css" :data-paging="item.page">{{ item.text }}</A>
        </li>
    </ul>
    </div>
	</td>
	</tr>
</table>
</div>
</template>
<script>
import { ref } from 'vue';
import { Paging } from "@/assets/js/Paging.js";

export default {
  props: {
    settings: Object
  },
  emits: ["page-select"],
  setup(props) {
    let paging = new Paging(props.settings);
    let model = paging.buildPagingModel();
    let pager = ref(model);
    return { paging, pager };
  },
  methods: {
    reset(newSettings) {
      if(newSettings) {
        this.paging.reset(newSettings);
        let model = this.paging.buildPagingModel();
        this.pager = {...model};
      }
    },
    pageSelect(item) {
      this.$emit('page-select', item);
    }
  }
};
</script>
