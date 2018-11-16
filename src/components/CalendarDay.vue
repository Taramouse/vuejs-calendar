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
        {description: 'Random Event 1', date: this.$moment('2018-11-18', 'YYYY-MM-DD') },
        {description: 'Random Event 2', date: this.$moment('2018-11-20', 'YYYY-MM-DD') },
        {description: 'Random Event 3', date: this.$moment('2018-11-22', 'YYYY-MM-DD') }
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
