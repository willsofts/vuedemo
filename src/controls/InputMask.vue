<template>
  <input ref="input" type="text" @input="updateValue" :value="modelValue" :id="id" :name="name" :class="inputClasses" :picture="picture" :disabled="disabled" v-bind="$attrs" />
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
      type: [String,Boolean],
      required: false,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  setup(props,context) {
    let attrClass = context.attrs.class?context.attrs.class:"";
    let inputClasses = getControlClasses(attrClass,'form-control','ivue','imask');
    const updateValue = (event) => {
      context.emit('update:modelValue', event.target.value);
    }
    return { updateValue, inputClasses };
  },
  mounted() {
    let element = document.getElementById(this.id);
    let $this = $(element);
    try { if(this.picture) { $this.mask(this.picture); } } catch(ex) { console.error(ex); }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
  }
};
</script>
