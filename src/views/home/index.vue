<template>
  <div>home</div>
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

<style lang="less" scoped></style>
