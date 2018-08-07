import Vue from 'vue'
import Vuex from 'vuex'

import Router from 'vue-router'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import { serverBus } from '../main';

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(Router)

export const store = new Vuex.Store({
  state: {
    what: '',
    where: '',
    player: '',
    configurations: {
      serviceBaseUrl: 'http://localhost:61610/',
      imageRootUrl: 'http://tirolibre.it/CDN/',
      //serviceBaseUrl: 'http://testservice.tirolibre.it',
      loginUrl   : '/auth/login',
      signupUrl  : '/api/Account/Register',
      getPlayerInfoUrl: '/api/Player/GetPlayerInfo',
      savePlayerInfoUrl: '/api/Player/SavePlayerInfo',

      environment: 1

    },
    authentication: {
      token: null,
      user: null,
      isAuth: false
    }
  },

  mutations: {

    SET_AUTH(state,data) {
      if (data === null) {
        state.authentication.isAuth = false;
        state.authentication.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        state.authentication.token = null;
      } else {
        localStorage.setItem('user', data.userInfo);
        localStorage.setItem('token', data.token);
        state.authentication.isAuth = true;
        state.authentication.user = JSON.parse(data.userInfo);
        state.authentication.token = data.token;
      }
    },
    SET_WHAT(state, what) {
      state.what = what;
    },
    SET_WHERE(state, where) {
      state.where = where;
    },
    SET_PLAYER(state, player) {
      state.player = player;
    }
  },
  actions: {
    logout({ commit, dispatch }) {
      commit('SET_AUTH', null);
      serverBus.$emit('route', '');
    },
    login({ commit, dispatch }, authData) {
      const data = "grant_type=password&userName=" + authData.email + "&password=" + authData.pwd;
      axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.loginUrl, data)
        .then(res => {
          //var userRead = JSON.parse(res.data.user);
          commit('SET_AUTH', { token: res.data.access_token, userInfo: res.data.user });
          serverBus.$emit('route', 'user');
        })
        .catch(error => alert(error.response.data.error_description));
    },
    signup({ commit, dispatch }, authData) {
      const data = { Email: authData.email, Password: authData.password, Environment: this.state.configurations.environment, Profile: authData.profile }
      axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.signupUrl, data)
        .then(res => {
           alert('Signup OK');
          })
        .catch(error => alert(error.response.data.error_description));
    },
    fetchUser({ commit, state }) {
      const token = localStorage.getItem('token');
      if (token != null) {
        var userRead = localStorage.getItem('user');
        commit('SET_AUTH', { token: token, userInfo: userRead });
      }
    },


    getPlayerProfile({ commit, state }, playerId) {
      const data = { PlayerId: playerId }      
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.getPlayerInfoUrl, data);
    },

    savePlayerProfile({ commit, state }, player) {
      const data = { Player: player }
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.savePlayerInfoUrl, data);
    }
  }
 
})
