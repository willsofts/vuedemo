<template>
  <input ref="input" type="text" v-model="model" :id="id" :name="name" :class="inputClasses" :decimal="decimal" :disabled="disabled" v-bind="$attrs" />
</template>
<style>
.imoney { text-align: right; }
</style>
<script>
import $ from "jquery";
import { getControlClasses, checkInputKey, checkInputNumberOnly, formatFloating }  from '@/assets/js/ctrl.util.js'
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
    decimal: {
      type: [String, Number],
      default: "2",
      required: true,
    },
  },
  setup(props,context) {
    let attrClass = context.attrs.class?context.attrs.class:"";
    let inputClasses = getControlClasses(attrClass,'form-control','ivue','imoney');
    return { inputClasses };
  },
  mounted() {
    let element = document.getElementById(this.id);
    let $this = $(element);
    let decimal = this.decimal;
		$this.on("keyup",function(event) { return checkInputKey(this,event,decimal,null); });
		$this.on("keypress",function(event) { return checkInputNumberOnly(this,event,decimal); });
  },
  emits: ['update:modelValue'],
  computed: {
    model: {
      get() {
        if(typeof this.modelValue === 'number') {
          return formatFloating(this.modelValue,this.decimal);
        }
        return this.modelValue;
      },
      set(value) {
        //if(!value || value.trim().length==0) value ="0";
        //this.$emit('update:modelValue', Number(value.replaceAll(',','')));
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
