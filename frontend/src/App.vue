<template lang="pug">
v-app(dark)
  v-toolbar(app, color="indigo")
    v-toolbar-title.headline.text-uppercase
      span Echo
    v-spacer
    transition(name="scale")
      v-btn(v-if="session.loggedIn", @click="logout", fab, small)
        v-icon exit_to_app
  v-content
    v-container(grid-list-md)
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

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.25s;
}
.scale-enter,
.scale-leave-to {
  transform: scale(0);
}
</style>