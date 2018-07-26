import Vue from 'vue'
import Vuex from 'vuex'


import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  //baseUrl: 'http://localhost:121',
  baseUrl: 'http://testservice.tirolibre.it',
  loginUrl: '/auth/login',
  registerUrl: '/api/Account/Register'

})

export const store = new Vuex.Store({
  state: {
    what: '',
    where: '',
    player: '',
    configurations: {
      serviceBaseUrl: 'http://testservice.tirolibre.it',
      environment : 1
    }
  },
  mutations: {
    SET_WHAT(state, what) {
      state.what = what;
    },
    SET_WHERE(state, where) {
      state.where = where;
    },
    SET_PLAYER(state, player) {
      state.player = player;
    }
  }
})
