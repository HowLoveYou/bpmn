import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from './getters'
import app from './modules/app.js'

export default new Vuex.Store({
  modules: {
    app,
  },
  getters
})