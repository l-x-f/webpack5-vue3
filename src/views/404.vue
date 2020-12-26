<template>
  <div>404</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup(props) {
    const state = reactive({})
    return { ...toRefs(state) }
  }
}
</script>

<style lang="less" scoped>
div {
  text-align: center;
  font-size: 100px;
  background-color: #fff;
}
</style>
