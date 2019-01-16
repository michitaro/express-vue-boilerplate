<template lang="pug">
.center
  form(@submit.prevent="submit")
    dl
      dt ID
      dd
        input(type="text", v-model="account_name", ref="account_name")
      dt Password
      dd
        input(type="password", v-model="password")
    .center
      input(type="submit", value="LogIn")
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { session } from '@/session';
import router from '@/router';


@Component
export default class extends Vue {
  account_name = ''
  password = ''

  async submit() {
    const { account_name, password } = this
    const { error } = await session.login(account_name, password)
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
    (this.$refs.account_name as HTMLInputElement).focus()
  }
}
</script>


<style lang="scss" scoped>
form {
  display: inline-block;
  padding: 1em;
  dd {
    margin: 0;
  }
}

.center {
  display: flex;
  justify-content: center;
}
</style>