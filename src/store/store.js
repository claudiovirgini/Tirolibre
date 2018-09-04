import Vue from 'vue'
import Vuex from 'vuex'

import Router from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import fs from "fs"
import path from 'path'
import { serverBus } from '@/main';

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
      //serviceBaseUrl: 'http://localhost:114/',

      serviceBaseUrl: 'http://testservice.tirolibre.it',
      imageRootUrl: 'http://tirolibre.it/CDN/',
      //serviceBaseUrl: 'http://testservice.tirolibre.it',
      loginUrl   : '/auth/login',
      signupUrl: '/api/Account/Register',
      confirmEmailUrl: '/api/Account/ConfirmEmail',
      getPlayerInfoUrl: '/api/Player/GetPlayerInfo',
      savePlayerInfoUrl: '/api/Player/SavePlayerInfo',
      getTeamAroundPointUrl: '/api/Player/GetTeamsAroundPoint',
      getPlayerAroundPointUrl: '/api/Player/GetPlayersAroundPoint',

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
        serverBus.$emit('loggedOut', {});

      } else {
        localStorage.setItem('user', data.userInfo);
        localStorage.setItem('userImageUrl', data.imageUrl);
        localStorage.setItem('token', data.token);
        state.authentication.isAuth = true;
        state.authentication.user = JSON.parse(data.userInfo);
        state.authentication.userImageUrl = data.imageUrl;
        state.authentication.token = data.token;
        serverBus.$emit('loggedIn', {});
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
      for (let i = 0; i < 56; i++) {
        var myDate = new Date();
        let classToAdd = myDate.getFullYear() - 3 - i;
        classilst.push({ text: classToAdd, value: classToAdd});
      }
      return classilst;
    },
    getCountriesList: function () {
      var countryList = [
        { text: 'Afghanistan', value: 'AF' },
        { text: 'Åland Islands', value: 'AX' },
        { text: 'Albania', value: 'AL' },
        { text: 'Algeria', value: 'DZ' },
        { text: 'American Samoa', value: 'AS' },
        { text: 'AndorrA', value: 'AD' },
        { text: 'Angola', value: 'AO' },
        { text: 'Anguilla', value: 'AI' },
        { text: 'Antarctica', value: 'AQ' },
        { text: 'Antigua and Barbuda', value: 'AG' },
        { text: 'Argentina', value: 'AR' },
        { text: 'Armenia', value: 'AM' },
        { text: 'Aruba', value: 'AW' },
        { text: 'Australia', value: 'AU' },
        { text: 'Austria', value: 'AT' },
        { text: 'Azerbaijan', value: 'AZ' },
        { text: 'Bahamas', value: 'BS' },
        { text: 'Bahrain', value: 'BH' },
        { text: 'Bangladesh', value: 'BD' },
        { text: 'Barbados', value: 'BB' },
        { text: 'Belarus', value: 'BY' },
        { text: 'Belgium', value: 'BE' },
        { text: 'Belize', value: 'BZ' },
        { text: 'Benin', value: 'BJ' },
        { text: 'Bermuda', value: 'BM' },
        { text: 'Bhutan', value: 'BT' },
        { text: 'Bolivia', value: 'BO' },
        { text: 'Bosnia and Herzegovina', value: 'BA' },
        { text: 'Botswana', value: 'BW' },
        { text: 'Bouvet Island', value: 'BV' },
        { text: 'Brazil', value: 'BR' },
        { text: 'British Indian Ocean Territory', value: 'IO' },
        { text: 'Brunei Darussalam', value: 'BN' },
        { text: 'Bulgaria', value: 'BG' },
        { text: 'Burkina Faso', value: 'BF' },
        { text: 'Burundi', value: 'BI' },
        { text: 'Cambodia', value: 'KH' },
        { text: 'Cameroon', value: 'CM' },
        { text: 'Canada', value: 'CA' },
        { text: 'Cape Verde', value: 'CV' },
        { text: 'Cayman Islands', value: 'KY' },
        { text: 'Central African Republic', value: 'CF' },
        { text: 'Chad', value: 'TD' },
        { text: 'Chile', value: 'CL' },
        { text: 'China', value: 'CN' },
        { text: 'Christmas Island', value: 'CX' },
        { text: 'Cocos (Keeling) Islands', value: 'CC' },
        { text: 'Colombia', value: 'CO' },
        { text: 'Comoros', value: 'KM' },
        { text: 'Congo', value: 'CG' },
        { text: 'Congo, The Democratic Republic of the', value: 'CD' },
        { text: 'Cook Islands', value: 'CK' },
        { text: 'Costa Rica', value: 'CR' },
        { text: 'Cote D\'Ivoire', value: 'CI' },
        { text: 'Croatia', value: 'HR' },
        { text: 'Cuba', value: 'CU' },
        { text: 'Cyprus', value: 'CY' },
        { text: 'Czech Republic', value: 'CZ' },
        { text: 'Denmark', value: 'DK' },
        { text: 'Djibouti', value: 'DJ' },
        { text: 'Dominica', value: 'DM' },
        { text: 'Dominican Republic', value: 'DO' },
        { text: 'Ecuador', value: 'EC' },
        { text: 'Egypt', value: 'EG' },
        { text: 'El Salvador', value: 'SV' },
        { text: 'Equatorial Guinea', value: 'GQ' },
        { text: 'Eritrea', value: 'ER' },
        { text: 'Estonia', value: 'EE' },
        { text: 'Ethiopia', value: 'ET' },
        { text: 'Falkland Islands (Malvinas)', value: 'FK' },
        { text: 'Faroe Islands', value: 'FO' },
        { text: 'Fiji', value: 'FJ' },
        { text: 'Finland', value: 'FI' },
        { text: 'France', value: 'FR' },
        { text: 'French Guiana', value: 'GF' },
        { text: 'French Polynesia', value: 'PF' },
        { text: 'French Southern Territories', value: 'TF' },
        { text: 'Gabon', value: 'GA' },
        { text: 'Gambia', value: 'GM' },
        { text: 'Georgia', value: 'GE' },
        { text: 'Germany', value: 'DE' },
        { text: 'Ghana', value: 'GH' },
        { text: 'Gibraltar', value: 'GI' },
        { text: 'Greece', value: 'GR' },
        { text: 'Greenland', value: 'GL' },
        { text: 'Grenada', value: 'GD' },
        { text: 'Guadeloupe', value: 'GP' },
        { text: 'Guam', value: 'GU' },
        { text: 'Guatemala', value: 'GT' },
        { text: 'Guernsey', value: 'GG' },
        { text: 'Guinea', value: 'GN' },
        { text: 'Guinea-Bissau', value: 'GW' },
        { text: 'Guyana', value: 'GY' },
        { text: 'Haiti', value: 'HT' },
        { text: 'Heard Island and Mcdonald Islands', value: 'HM' },
        { text: 'Holy See (Vatican City State)', value: 'VA' },
        { text: 'Honduras', value: 'HN' },
        { text: 'Hong Kong', value: 'HK' },
        { text: 'Hungary', value: 'HU' },
        { text: 'Iceland', value: 'IS' },
        { text: 'India', value: 'IN' },
        { text: 'Indonesia', value: 'ID' },
        { text: 'Iran, Islamic Republic Of', value: 'IR' },
        { text: 'Iraq', value: 'IQ' },
        { text: 'Ireland', value: 'IE' },
        { text: 'Isle of Man', value: 'IM' },
        { text: 'Israel', value: 'IL' },
        { text: 'Italy', value: 'IT' },
        { text: 'Jamaica', value: 'JM' },
        { text: 'Japan', value: 'JP' },
        { text: 'Jersey', value: 'JE' },
        { text: 'Jordan', value: 'JO' },
        { text: 'Kazakhstan', value: 'KZ' },
        { text: 'Kenya', value: 'KE' },
        { text: 'Kiribati', value: 'KI' },
        { text: 'Korea, Democratic People\'S Republic of', value: 'KP' },
        { text: 'Korea, Republic of', value: 'KR' },
        { text: 'Kuwait', value: 'KW' },
        { text: 'Kyrgyzstan', value: 'KG' },
        { text: 'Lao People\'S Democratic Republic', value: 'LA' },
        { text: 'Latvia', value: 'LV' },
        { text: 'Lebanon', value: 'LB' },
        { text: 'Lesotho', value: 'LS' },
        { text: 'Liberia', value: 'LR' },
        { text: 'Libyan Arab Jamahiriya', value: 'LY' },
        { text: 'Liechtenstein', value: 'LI' },
        { text: 'Lithuania', value: 'LT' },
        { text: 'Luxembourg', value: 'LU' },
        { text: 'Macao', value: 'MO' },
        { text: 'Macedonia, The Former Yugoslav Republic of', value: 'MK' },
        { text: 'Madagascar', value: 'MG' },
        { text: 'Malawi', value: 'MW' },
        { text: 'Malaysia', value: 'MY' },
        { text: 'Maldives', value: 'MV' },
        { text: 'Mali', value: 'ML' },
        { text: 'Malta', value: 'MT' },
        { text: 'Marshall Islands', value: 'MH' },
        { text: 'Martinique', value: 'MQ' },
        { text: 'Mauritania', value: 'MR' },
        { text: 'Mauritius', value: 'MU' },
        { text: 'Mayotte', value: 'YT' },
        { text: 'Mexico', value: 'MX' },
        { text: 'Micronesia, Federated States of', value: 'FM' },
        { text: 'Moldova, Republic of', value: 'MD' },
        { text: 'Monaco', value: 'MC' },
        { text: 'Mongolia', value: 'MN' },
        { text: 'Montserrat', value: 'MS' },
        { text: 'Morocco', value: 'MA' },
        { text: 'Mozambique', value: 'MZ' },
        { text: 'Myanmar', value: 'MM' },
        { text: 'Namibia', value: 'NA' },
        { text: 'Nauru', value: 'NR' },
        { text: 'Nepal', value: 'NP' },
        { text: 'Netherlands', value: 'NL' },
        { text: 'Netherlands Antilles', value: 'AN' },
        { text: 'New Caledonia', value: 'NC' },
        { text: 'New Zealand', value: 'NZ' },
        { text: 'Nicaragua', value: 'NI' },
        { text: 'Niger', value: 'NE' },
        { text: 'Nigeria', value: 'NG' },
        { text: 'Niue', value: 'NU' },
        { text: 'Norfolk Island', value: 'NF' },
        { text: 'Northern Mariana Islands', value: 'MP' },
        { text: 'Norway', value: 'NO' },
        { text: 'Oman', value: 'OM' },
        { text: 'Pakistan', value: 'PK' },
        { text: 'Palau', value: 'PW' },
        { text: 'Palestinian Territory, Occupied', value: 'PS' },
        { text: 'Panama', value: 'PA' },
        { text: 'Papua New Guinea', value: 'PG' },
        { text: 'Paraguay', value: 'PY' },
        { text: 'Peru', value: 'PE' },
        { text: 'Philippines', value: 'PH' },
        { text: 'Pitcairn', value: 'PN' },
        { text: 'Poland', value: 'PL' },
        { text: 'Portugal', value: 'PT' },
        { text: 'Puerto Rico', value: 'PR' },
        { text: 'Qatar', value: 'QA' },
        { text: 'Reunion', value: 'RE' },
        { text: 'Romania', value: 'RO' },
        { text: 'Russian Federation', value: 'RU' },
        { text: 'RWANDA', value: 'RW' },
        { text: 'Saint Helena', value: 'SH' },
        { text: 'Saint Kitts and Nevis', value: 'KN' },
        { text: 'Saint Lucia', value: 'LC' },
        { text: 'Saint Pierre and Miquelon', value: 'PM' },
        { text: 'Saint Vincent and the Grenadines', value: 'VC' },
        { text: 'Samoa', value: 'WS' },
        { text: 'San Marino', value: 'SM' },
        { text: 'Sao Tome and Principe', value: 'ST' },
        { text: 'Saudi Arabia', value: 'SA' },
        { text: 'Senegal', value: 'SN' },
        { text: 'Serbia and Montenegro', value: 'CS' },
        { text: 'Seychelles', value: 'SC' },
        { text: 'Sierra Leone', value: 'SL' },
        { text: 'Singapore', value: 'SG' },
        { text: 'Slovakia', value: 'SK' },
        { text: 'Slovenia', value: 'SI' },
        { text: 'Solomon Islands', value: 'SB' },
        { text: 'Somalia', value: 'SO' },
        { text: 'South Africa', value: 'ZA' },
        { text: 'South Georgia and the South Sandwich Islands', value: 'GS' },
        { text: 'Spain', value: 'ES' },
        { text: 'Sri Lanka', value: 'LK' },
        { text: 'Sudan', value: 'SD' },
        { text: 'Suriname', value: 'SR' },
        { text: 'Svalbard and Jan Mayen', value: 'SJ' },
        { text: 'Swaziland', value: 'SZ' },
        { text: 'Sweden', value: 'SE' },
        { text: 'Switzerland', value: 'CH' },
        { text: 'Syrian Arab Republic', value: 'SY' },
        { text: 'Taiwan, Province of China', value: 'TW' },
        { text: 'Tajikistan', value: 'TJ' },
        { text: 'Tanzania, United Republic of', value: 'TZ' },
        { text: 'Thailand', value: 'TH' },
        { text: 'Timor-Leste', value: 'TL' },
        { text: 'Togo', value: 'TG' },
        { text: 'Tokelau', value: 'TK' },
        { text: 'Tonga', value: 'TO' },
        { text: 'Trinidad and Tobago', value: 'TT' },
        { text: 'Tunisia', value: 'TN' },
        { text: 'Turkey', value: 'TR' },
        { text: 'Turkmenistan', value: 'TM' },
        { text: 'Turks and Caicos Islands', value: 'TC' },
        { text: 'Tuvalu', value: 'TV' },
        { text: 'Uganda', value: 'UG' },
        { text: 'Ukraine', value: 'UA' },
        { text: 'United Arab Emirates', value: 'AE' },
        { text: 'United Kingdom', value: 'GB' },
        { text: 'United States', value: 'US' },
        { text: 'United States Minor Outlying Islands', value: 'UM' },
        { text: 'Uruguay', value: 'UY' },
        { text: 'Uzbekistan', value: 'UZ' },
        { text: 'Vanuatu', value: 'VU' },
        { text: 'Venezuela', value: 'VE' },
        { text: 'Viet Nam', value: 'VN' },
        { text: 'Virgin Islands, British', value: 'VG' },
        { text: 'Virgin Islands, U.S.', value: 'VI' },
        { text: 'Wallis and Futuna', value: 'WF' },
        { text: 'Western Sahara', value: 'EH' },
        { text: 'Yemen', value: 'YE' },
        { text: 'Zambia', value: 'ZM' },
        { text: 'Zimbabwe', value: 'ZW' }
      ];
      return countryList;
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
      serverBus.$emit('showLoading', true);
      const data = "grant_type=password&userName=" + authData.email + "&password=" + authData.pwd;
      axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.loginUrl, data)
        .then(res => {
          serverBus.$emit('showLoading', false);
          commit('SET_AUTH', { token: res.data.access_token, userInfo: res.data.user, imageUrl: res.data.imageUrl });
          return true;
        })
        .catch(error => alert('Error'+JSON.stringify(error)));
    },
    signup({ commit, dispatch }, authData) {
      const data = { Email: authData.email, Password: authData.password, Environment: this.state.configurations.environment, Profile: authData.profile,Name : authData.name,Surname : authData.surname }
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.signupUrl, data)
    },
    confirmEmail({ commit, dispatch }, code) {
      const data = { Code: code, Environment: this.state.configurations.environment }
      axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.confirmEmailUrl, data)
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
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.getTeamAroundPointUrl,data);
    },
    savePlayerProfile({ commit, state }, player) {
      const data = { Player: player }
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.savePlayerInfoUrl, data);
    },


    getAgentProfile({ commit, state }, agentId) {
      const data = { AgentId: agentId }
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.getAgentInfoUrl, data);
    },
    getPlayerAroundPoint({ commit, state }, params) {
      const data = { Latitudine: params.lat, Longitudine: params.lng, Radius: params.rad, Top: params.top, Role:params.role, Category: params.category, Class: params.class }
      return axios.post(this.state.configurations.serviceBaseUrl + this.state.configurations.getPlayerAroundPointUrl, data);
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
