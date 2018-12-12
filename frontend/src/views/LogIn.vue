<template lang="pug">
  v-layout(justify-center)
    v-flex(xs4)
      form(@submit.prevent="submit")
        v-card(raised)
          v-card-text
            v-text-field(label="Name", v-model="user_name", ref="user_name")
          v-card-actions
            v-spacer
            v-btn(type="submit") Log In
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { session } from '@/session';
import router from '@/router';


@Component
export default class extends Vue {
  user_name = ''

  async submit() {
    const { user_name } = this
    const { error } = await session.login(user_name)
    if (error != undefined) {
      alert(error)
    }
    else {
      router.push({ name: 'home' })
    }
  }

  mounted() {
    this.focus()
  }

  private focus() {
    setTimeout(() => (this.$refs.user_name as any).focus(), 400)
  }
}
</script>