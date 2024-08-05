<template>
    <div class="input-group-container">
        <div class="input-group input-group-calendar">
            <input ref="input" type="text" @input="updateValue" @select="updateValue" :value="modelValue" :id="id" :name="name" :class="inputClasses" maxlength="10" editable="true" :disabled="disabled" readonly v-bind="$attrs" />
            <A href="javascript:void(0)" @click="showInputCalendar" :id="lookupButton" tabIndex="-1" class="input-group-addon input-group-append input-group-text input-group-lookup"><i class="fa fa-calendar" aria-hidden="true"></i></A>
            <A href="javascript:void(0)" @click="clearInputCalendar" :id="clearButton" tabIndex="-1" class="input-group-addon input-group-append input-group-text input-group-clear"><i class="fa fa-times" aria-hidden="true"></i></A>
        </div>
    </div>
</template>
<script>
import { getControlClasses, openCalendar, clearCalendar }  from '@/assets/js/ctrl.util.js'
import { randomNumber }  from '@/assets/js/random.util.js'

export default {
  inheritAttrs: false, //disable all attributes from parent
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
  },
  setup(props,context) {
    let attrClass = context.attrs.class?context.attrs.class:"";
    //let inputClasses = props.classes; 
    //error: Getting a value from the `props` in root scope of `setup()` will cause the value to lose reactivity
    let inputClasses = getControlClasses(attrClass,'form-control','ivue','iedit','idate');
    const updateValue = (event) => {
      context.emit('update:modelValue', event.target.value);
    }
    return { updateValue, lookupButton: "LK"+props.id, clearButton: "CLR"+props.id, inputClasses };
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    showInputCalendar() {
      openCalendar(document.getElementById(this.id));
    },
    clearInputCalendar() {
      clearCalendar(document.getElementById(this.id));
    },
    updateInput(value) {
      this.$emit("update:modelValue", value);
    }
  }
};
</script>
