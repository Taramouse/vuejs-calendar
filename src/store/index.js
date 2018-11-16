import Vue from 'vue'
import Vuex from 'vuex'

import moment from 'moment-timezone'
moment.tz.setDefault('UTC')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentYear: 2018,
    currentMonth: 11,
    eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false,
    events: [
      {description: 'Applied for PIP', date: moment('2018-11-15', 'YYYY-MM-DD') },
      {description: 'PIP form sent', date: moment('2018-11-16', 'YYYY-MM-DD') },
      {description: 'UC Pay Day', date: moment('2018-11-27', 'YYYY-MM-DD') }
    ]
  },
  mutations: {
    setCurrentMonth(state, payload) {
      state.currentMonth = payload
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload
    },
    eventFormPos(state, payload) {
      state.eventFormPosX = payload.x
      state.eventFormPosY = payload.y
    },
    eventFormActive(state, payload) {
      state.eventFormActive = payload
    },
    addEvent(state, payload) {
      state.events.push({
        description: payload,
        date: moment()
      })
    }
  }
})
