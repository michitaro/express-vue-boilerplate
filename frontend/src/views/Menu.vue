<template lang="pug">
menu-style-black
  menu-bar.menu-bar
    menu-bar-item(label="OSQAH")
      menu-item(label="Log Out", @click="logout")
</template>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { session } from '@/session';

@Component
export default class extends Vue {
  logout() {
    session.logout()
  }
}
</script>


<style lang="scss" scoped>
.menu-bar {
  position: fixed;
  top: 0;
  border-radius: 0 0 4px 0;
}
</style>