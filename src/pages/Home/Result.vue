<template>
<div>
  <section class="pusher">
    <div class="main-header">
      <div class="container">
        <div class="col-md-12 search-form">
          <form class="">
            <div class="type text-center">
              <h3>Cosa cerchi...</h3>
              <div class="buttons">
                <div class="switch-field">
                  <div class="switch-content player form-check form-check-inline">
                    <input type="radio" id="switch_3_left" value="0" v-model="profileSelected" class="form-check-input" />
                    <label for="switch_3_left" class="calciatore form-check-label">calciatore</label>
                  </div>
                  <div class="switch-content club form-check form-check-inline">
                    <input type="radio" id="switch_3_center" value="1" v-model="profileSelected" class="form-check-input" />
                    <label for="switch_3_center" class="team form-check-label">club</label>
                  </div>
                  <div class="switch-content agent form-check form-check-inline">
                    <input type="radio" id="switch_3_right" value="2" v-model="profileSelected" class="form-check-input" />
                    <label for="switch_3_right" class="agent form-check-label">agente</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 map-label">
              <map-autocomplete class="col-12" place-holder="Dove cerchi?" input-component-name="gmap12" :initialAddress="selectedAddressString" startactualpos="false" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress"></map-autocomplete>
            </div>
            <div class="col-md-6 col-sm-12 slider-container">
              <button @click="decreaseAmount()" class="button_plus">-</button>
              <vue-slider style="float:left;width:70%;padding-top:13px" ref="slider" v-model="amount"></vue-slider><button @click="increaseAmount()" class="button_plus">+</button>
            </div>

            <!-- filtro -->
            <div class="container">
              <div class="row justify-content-center" id="filterPlayer" v-show="profileSelected==0">
                <div class="col-6 col-sm-2">
                  <md-field>
                    <label for="ruolo">Ruolo</label>
                    <md-select v-model="roleSelected" id="ruolo">
                      <md-option v-for="role in roleList" v-bind:value="role.value">
                        {{ role.text }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="col-6 col-sm-2">
                  <md-field>
                    <label for="classe">Classe</label>
                    <md-select v-model="classeSelected" id="classe">
                      <md-option v-for="classe in classList" v-bind:value="classe.value">
                        {{ classe.text }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="col-6 col-sm-2">
                  <md-field>
                    <label for="status">Status</label>
                    <md-select v-model="statusSelected" id="status">
                      <md-option v-for="status in statusList" v-bind:value="status.value">
                        {{ status.text }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="col-6 col-sm-2">
                  <md-field>
                    <label for="category">Categoria</label>
                    <md-select v-model="categorySelected" id="category">
                      <md-option v-for="category in categoryList" v-bind:value="category.value">
                        {{ category.text }}
                      </md-option>
                    </md-select>

                  </md-field>
                </div>
                <!--<div class="col">
                  <md-field>
                    <label for="country">Nazionalità</label>
                    <md-select v-model="countrySelected" id="country">
                      <md-option v-for="country in countriesList" v-bind:value="country.value">
                        {{ country.text }}
                      </md-option>
                    </md-select>

                  </md-field>
                </div>-->
              </div>

              <div class="row" id="filterTeam" v-show="profileSelected==1">
                <div class="col">
                  <md-field>
                    <label for="category">Categoria</label>
                    <md-select v-model="categorySelected" id="category">
                      <md-option v-for="category in categoryList" :value="category.value">
                        {{ category.text }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>
              </div>

              <div class="row" id="filterTeam" v-show="profileSelected==2">
                <div style="height:30px">
                </div>
              </div>

            </div>

            <div class="gws-flights-form__search-button-wrapper" v-if="profileSelected==0">
              <button @click="findPlayers()" class="gws-flights-form__search-button gws-flights-fab__mini" role="button" tabindex="0">
                  <i class="md-icon md-icon-font material-icons">search</i>
                  <span class="gws-flights-fab__text">Cerca</span>
                </button>
            </div>
            <div class="gws-flights-form__search-button-wrapper" v-if="profileSelected==1">
              <button @click="findTeams()" class="gws-flights-form__search-button gws-flights-fab__mini" role="button" tabindex="0">
                  <i class="md-icon md-icon-font material-icons">search</i>
                  <span class="gws-flights-fab__text">Cerca</span>
                </button>
            </div>
            <div class="gws-flights-form__search-button-wrapper" v-if="profileSelected==2">
              <button @click="findAgents()" class="gws-flights-form__search-button gws-flights-fab__mini" role="button" tabindex="0">
                  <i class="md-icon md-icon-font material-icons">search</i>
                  <span class="gws-flights-fab__text">Cerca</span>
                </button>
            </div>
          </form>
        </div>


        <!-- mappa -->
        <div class="row" style="    border: 1px solid #c4cc00;border-radius:15px;padding-top:15px;padding-bottom:15px">
          <div class="col-md-4">
            <div class="row row-eq-height user-list">
              <div class="col-12" v-for="item in searchResult" :key="item.Id">
                <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                  <stats-card data-background-color="black" @click.native="showInfoWindowById(item.Id)">
                    <template slot="header">
                      <picture-box :picUrl="item.ImageUrl" :picType="item.Profile"></picture-box>
                    </template>
                    <template slot="content" v-if="item.Profile == 0">
                      <a v-bind:href="'/#/playerProfile?playerId='+ item.Id" class="total-link"></a>
                      <p class="category">{{item.PlayerInfos.Role }} </p>
                      <h3 class="title">{{item.Name}} </h3>
                    </template>
                    <template slot="footer" v-if="item.Profile == 1">
                      <div class="stats">
                        <md-icon>date_range</md-icon>
                        {{ item.Class }}
                      </div>
                    </template>
                    <template slot="content" v-if="item.Profile == 1">
                        <a v-bind:href="'/#/teamProfile?teamId='+ item.Id" class="total-link"></a>
                        <p class="category">{{ item.TeamInfos.Catogory }} </p>
                        <h3 class="title">{{ item.Name }} </h3>
                      </template>
                    <template slot="footer" v-if="item.Profile == 1">
                        <div class="stats">
                          <md-icon>place</md-icon>
                          {{ item.AddressInfos.FullAddress }}
                        </div>
                      </template>
                    <div class="card-body pt-0" v-if="item.Profile == 2">
                      <h3 class="card-title">
                        {{item.Name }}
                      </h3>
                    </div>
                  </stats-card>
                </div>
              </div>
            </div>

          </div>
          <div class="col-md-8 d-none d-sm-block">
            <div id="map"></div>
          </div>
        </div>

      </div>
    </div>
  </section>
</div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
import PictureBox from '@/components/PictureBox/PictureBox'
import Logo from '@/components/Logo'
import {
  StatsCard
} from '@/components'

import commonService from '@/services/commonService'
import {
  serverBus
} from '@/main';

export default {
  name: 'DashboardMaps',
  data() {
    return {
      profile: -1,
      profileSelected: -1,
      city: '',
      _mapCircle: null,
      _amount: 0,
      _map: null,
      searchResult: [],
      radius: 10,
      actualPos: null,
      actualTimer: null,
      marker: new google.maps.Marker(),
      markers: [],
      infoWindows: [],
      statusList: [],
      roleList: [],
      classList: [],
      categoryList: [],
      countriesList: [],
      profileList: [],
      items: [],
      placeSelected: null,
      _roleSelected: null,
      classeSelected: null,
      categorySelected: null,
      statusSelected: null,
    }
  },
  components: {
    vueSlider,
    MapAutocomplete,
    PictureBox,
    StatsCard,
    Logo
  },
  props: {
    what: {
      type: String
    },
    place: {
      type: Object,
    },
    who: {
      type: String,
    }
  },
  computed: {
    amount: {
      get() {
        return this.radius;
      },
      set(value) {
        if (this.radius != value) {
          var self = this;
          this.radius = value;
          this.map.setCenter(this.actualPos)
          if (this._mapCircle != null) {
            this._mapCircle.setMap(null)
          };
          this._mapCircle = this.getCircle(this.map, value, this.actualPos)
          if (this.actualTimer != null) clearTimeout(this.actualTimer);
          this.actualTimer = setTimeout(function() {
            var profileUserLogged = self.$store.state.authentication.user.Profile;
            if (profileUserLogged == 0) self.findTeams();
            if (profileUserLogged == 2) self.findPlayers();
          }, 800);
        }
      }
    },
    map: {
      get() {
        if (this._map == null) {
          var mapOptions = {
            zoom: 8
          };
          this._map = new google.maps.Map(document.getElementById('map'), mapOptions)
        };
        return this._map;
      },
      set(value) {
        this._map = value;
      }
    },
    roleSelected: {
      get() {
        return this._roleSelected;
      },
      set(value) {
        this._roleSelected = value;
      }
    },
    selectedAddressString: {
      get() {
        if (this.placeSelected != null) return this.placeSelected.formatted_address;
        else return null;
      }
    }
  },
  mounted() {
    var self = this;
    setTimeout(function() {
      if (self.profileSelected == 0) self.findPlayers();
      if (self.profileSelected == 1) self.findTeams();
      if (self.profileSelected == 2) self.findAgents();
    }, 500);


  },
  methods: {
    findUser: function(profile) {
      serverBus.$emit('showLoading', true);
      var self = this;
      let addressInfo = {
        lat: this.actualPos.lat,
        lng: this.actualPos.lng,
        Radius: this.amount * 4
      };
      let playerInfo = null;
      let teamInfo = null;
      let agentInfo = null;
      if (profile == 0) {
        playerInfo = {
          Role: this.roleSelected,
          Category: this.categorySelected,
          Class: this.classeSelected,
          Status: this.statusSelected
        }
      }
      if (profile == 1) {
        teamInfo = {
          Category: this.categorySelected
        }
      }
      if (profile == 2) {
        agentInfo = {}
      }
      commonService.searchUser(this.$store.state.configurations.serviceBaseUrl, profile, addressInfo, playerInfo, teamInfo, agentInfo).then(res => {
        function resetMarkersOnMap() {
          for (let i = 0; i < self.markers.length; i++) {
            self.markers[i].marker.setMap(null);
          }
        }

        function createInfoWindowForTeam(team) {
          let contentString = '<div class="card" style="width: 18rem;">' +
            '<img class="card-img-top" style="max-width: 170px; margin: 0 auto;" src="' + self.$store.state.configurations.imageRootUrl + team.ImageUrl + '" alt="' + team.Name + '">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + team.Name + '</h5>' +
            '<p class="card-text">' +
            team.TeamInfos.Catogory +
            '</p>' +
            '<div class="card-footer"><a href="/#/teamProfile?teamId=' + team.Id + '" class="btn btn-map"> Visita il Profilo </a></div>' +
            '</div>' +
            '</div>';
          return contentString;
        }

        function createInfoWindowForPlayer(player) {
          let contentString = '<div class="card no-border profile-card-5" style="width: 18rem;">' +
            '<div class="card-img-block"><img class="card-img-top" style="max-width: 150px; margin: 0 auto;" src="' + (player.ImageUrl != null && player.ImageUrl != '' ? self.$store.state.configurations.imageRootUrl + player.ImageUrl :
              '../../assets/img/defaultFace.jpg') + '" alt="' + player.Name + '"></div>' +
            '<div class="card-body">' +
            '<h3 class="card-title">' + player.Name + '</h3>' +
            '<p class="card-text">' +
            player.Catogory +
            '</p>' +
            '<div class="card-footer"><a href="/#/playerProfile?playerId=' + player.Id + '" class="btn btn-map"> Visita il Profilo </a></div>' +
            '</div>' +
            '</div>';
          return contentString;
        }

        function createInfoWindowForAgent(agent) {
          let contentString = '<div class="card" style="width: 18rem;">' +
            '<img class="card-img-top" style="max-width: 170px; margin: 0 auto;" src="' + self.$store.state.configurations.imageRootUrl + agent.ImageUrl + '" alt="' + agent.Name + '">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + agent.Name + '</h5>' +
            //'<p class="card-text">' +
            //team.TeamInfos.Catogory +
            //'</p>' +
            '<div class="card-footer"><a href="/#/agentProfile?agentId=' + agent.Id + '" class="btn btn-map"> Visita il Profilo </a></div>' +
            '</div>' +
            '</div>';
          return contentString;
        }
        self.searchResult = res.data;
        resetMarkersOnMap();
        self.infoWindows = [];
        res.data.forEach(function(item) {
          if (item.AddressInfos != null) {
            let point = {
              lat: item.AddressInfos.Latitudine,
              lng: item.AddressInfos.Longitudine
            };
            let contentWindowHtml = '';
            if (profile == 0) contentWindowHtml = createInfoWindowForPlayer(item);
            if (profile == 1) contentWindowHtml = createInfoWindowForTeam(item);
            if (profile == 2) contentWindowHtml = createInfoWindowForAgent(item);
            let infowindow = new google.maps.InfoWindow({
              content: contentWindowHtml
            });
            let markerMap = new google.maps.Marker({
              position: point,
              map: self.map,
              animation: google.maps.Animation.DROP,
              title: item.Name
            });
            google.maps.event.addListener(markerMap, 'click', function() {
              for (var i = 0; i < self.infoWindows.length; i++) self.infoWindows[i].info.close()
              infowindow.open(map, markerMap);
            });
            google.maps.event.addListener(map, 'click', function() {
              infowindow.close();
            });
            markerMap.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
            self.markers.push({
              marker: markerMap,
              id: item.Id
            });
            self.infoWindows.push({
              info: infowindow,
              id: item.Id
            })
          }
        })
        serverBus.$emit('showLoading', false);
      })
    },
    showProfile: function(item) {
      if (item.profile == 0) this.$router.push('playerProfile?playerId=' + item.id)
      if (item.profile == 1) this.$router.push('teamProfile?teamId=' + item.id)
    },
    findPlayers: function() {
      this.findUser(0);
    },
    findTeams: function() {
      this.findUser(1);
    },
    findAgents: function() {
      this.findUser(2);
    },
    showInfoWindowById: function(Id) {
      var markerToOpen = this.markers.filter(function(x) {
        return x.id == Id
      })[0];
      var infoWindowToOpen = this.infoWindows.filter(function(x) {
        return x.id == Id
      })[0];
      for (var i = 0; i < this.infoWindows.length; i++) this.infoWindows[i].info.close()
      infoWindowToOpen.info.open(this.map, markerToOpen.marker);
    },
    increaseAmount: function() {
      if (this.amount < 100)
        this.amount = this.amount + 5;
    },
    decreaseAmount: function() {
      if (this.amount > 0)
        this.amount = this.amount - 5;
    },
    setCorrectAddress: function(value) {
      let newPos = {
        lat: value.geometry.location.lat(),
        lng: value.geometry.location.lng()
      };
      if (this.actualPos == null) {
        this.actualPos = newPos;
        this.setNewPointOnMap(value, this.map, this.radius)
      } else if ((newPos.lat != this.actualPos.lat) || (newPos.lng != this.actualPos.lng)) {
        this.actualPos = newPos;
        this.setNewPointOnMap(value, this.map, this.radius)
      }
    },
    setInvalidAddress: function() {

    },
    getCircle: function(mapP, radiusp, position) {
      var circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: mapP,
        center: position,
        radius: radiusp * 4000
      });
      return circle;
    },
    setNewPointOnMap: function(place) {
      this.map = null;
      this.amount = 10;

      this.marker.setMap(null);
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].marker.setMap(null);
      }
      this.marker = new google.maps.Marker({
        position: this.actualPos,
        map: this.map,
        title: 'YOU ARE HERE'
      });
      this.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
      this.map.setCenter(this.actualPos)
      if (this._mapCircle != null) {
        this._mapCircle.setMap(null)
      }
      this._mapCircle = this.getCircle(this.map, this.amount, this.actualPos)
    }
  },

  created() {
    if (this.place != null) this.placeSelected = this.place;
    var self = this;
    this.$store.dispatch('getCategories', {}).then(res => {
      self.categoryList = res
    })
    this.$store.dispatch('getRoleList', {}).then(res => {
      this.roleList = res
    })
    this.$store.dispatch('getStatus', {}).then(res => {
      this.statusList = res;
    })
    this.$store.dispatch('getClassList', {}).then(res => {
      this.classList = res;
    })
    this.$store.dispatch('getCountriesList', {}).then(res => {
      this.countriesList = res;
    })
    this.$store.dispatch('getProfileList', {}).then(res => {
      this.profileList = res;
      setTimeout(function() {
        let temp = self.profileList.filter(d => d.text === self.what);
        self.profileSelected = temp[0].value;
        //alert(self.profileSelected)
        self.findUser(self.profileSelected);
      }, 100);
    })
  }
}
</script>

<style lang="scss">
.md-menu.md-select input {
    -webkit-text-fill-color: #f5ff00 !important;
}
html.md-theme-default {
    background-color: #212121 !important;
}
</style>
<style scoped lang="scss">
.pusher {
    background-image: url("/assets/images/bg-footer.jpg");
    background-repeat: no-repeat;
    background-position: 50% 300px;
    background-size: cover;
    min-height: 100vh;
    form {
        display: block;
        margin: 30px auto;
        // width: 950px;
        overflow: hidden;
        // background: #FFF;
        // border: 1px solid #E4E4E4;
        border-radius: 5px;
        font-size: 0;
        &:hover {
            box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
        }
    }

    form > div {
        display: inline-block;
        width: 100%;
    }

    form > div > label {
        display: block;
        padding: 10px 20px;
        vertical-align: top;
        font-family: Source Sans Pro, Arial, sans-serif;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        color: #939393;
        cursor: pointer;
    }

    form > div.col-2,
    form > div.col-3,
    form > div.col-4 {
        box-shadow: 1px 1px #E4E4E4;
    }

    form > div.col-2 {
        width: 50%;
    }

    form > div.col-3 {
        width: 33.3333333333%;
    }

    form > div.col-4 {
        width: 25%;
    }

    form > div > label > input {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 27px;
        line-height: 27px;
        margin: 5px -5px 0;
        padding: 7px 5px 3px;
        border: none;
        outline: none;
        border-radius: 3px;
        background: transparent;
        font-size: 14px;
        font-weight: 200;
        opacity: 0.66;
        transition: opacity 0.3s;
    }

    form > div > label > select {
        display: block;
        width: 100%;
        margin: 16px 0 6px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        font-size: 14px;
        font-weight: 200;
        opacity: 0.33;
    }

    form > div > label > input:focus,
    form > div > label > select:focus {
        opacity: 1;
    }
}

.type {
    h3 {
        // color: #212121;
        margin-top: 0;
    }
    .switch-content {
        background: transparent;
        label {
            &:before {
                background-color: #FFF;
                padding: 5px;
                border-radius: 10px;
            }
        }
    }
    .switch-title {
        color: #168600;
    }
    .switch-field {
        label {
            background-color: #FFF;
            color: #212121;
            text-transform: uppercase;
            min-width: 100px;
        }
    }

    .switch-field input {
        position: absolute !important;
        clip: rect(0, 0, 0, 0);
        height: 1px;
        width: 1px;
        border: 0;
        overflow: hidden;
    }

    .switch-field label {
        margin: 15px 0 !important;
        float: left;
        position: relative;
        display: inline-block;
        width: auto;
        background-color: #e4e4e4;
        color: rgba(0, 0, 0, 0.6);
        font-size: 14px;
        font-weight: normal;
        text-align: center;
        text-shadow: none;
        padding: 6px 14px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
        -webkit-transition: all 0.1s ease-in-out;
        -moz-transition: all 0.1s ease-in-out;
        -ms-transition: all 0.1s ease-in-out;
        -o-transition: all 0.1s ease-in-out;
        transition: all 0.1s ease-in-out;
        &:before {
            content: '';
            width: 100%;
            height: 100px;
            left: 0;
            right: 0;
            position: absolute;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            bottom: 40px;
        }
    }

    .switch-content {
        height: 20px;
        margin-bottom: 50px;
        margin-top: 60px;
        padding-bottom: 0;
        padding-top: 40px;
        border-radius: 5px;
        box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
    }

    .switch-field,
    .switch-field-input {
        padding: 20px 0 0;
        // overflow: hidden;
        label {
            margin: 15px 30px;
        }

    }
    .switch-content-input {
        margin-top: 20px;
        input {
            border-radius: 50px;
            // border: 2px solid #01a084;
            // margin-left: 60px;
            background-color: #FFF;
            padding: 10px;
            width: 40%;
        }

        button {
            background: #01a084;
            border: 2px solid #01a084;
            color: #FFF;
        }

    }

    .switch-title {
        text-align: center;
        font-weight: bold;
        font-size: 22px;
        text-transform: uppercase;
    }

    .switch-field label:hover {
        cursor: pointer;
    }

    .switch-field {
        .player input:checked + label {
            background-color: #168600;
            color: #FFF;
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        .club input:checked + label {
            background-color: #1057a0;
            color: #FFF;
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        .agent input:checked + label {
            background-color: #ffa000;
            color: #FFF;
            -webkit-box-shadow: none;
            box-shadow: none;
        }
    }
    .switch-field label:first-of-type {
        border-radius: 4px 0 0 4px;
    }

    .switch-field label:last-of-type {
        border-radius: 0 4px 4px 0;
    }
    .switch-content.player {
        label {
            &:before {
                background-image: url("../../assets/images/player.png");
                border: 2px solid #178501;
            }

        }
    }
    .switch-content.club {
        label {
            &:before {
                background-image: url("../../assets/images/club.png");
                border: 2px solid #1057a0;
            }

        }
    }
    .switch-content.agent {
        label {
            &:before {
                background-image: url("../../assets/images/agent.png");
                border: 2px solid #ffa000;
            }

        }
    }
}
.slider-container {
    padding-top: 50px;
    text-align: center;
}
.total-link {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;
}
.btn-map {
    color: #212121 !important;
    border: 1px solid #212121;
    background-color: #f5ff00;
    border-radius: 15px !important;
    &:hover {
        box-shadow: 0 14px 26px -12px rgba(248, 254, 30, 0.42), 0 4px 23px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(248, 254, 30, 0.2);
        background-color: #f8fe0f;
        color: #212121 !important;
    }
}
.no-border {
    border: none;
}

/*Profile Card 5*/
.md-button-content {
    a {
        color: #FFF !important;
    }
}
.profile-card-5 {

    &:hover {
        box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.3);
    }
    .btn {
        border-radius: 2px;
        text-transform: uppercase;
        font-size: 12px;
        padding: 7px 20px;
    }
    .btn-primary {
        background-color: #4E5E30;
        border-color: #4E5E30;
    }
    .card-img-block {
        width: 91%;
        margin: 0 auto;
        position: relative;
        img {
            // border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.63);

            width: 104px;
            height: 104px;
            box-sizing: border-box;
            background-clip: content-box;
            border: 0 solid transparent;
            border-radius: 49.9%;
        }
    }
    h3 {
        color: #4E5E30;
        font-weight: 700;
        margin-top: 0;
    }
    p {
        font-size: 14px;
        font-weight: 300;
    }
    .card-text.level {
        font-weight: 700;
        color: #00842d;
        text-transform: uppercase;
    }
}
</style>
<style scoped lang="scss">
.md-card {
    cursor: pointer;
    .md-card-header {
        background-color: #FFF;
        img {
            margin-right: 0;
            border-radius: initial;

        }
    }
    .md-card-content {
        h3 {
            color: #3c4653;
        }
    }
}
.img-thumbnail {
    max-width: 100%;
    min-width: 100%;
}
.user-list {
    max-height: 550px;
    overflow: auto;
}
#map {
    max-height: 550px;
}
.search-form {
    border-radius: 2px;
    box-sizing: border-box;
    min-width: auto;
    padding: 10px 15px 48px;
    position: relative;
    z-index: initial;
    margin-bottom: 50px;
    margin-top: 50px;
    // margin: 0 -15px;
    border: 1px solid darken(#f5ff00, 10%);
    border-radius: 15px;
    .map-label {
        vertical-align: top;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        color: #939393;
    }
}
.gws-flights-form__search-button-wrapper {
    align-items: center;
    bottom: calc(-40px/2);
    display: flex;
    flex-direction: column;
    left: 0;
    margin: 0 auto;
    pointer-events: none;
    position: absolute;
    right: 0;
    .gws-flights-fab__mini {
        border-radius: 20px;
        height: 40px;
        min-width: 40px;
    }
    .gws-flights-form__search-button {
        background-color: #f5ff00;
        pointer-events: auto;
        align-items: center;
        border: none;
        border-radius: 28px;
        box-shadow: 0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12);
        box-sizing: border-box;
        color: #212121;
        cursor: pointer;
        display: flex;
        height: 56px;
        min-width: 56px;
        outline: none;
        padding: 0 8px;
        position: relative;
        user-select: none;
        margin: 0 auto;
        &::before {
            border-radius: inherit;
            content: '';
            display: block;
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }
        &:hover {
            box-shadow: 0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12);
            outline: none;
        }
        span {
            padding: 0 16px 0 8px;
            font-size: 14px;
            font-weight: 500;
            padding: 0 26px 0 24px;
            text-transform: uppercase;
            -webkit-user-select: none;
        }
    }
}
.button_plus {
    float: left;
    background-color: #f1ff00;
    border: none;
    color: #212121;
    /*padding: 15px 32px;*/
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 26px;
    width: 30px;
    height: 30px;
}

.btn {
    background-color: #3498db;
    border: none;
    color: white;
    padding: 12px 16px;
    font-size: 16px;
    cursor: pointer;
}

.btn:hover {
    background-color: RoyalBlue;
    color: #FFF;
}

.md-theme-default a:not(.md-button):hover {
    color: #FFF !important;
}

/*------------------
	Responsive
---------------------*/
@media (min-width: 1200px) {
    .container {
        max-width: 1170px;
    }
}

@media only screen and (min-width: 768px) {
    .total-link {
        display: none;
    }

    .slider-container {
        padding-top: 10px;
    }
    .type {
        .switch-field {
            label {
                margin: 15px 30px !important;
                min-width: 120px;
            }
        }
    }
    .search-form {
        min-width: 852px;
        // margin: 0 76px;
        border: 1px solid darken(#f5ff00, 10%);
        div {
            margin-top: 0;
        }
    }
}
</style>
