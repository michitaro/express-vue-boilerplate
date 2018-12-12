<template lang="pug">
  v-layout(justify-center)
    v-flex(xs4)
      v-card.dynamic-height
        form(@submit.prevent="submit")
          v-card-title Hello {{ session.info.user_name }}!
          v-card-actions
            v-text-field(v-model="content", ref="content")
            v-btn(small, fab, type="submit")
              v-icon send
          v-card-text
            v-list
                div(v-for="record in history", :key="record.time")
                  v-list-tile {{ record.content }}
                  v-divider
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { session } from "../session"
import Axios from 'axios'
import { echo_post_request, echo_post_response } from "~/shared/api-schema/echo"


@Component
export default class extends Vue {
  content = ''
  history: echo_post_response[] = []

  get session() {
    return session
  }

  async submit() {
    const { content } = this
    this.content = ''
    const reqbody: echo_post_request = { content }
    const resbody = (await Axios.post<echo_post_response>('./api/echo', reqbody)).data
    this.history.unshift(resbody)
  }

  mounted() {
    this.focus()
  }

  private focus() {
    this.$nextTick((<any>this.$refs.content).focus())
  }
}
</script>