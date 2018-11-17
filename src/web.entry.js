import Vue from 'vue'
import './style.scss'

import store from './store'

import moment from 'moment-timezone'
moment.tz.setDefault('UTC')
Object.defineProperty(Vue.prototype, '$moment', {
  get() {
    return this.$root.moment
  }
})

import App from './components/App.vue'

let events = [
  {description: 'Example Event 1', date: moment('2018-11-15', 'YYYY-MM-DD') },
  {description: 'Example Event 2', date: moment('2018-11-16', 'YYYY-MM-DD') },
  {description: 'Example Event 3', date: moment('2018-11-27', 'YYYY-MM-DD') }
]
let initialState = Object.assign({}, store.state, { events })
store.replaceState(initialState)

new Vue({
  el: '#app',
  data: {
    moment
  },
  components: {
    App
  },
  store
})
