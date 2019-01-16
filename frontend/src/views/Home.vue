<template lang="pug">
.home
  table.main
    thead
      tr
        th.toolbar
      tr
        th ID
    tbody
      tr(v-for="i in 200")
        td {{i}}
  Menu
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { session } from "../session"
import Menu from './Menu.vue'
// import Axios from 'axios'
// import { echo_post_request, echo_post_response } from "~/shared/api-schema/echo"


@Component({
  components: { Menu }
})
export default class extends Vue {
  get session() {
    return session
  }
}
</script>


<style lang="scss" scoped>
.main {
  width: 100%;
  padding: 0;
  border-collapse: collapse;
  font-family: monospace;

  thead {
    position: sticky;
    top: 0;
    background-color: #333;
    color: white;
    box-shadow: 0 0 4px rgba(0, 0, 0, 1);
  }

  th {
    border: solid 1px #333;
    text-align: start;
  }

  tbody {
    background-color: white;
  }

  td {
    border: solid 1px #ddd;
  }

  .toolbar {
    padding-top: 50px;
  }
}
</style>