import Spinner from "./components/Spinner.vue";
import Vue, { CreateElement } from 'vue'
import { Component } from "vue-property-decorator";

@Component
class SpinnerHandler extends Vue {
  count = 0

  get show() {
    return this.count > 0
  }

  render(h: CreateElement) {
    return h(Spinner, { props: { delay: 125, show: this.show } })
  }
}

const vm = new SpinnerHandler()

export function start() {
  ++vm.count
}

export function stop() {
  --vm.count
}

export function install() {
  window.addEventListener('DOMContentLoaded', e => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    vm.$mount(el)
  })
}