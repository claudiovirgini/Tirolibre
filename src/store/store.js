import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const store = new Vuex.Store({
  state: {
    what: '',
    where: '',
    player: ''
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
