<template lang="pug">
.spinner
  .block(v-show="show", @mousedown.stop.prevent)
  transition(name="fade")
    .modal(v-show="show2")
      transition(name="scale", appear)
        v-progress-circular(:size="200", indeterminate, color="white")
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ default: false })
  show!: boolean

  @Prop({ default: 0 })
  delay!: number

  @Watch('show', { immediate: true })
  onShowChange(show: boolean) {
    if (show) {
      setTimeout(() => {
        this.show && (this.show2 = true)
      }, this.delay)
    }
    else {
      this.show2 = false
    }
  }
  show2 = false
}
</script>


<style lang="scss" scoped>
.modal,
.block {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal {
  background-color: rgba(black, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
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