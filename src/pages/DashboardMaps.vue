<template>
<div style="padding:15px">
  <div class="row search-form">

    <div class="col-md-6 col-sm-12">
      <map-autocomplete place-holder="Luogo di ricerca" :initial-address="city" startactualpos="true" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress"></map-autocomplete>
    </div>
    <div class="col-md-6 col-sm-12" style="padding-top:10px;text-align:center">
      <button @click="decreaseAmount()" class="button_plus">-</button>
      <vue-slider style="float:left;width:70%;padding-top:13px" ref="slider" v-model="amount"></vue-slider><button @click="increaseAmount()" class="button_plus">+</button>
    </div>
    <!-- <div class="col-lg-4 col-md-12 col-sm-12" style="padding-top:10px;text-align:center">
      <button @click="findTeams()" class="btn"><i class="fa fa-search" ></i> Cerca</button>
    </div> -->
    <div class="gws-flights-form__search-button-wrapper">
      <button @click="findPlayers()" class="gws-flights-form__search-button gws-flights-fab__mini" role="button" tabindex="0">
        <i class="md-icon md-icon-font material-icons">search</i>
        <span class="gws-flights-fab__text">Cerca</span>
      </button>
    </div>

  </div>

  <div class="row">

    <div class="col">
      <md-field>
        <label for="ruolo">Ruolo</label>
        <md-select v-model="_roleSelected" id="ruolo">
          <md-option v-for="role in roleList" v-bind:value="role.value">
            {{ role.text }}
          </md-option>
        </md-select>
      </md-field>
    </div>
    <div class="col">
      <md-field>
        <label for="classe">Classe</label>
        <md-select v-model="classeSelected" id="classe">
          <md-option v-for="classe in classList" v-bind:value="classe.text">
            {{ classe.text }}
          </md-option>
        </md-select>
      </md-field>
    </div>
    <div class="col">
      <md-field>
        <label for="status">Status</label>
        <md-select v-model="statusSelected" id="status">
          <md-option v-for="status in statusList" v-bind:value="status.value">
            {{ status.text }}
          </md-option>
        </md-select>

      </md-field>
    </div>
    <div class="col">
      <md-field>
        <label for="category">Categoria</label>
        <md-select v-model="categorySelected" id="category">
          <md-option v-for="category in categoryList" v-bind:value="category.value">
            {{ category.text }}
          </md-option>
        </md-select>

      </md-field>
    </div>
    <!-- <div class="col">
      <md-button @click="findPlayers()" class="md-success btn btn-success btn-block">
        <i class="md-icon md-icon-font material-icons md-theme-default">search</i> Cerca
      </md-button>
    </div> -->
  </div>
  <div class="row">
    <div class="col-md-4">
      <!--<div class="row">
    <div class="col">
      <md-card md-with-hover>

        <md-card-content>
          <h3>gestisci i tuoi calciatori e mantieni aggiornate le loro informazioni</h3>
          <md-button class="md-icon-button md-raised md-primary md-fab" @click="AddNewPlayer">
            <md-icon>add</md-icon>
          </md-button>
          <p>
            Aggiungi calciatore
          </p>
        </md-card-content>

      </md-card>
    </div>
  </div>-->

      <div class="row row-eq-height" v-if="profile==0">
        <div class="col" v-for="team in teams" :key="team.Id">
          <md-card md-with-hover>
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">{{ team.TeamName }} </div>
                <!--<div class="md-subhead">{{ card.Role != null  ? card.Role : 'No Role' }}</div>-->
              </md-card-header-text>
              <md-card-media md-medium>
                <picture-box :picUrl="team.TeamLogo" :picType="0"></picture-box>
              </md-card-media>
            </md-card-header>
            <md-card-actions>
              <md-button class="md-success tiro" @click="showInfoWindowById(team.Id)">
                <i class="md-icon md-icon-font material-icons md-theme-default">edit</i> Show
              </md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>
      <div class="row row-eq-height user-list">
        <div class="col-12" v-for="player in players" :key="player.Id">

          <!-- <md-card class="md-card-profile" @click.native="showInfoWindowById(player.Id)">
            <div class="md-card-avatar">
              <picture-box :picUrl="player.PlayerImage" :picType="0"></picture-box>
            </div>
            <md-card-content>
              <h4 class="card-title"> {{ player.Name }} </h4>
              <h6 class="category text-gray">{{ player.Category }}</h6>
              <hr>
              <div class="text-center">
                <div class="row">
                  <div class="col-lg-6">
                    <h5>
                          Ruolo
                          <br><small>{{ player.Role }}</small>
                        </h5>
                  </div>
                  <div class="col-lg-6">
                    <h5>
                          Classe
                          <br><small>{{ player.Class }}</small>
                        </h5>
                  </div>
                </div>
              </div>
            </md-card-content>

          </md-card> -->


          <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <stats-card data-background-color="green" @click.native="showInfoWindowById(player.Id)">
              <template slot="header">
                            <!-- <md-icon >store</md-icon> -->
                            <picture-box :picUrl="player.PlayerImage" :picType="0"></picture-box>
                          </template>

              <template slot="content">
                            <p class="category">{{ player.Role }} Attaccante</p>
                            <h3 class="title">{{ player.Name }} </h3>
                          </template>

              <template slot="footer">
                            <div class="stats">
                                <md-icon>date_range</md-icon>
                                {{ player.Class }} 1999
                            </div>
                          </template>
            </stats-card>
          </div>
          <!-- <md-card md-with-hover>
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">{{ player.Name }} </div>
              </md-card-header-text>
              <md-card-media md-medium>
                <picture-box :picUrl="player.PlayerImage" :picType="0"></picture-box>
              </md-card-media>
            </md-card-header>
            <md-card-actions>
              <md-button class="md-success tiro" @click="showInfoWindowById(player.Id)">
                <i class="md-icon md-icon-font material-icons md-theme-default">touch_app</i> Mostra
              </md-button>
            </md-card-actions>
          </md-card> -->
        </div>
      </div>

    </div>
    <div class="col-md-8 d-none d-sm-block">
      <div id="map"></div>
    </div>
  </div>

</div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
import PictureBox from '@/components/PictureBox/PictureBox'
import {
  StatsCard
} from '@/components'

//import axios from 'axios'
import {
  serverBus
} from '@/main';

export default {
  name: 'DashboardMaps',
  data() {
    return {
      profile: -1,
      city: '',
      _mapCircle: null,
      _amount: 0,
      _map: null,
      teams: [],
      players: [],
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
      profileSelected: null,
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
    StatsCard
  },
  computed: {

    amount: {
      get() {
        return this.radius;
      },
      set(value) {
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
    }
  },
  mounted() {
    this.profile = this.$store.state.authentication.user.Profile;
  },
  methods: {
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
    findPlayers: function() {
      var self = this;
      if ((this.actualPos != null) && (this.amount != null)) {
        serverBus.$emit('showLoading', true);
        //this._roleSelected = 'Portiere';
        //alert(this._roleSelected)
        this.$store.dispatch('getPlayerAroundPoint', {
            lat: this.actualPos.lat,
            lng: this.actualPos.lng,
            rad: this.amount * 4,
            role: this._roleSelected,
            category: this.categorySelected,
            class: this.classeSelected,
            status: this.statusSelected,
            top: 100
          })
          .then(res => {
            self.players = res.data
            for (var i = 0; i < self.markers.length; i++) {
              self.markers[i].marker.setMap(null);
            }
            res.data.forEach(function(player) {
              let point = {
                lat: player.Latitudine,
                lng: player.Longitudine
              };
              let contentString = '<div class="card" style="width: 18rem;">' +
                //'<picture-box :picUrl="'+player.PlayerImage+'" :picType="0"></picture-box>'+
                '<img class="card-img-top" style="max-width: 150px; margin: 0 auto;" src="' + (player.PlayerImage != null && player.PlayerImage != '' ? self.$store.state.configurations.imageRootUrl + player.PlayerImage :
                  '../../assets/img/defaultFace.png') + '" alt="' + player.Name + '">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + player.Name + '</h5>' +
                '<p class="card-text">' +
                player.Catogory +
                '</p>' +
                '<a href="/#/playerProfile?playerId=' + player.Id + '" class="btn btn-primary" style="color: #FFF;"> Visita il Profilo </a>' +
                '</div>' +
                '</div>';
              let infowindow = new google.maps.InfoWindow({
                content: contentString
              });
              let markerMap = new google.maps.Marker({
                position: point,
                map: self.map,
                animation: google.maps.Animation.DROP,
                title: player.Name
              });
              google.maps.event.addListener(markerMap, 'click', function() {
                for (var i = 0; i < self.infoWindows.length; i++) self.infoWindows[i].info.close()
                infowindow.open(map, markerMap);
              });
              // Event that closes the Info Window with a click on the map
              google.maps.event.addListener(map, 'click', function() {
                infowindow.close();
              });
              markerMap.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
              self.markers.push({
                marker: markerMap,
                id: player.Id
              });
              self.infoWindows.push({
                info: infowindow,
                id: player.Id
              })
            });
            serverBus.$emit('showLoading', false);
          })
          .catch(error => {
            serverBus.$emit('showError', 'Si è verificato un errore');
            serverBus.$emit('showLoading', false);
          })
      }
    },
    findTeams: function() {
      var self = this;
      if ((this.actualPos != null) && (this.amount != null)) {
        serverBus.$emit('showLoading', true);
        this.$store.dispatch('getTeamAroundPoint', {
            lat: this.actualPos.lat,
            lng: this.actualPos.lng,
            rad: this.amount * 4,
            top: 100
          })
          .then(res => {
            self.teams = res.data
            for (var i = 0; i < self.markers.length; i++) {
              self.markers[i].marker.setMap(null);
            }
            self.infoWindows = [];
            res.data.forEach(function(team) {
              let point = {
                lat: team.Latitudine,
                lng: team.Longitudine
              };
              let contentString = '<div class="card" style="width: 18rem;">' +
                '<img class="card-img-top" style="max-width: 250px; margin: 0 auto;" src="' + self.$store.state.configurations.imageRootUrl + team.Logo + '" alt="' + team.TeamName + '">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + team.TeamName + '</h5>' +
                '<p class="card-text">' +
                team.Catogory +
                '</p>' +
                '<a href="#" class="btn btn-primary" style="color: #FFF;"> Visita il Profilo </a>' +
                '</div>' +
                '</div>';
              let infowindow = new google.maps.InfoWindow({
                content: contentString
              });
              let markerMap = new google.maps.Marker({
                position: point,
                map: self.map,
                animation: google.maps.Animation.DROP,
                title: team.TeamName
              });
              google.maps.event.addListener(markerMap, 'click', function() {
                for (var i = 0; i < self.infoWindows.length; i++) self.infoWindows[i].info.close()
                infowindow.open(map, markerMap);
              });
              // Event that closes the Info Window with a click on the map
              google.maps.event.addListener(map, 'click', function() {
                infowindow.close();
              });
              markerMap.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
              self.markers.push({
                marker: markerMap,
                id: team.Id
              });
              self.infoWindows.push({
                info: infowindow,
                id: team.Id
              })
            });
            serverBus.$emit('showLoading', false);
          })
          .catch(error => {
            // alert('Si è verificato un errore');
            serverBus.$emit('showLoading', false);
          })
      }
    },
    setCorrectAddress: function(value) {
      let newPos = {
        lat: value.geometry.location.lat(),
        lng: value.geometry.location.lng()
      };
      if (this.actualPos == null) {
        this.actualPos = newPos;
        this.setNewPointOnMap(value, this.map, this.radius)
        //this.findTeams();
      } else if ((newPos.lat != this.actualPos.lat) || (newPos.lng != this.actualPos.lng)) {
        this.actualPos = newPos;
        this.setNewPointOnMap(value, this.map, this.radius)
        //this.findTeams();
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
        //alert(self.what)
        //let temp = self.profileList.filter(d => d.text === self.what);
        //self.profileSelected = temp[0].value;
        self.findTeam();
      }, 500);
    })

  }

}
</script>

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
    padding: 10px 32px 48px;
    position: relative;
    z-index: initial;
    margin: 0 -15px;
    background: darken(#178501, 10%);
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
        background-color: #178501;
        pointer-events: auto;
        align-items: center;
        border: none;
        border-radius: 28px;
        box-shadow: 0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12);
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: flex;
        height: 56px;
        min-width: 56px;
        outline: none;
        padding: 0 8px;
        position: relative;
        user-select: none;
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
    background-color: #188502;
    /* Green */
    border: none;
    color: white;
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

@media only screen and (min-width: 767px) {
    .search-form {
        min-width: 852px;
        margin: 0 76px;
        div {
            margin-top: 0;
        }
    }
}
</style>
