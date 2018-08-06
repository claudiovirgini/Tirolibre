import Vue from 'vue'
import Vuex from 'vuex'


import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import { serverBus } from '../main';

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate,
  {
    baseUrl: 'http://localhost:61610',
    //baseUrl: 'http://testservice.tirolibre.it',
    loginUrl: '/auth/login',
    getUser: '/auth/login',
    registerUrl: '/api/Account/Register'
  });

export const store = new Vuex.Store({
  state: {
    what: '',
    where: '',
    player: '',
    configurations: {
      serviceBaseUrl: 'http://localhost:61610',
      loginUrl   : '/auth/login',
      signupUrl  : '/api/Account/Register',
      getPlayerInfoUrl : '/api/Player/GetPlayerInfo',
      environment: 1
    },
    authentichation: {
      token: null,
      user: null,
      isAuth: false
    }
  },

  mutations: {

    SET_AUTH(state,data) {
      if (data === null) {
        state.authentichation.isAuth = false;
        state.authentichation.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        state.authentichation.token = null;
      } else {
        localStorage.setItem('user', data.userInfo);
        localStorage.setItem('token', data.token);
        state.authentichation.isAuth = true;
        state.authentichation.user = JSON.parse(data.userInfo);
        state.authentichation.token = data.token;
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
    },
    login({ commit, dispatch }, authData) {
      const data = "grant_type=password&userName=" + authData.email + "&password=" + authData.pwd;
      axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.loginUrl, data)
        .then(res => {
          //var userRead = JSON.parse(res.data.user);
          commit('SET_AUTH', { token: res.data.access_token, userInfo: res.data.user });
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
      const data = { Email: authData.email, Password: authData.password, Environment: this.state.configurations.environment, Profile: authData.profile }
      axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.signupUrl, data)
        .then(res => {
          alert('Signup OK');
        })
        .catch(error => alert(error.response.data.error_description));
    }


  }
 
})
