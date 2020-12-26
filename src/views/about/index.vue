<template>
  <div>about</div>
  <p>{{ app }}</p>
  <img src="~@/static/poster.png" alt="" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
  setup(props) {
    const store = useStore()
    console.log(store)

    const state = reactive({})
    return { ...toRefs(state), app: store.state.app }
  }
}
</script>

<style lang="less" scoped>
p {
  margin-top: 20px;
  background-color: #ccc;
}
</style>
