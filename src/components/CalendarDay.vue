<template>
  <div :class="classObject" @click="captureClick">
    {{ day.format('D') }}
    <ul class="event-list">
      <li v-for="event in events" :key="event.description">{{ event.description }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['day'],
  methods: {
    captureClick(event) {
      this.$store.commit('eventFormPos', { x: event.clientX, y: event.clientY })
      this.$store.commit('eventFormActive', true)
    }
  },
  computed: {
    events() {
      let mockData = [
        {description: 'Applied for PIP', date: this.$moment('2018-11-15', 'YYYY-MM-DD') },
        {description: 'PIP form sent', date: this.$moment('2018-11-16', 'YYYY-MM-DD') },
        {description: 'UC Pay Day', date: this.$moment('2018-11-27', 'YYYY-MM-DD') }
      ]
      return mockData.filter(event => event.date.isSame(this.day, 'day'))
    },
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
