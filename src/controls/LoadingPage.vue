<template>
    <div class="loading-layer" v-show="visible">
        <span class="loading-span" v-show="animate"><em class="fa fa-spinner fa-spin"></em></span><br/>
        <span>Loading ...</span>
        <slot></slot>
    </div>
</template>
<style scoped>
.loading-span { color: #1E90FF; font-size: 2.0rem; }
.loading-layer { text-align: center; font-size: 2.0rem; padding-top: 50px; }
</style>
<script>
export default {
    props: {
        visible: {
            type: [String,Boolean],
            default: true,
        },
        animate: {
            type: [String,Boolean],
            default: true,
        }
    },
    setup() {
        
    },
};
</script>
