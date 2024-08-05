<template>
  <input ref="input" type="text" @input="updateValue" @select="updateValue" :value="modelValue" :id="id" :name="name" :class="inputClasses" :editable="isEditable" :disabled="disabled" v-bind="$attrs" />
</template>
<script>
import $ from "jquery";
import { getControlClasses }  from '@/assets/js/ctrl.util.js'
import { randomNumber }  from '@/assets/js/random.util.js'

export default {
  props: {
    modelValue: String,
    id: {
      type: String,
      default: "input_"+randomNumber()+"_"+new Date().getTime(),
    },
    name: {
      type: String,
      required: false,
    },    
    disabled: {
      type: [String, Boolean],      
      required: false,
    }
  },
  setup(props,context) {
    let attrClass = context.attrs.class?context.attrs.class:"";
    let inputClasses = getControlClasses(attrClass,'form-control','ivue','iedit','itime');
    const updateValue = (event) => {
      context.emit('update:modelValue', event.target.value);
    }
    return { updateValue, inputClasses };
  },
  mounted() {
    let element = document.getElementById(this.id);
    $(element).clockpicker({ align: "left", autoclose: true, donetext: "Done", cleartext: "Clear", 
				afterDone: function() {
					element.dispatchEvent(new Event('select')); 
					let fn = $(element).data("afterSelectTimePicker");
					if(fn) fn(element);
				} 
			});
  },
  computed: {
    isEditable() {
      if(this.disabled === false || this.disabled === "false") return true;
      return false;
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
  }
};
</script>
