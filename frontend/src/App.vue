<template lang="pug">
.app
  transition(name="fade" mode="out-in")
    router-view
</template>


<script lang="ts">
import Vue from 'vue'
import { session } from "@/session"

export default Vue.extend({
  data() {
    return { session }
  },
  methods: {
    async logout() {
      await session.logout()
    },
  }
})
</script>


<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.125s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>