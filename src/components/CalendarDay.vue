<template>
<div :class="classObject" @click="captureClick">{{day.format('D')}}</div>
</template>
<script>
export default {
  props: ['day'],
  methods: {
    captureClick(event) {
      this.$store.commit('eventFormPos', { x: event.clientX, y: event.clientY })
    }
  },
  computed: {
    classObject() {
      let today = this.day.isSame(this.$moment(), 'day')
      return {
        day: true,
        today,
        past: this.day.isSameOrBefore(this.$moment(), 'day') && !today
      }
    }
  }
}
</script>
