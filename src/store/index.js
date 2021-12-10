import Vue from 'vue'
import Vuex from 'vuex'
import tagsView from './modules/tagsView.js'
import app from './modules/app.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    tagsView: tagsView,
    app:app
  }

})
