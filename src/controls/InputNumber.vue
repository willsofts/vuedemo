<template>
  <input ref="input" type="text" v-model="model" :id="id" :name="name" :class="inputClasses" :disabled="disabled" v-bind="$attrs" />
</template>
<style>
.iint { text-align: right; }
</style>
<script>
import $ from "jquery";
import { getControlClasses, inputNumberOnly }  from '@/assets/js/ctrl.util.js'
import { randomNumber }  from '@/assets/js/random.util.js'

export default {
  props: {
    modelValue: [String, Number],
    id: {
      type: String,
      default: "input_"+randomNumber()+"_"+new Date().getTime(),
    },
    name: {
      type: String,
      required: false,
    },    
    disabled: {
      type: [String,Boolean],
      required: false,
    },
  },
  setup(props,context) {
    let attrClass = context.attrs.class?context.attrs.class:"";
    let inputClasses = getControlClasses(attrClass,'form-control','ivue','iint');
    let isTypeNumeric = typeof props.modelValue === 'number';
    return { inputClasses, isTypeNumeric };
  },
  mounted() {
    let element = document.getElementById(this.id);
    $(element).on("keypress",function(event) { return inputNumberOnly(this,event); });
  },
  emits: ['update:modelValue'],
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        if(this.isTypeNumeric) {
          if(value=="-") { this.$emit('update:modelValue', value); return; }
          if(!value) { value = "0"; }
          this.$emit('update:modelValue', Number(value.replaceAll(',','')));
          return;
        }
        this.$emit('update:modelValue', value);
      }
    },
  }, 
  methods: {
    focus() {
      this.$refs.input.focus();
    },
  } 
};
</script>
