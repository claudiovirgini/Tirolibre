import Vue from 'vue'
import Vuex from 'vuex'

import Router from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { serverBus } from '../main';

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(Router)

export const store = new Vuex.Store({
  state: {
    who: '',
    what: '',
    where: '',
    playerSelected: '',
    configurations: {
      //serviceBaseUrl: 'http://localhost:61610/',
      serviceBaseUrl: 'http://testservice.tirolibre.it',
      imageRootUrl: 'http://tirolibre.it/CDN/',
      //serviceBaseUrl: 'http://testservice.tirolibre.it',
      loginUrl   : '/auth/login',
      signupUrl  : '/api/Account/Register',
      getPlayerInfoUrl: '/api/Player/GetPlayerInfo',
      savePlayerInfoUrl: '/api/Player/SavePlayerInfo',
      getTeamAroundPoint: '/api/Player/GetTeamsAroundPoint',
      FindUserUrl: '/api/Player/FindUser',

      getAgentInfoUrl: '/api/Agent/GetAgentInfo',
      getAgentPlayerListUrl: '/api/Agent/GetAgentPlayerList',
      saveAgentInfoUrl: '/api/Agent/SaveAgentInfo',
      getPlayerAgentInfoUrl: '/api/Agent/GetPlayerAgentInfo',
      addOrUpdateAgentPlayeroUrl: '/api/Agent/AddOrUpdateAgentPlayer',
      deleteeAgentPlayerUrl  : '/api/Agent/DeleteeAgentPlayer',


      environment: 1

    },
    authentication: {
      token: null,
      user: null,
      userImageUrl : null,
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
        localStorage.removeItem('userImageUrl');

        state.authentication.token = null;
      } else {
        localStorage.setItem('user', data.userInfo);
        localStorage.setItem('userImageUrl', data.imageUrl);
        localStorage.setItem('token', data.token);
        state.authentication.isAuth = true;
        state.authentication.user = JSON.parse(data.userInfo);
        state.authentication.userImageUrl = data.imageUrl;
        state.authentication.token = data.token;
      }
    },

    SET_WHO(state, who) {
      state.who = who;
    },
    SET_WHAT(state, what) {
      state.what = what;
    },
    SET_WHERE(state, where) {
      state.where = where;
    },
    SET_PLAYER(state, player) {
      state.playerSelected = player;
    }
  },
  actions: {
    getRoleList: function() {
      let roleRilst = [];
      roleRilst.push({ text: 'Tutti i ruoli', value: -1 });
      roleRilst.push({ text: 'Portiere', value: 1 });
      roleRilst.push({ text: 'Centrale Destro', value: 2 });
      roleRilst.push({ text: 'Centrale Sinistro', value: 3 });
      roleRilst.push({ text: 'Terzino Destro', value: 4 });
      roleRilst.push({ text: 'Terzino Sinistro', value: 5 });
      roleRilst.push({ text: 'Ala Destra', value: 6 });
      roleRilst.push({ text: 'Ala Sinistra', value: 7 });
      roleRilst.push({ text: 'Mediano', value: 8 });
      roleRilst.push({ text: 'Centrocampista', value: 9 });
      roleRilst.push({ text: 'Seconda Punta', value: 10 });
      roleRilst.push({ text: 'Prima Punta', value: 11 });
      return roleRilst;
    },
    getStatus: function () {
      let statusLlst = [];
      statusLlst.push({ text: 'Tutto', value: -1 });
      statusLlst.push({ text: 'Svincolato', value: 0 });
      statusLlst.push({ text: 'Contratto a 1 anno', value: 1 });
      statusLlst.push({ text: 'Contratto a 2 anni', value: 2 });
      statusLlst.push({ text: 'Contratto a 3 anni', value: 3 });
      statusLlst.push({ text: 'Contratto a 4 anni', value: 4 });
      return statusLlst;
    },
    getCategories: function () {
      let categoryLlst = [];
      categoryLlst.push({ text: 'Tutte le categorie', value: -1 });
      categoryLlst.push({ text: 'Seria A', value: 0 });
      categoryLlst.push({ text: 'Serie B', value: 1 });
      categoryLlst.push({ text: 'Serie C', value: 2 });
      categoryLlst.push({ text: 'Serie D', value: 3 });
      categoryLlst.push({ text: 'Eccellenza', value: 4 });
      categoryLlst.push({ text: 'Promozione', value: 5 });
      categoryLlst.push({ text: 'Prima Categoria', value: 6 });
      categoryLlst.push({ text: 'Seconda Categoria', value: 7 });
      categoryLlst.push({ text: 'Terza Categoria', value: 8 });
      categoryLlst.push({ text: 'Juniores', value: 9 });
      categoryLlst.push({ text: 'Allievi Nazionali', value: 10 });
      categoryLlst.push({ text: 'Primavera', value: 11 });
      categoryLlst.push({ text: 'Scuola calcio', value: 12 });
      return categoryLlst;
    },
    getClassList: function () {
      let classilst = [];
      classilst.push({ text: 'Tutto', value: 0 });
      for (let i = 0; i < 10; i++) {
        var myDate = new Date();
        let classToAdd = myDate.getFullYear() - 5 - i;
        classilst.push({ text: classToAdd, value: classToAdd});
      }
      return classilst;
    },
    getProfileList: function () {
      let profileList = [];
      profileList.push({ text: 'Tutto', value: -1 });
      profileList.push({ text: 'calciatore', value: 0 });
      profileList.push({ text: 'CLUB', value: 1 });
      profileList.push({ text: 'agente', value: 2 });
      // profileList.push({ text: 'allenatore', value: 3 });
      // profileList.push({ text: 'direttore Sportivo', value: 4 });
      return profileList;
    },
    makeid: function () {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    },
    logout({ commit, dispatch }) {
      commit('SET_AUTH', null);
      serverBus.$emit('route', '');
    },
    login({ commit, dispatch }, authData) {
      const data = "grant_type=password&userName=" + authData.email + "&password=" + authData.pwd;
      axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.loginUrl, data)
        .then(res => {
          //var userRead = JSON.parse(res.data.user);

          commit('SET_AUTH', { token: res.data.access_token, userInfo: res.data.user, imageUrl: res.data.imageUrl });
          serverBus.$emit('route', 'user');
        })
        .catch(error => alert(error.response.data.error_description));
    },
    signup({ commit, dispatch }, authData) {
      const data = { Email: authData.email, Password: authData.password, Environment: this.state.configurations.environment, Profile: authData.profile }
      axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.signupUrl, data)
        .then(res => {
           // alert('Signup OK');
          })
        .catch(error => alert(error.response.data.error_description));
    },
    fetchUser({ commit, state }) {
      const token = localStorage.getItem('token');
      if (token != null) {
        var userRead = localStorage.getItem('user');
        var imgUrlRead = localStorage.getItem('userImageUrl');
        commit('SET_AUTH', { token: token, userInfo: userRead, imageUrl: imgUrlRead });
      }
    },


    getPlayerProfile({ commit, state }, playerId) {
      const data = { PlayerId: playerId }
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.getPlayerInfoUrl, data);
    },
    getTeamAroundPoint({ commit, state }, params) {
      const data = { Latitudine: params.lat, Longitudine: params.lng, Radius: params.rad, Top: params.top  }
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.getTeamAroundPoint,data);
    },
    savePlayerProfile({ commit, state }, player) {
      const data = { Player: player }
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.savePlayerInfoUrl, data);
    },


    getAgentProfile({ commit, state }, agentId) {
      const data = { AgentId: agentId }
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.getAgentInfoUrl, data);
    },
    getPlayerAgentProfile({ commit, state }, playerId) {
      const data = { PlayerId: playerId }
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.getPlayerAgentInfoUrl, data);
    },
    saveAgentProfile({ commit, state }, agent) {
      const data = { Agent: agent }
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.saveAgentInfoUrl, data);
    },
    addOrUpdateAgentPlayer({ commit, state }, params) {
      const data = { AgentId: params.agentId, Player: params.player}
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.addOrUpdateAgentPlayeroUrl, data);
    },
    deletePlayerAgent({ commit, state }, playerId) {
      const data = { AgentPlayerId: playerId }
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.deleteeAgentPlayerUrl, data);
    },

    getAgentPlayerList({ commit, state }, agentId) {
      const data = { AgentId: agentId }
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.getAgentPlayerListUrl, data);
    },

    findUser({ commit, state }, param) {
      let playerDetails = { Role: null, Category: null, Class: null, Status: null };
      let teamDetails = { Category: null };
      if (param.playerFilter != null) {
        playerDetails.Role = param.playerFilter.role > -1 ? param.playerFilter.role : null;
        playerDetails.Category = param.playerFilter.category > -1 ? param.playerFilter.category : null;
        playerDetails.Class = param.playerFilter.class > -1 ? param.playerFilter.class : null;
        playerDetails.Status = param.playerFilter.status != 'Tutto' ? param.playerFilter.status : null;
      }
      if (param.teamFilter != null) {
        teamDetails.Category = param.teamFilter.category;
      }
      let dataParam = { PlayerDetail: playerDetails, TeamDetail: teamDetails, Profile: param.profile, Radius: param.radius, FullAddressJson: param.place };
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.FindUserUrl, dataParam);
    }
  }

})
