<template>
<div id="event-form" :class="{ active: active }" :style="{ top: top, left: left }">
  <h4>Add new event</h4>
  <div class="text">
    <input type="text" v-model="description">
  </div>
  <div class="buttons">
    <button @click="create">Create</button>
    <button>Cancel</button>
  </div>
  <button id="close-button" @click="close">&#10005;</button>
</div>
</template>
<script>
export default {
  data() {
    return {
      description: ''
    }
  },
  methods: {
    create() {
      this.$store.commit('addEvent', this.description)
    },
    close() {
      this.$store.commit('eventFormActive', false)
    }
  },
  computed: {
    active() {
      return this.$store.state.eventFormActive
    },
    top() {
      return `${this.$store.state.eventFormPosY}px`
    },
    left() {
      return `${this.$store.state.eventFormPosX}px`
    }
  }
}
</script>

