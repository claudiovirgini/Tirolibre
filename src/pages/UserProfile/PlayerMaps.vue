<template>
<div style="padding:15px">
  <div class="row" style="padding-bottom:10px">
    <div class="col-lg-4 col-md-6 col-sm-12">
      <map-autocomplete place-holder="Luogo di ricerca" :initial-address="city" startactualpos="true" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress"></map-autocomplete>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12" style="padding-top:10px;text-align:center">
      <button @click="decreaseAmount()" class="button_plus">-</button>
      <vue-slider style="float:left;width:70%;padding-top:13px" ref="slider" v-model="amount"></vue-slider><button @click="increaseAmount()" class="button_plus">+</button>
    </div>
    <!--<div class="col-lg-4 col-md-12 col-sm-12" style="padding-top:10px;text-align:center">
        <button @click="findTeams()" class="btn"><i class="fa fa-search" ></i> Cerca</button>
      </div>-->
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
                <i class="md-icon md-icon-font material-icons md-theme-default">edit</i>
                Show
              </md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>
      <div class="row row-eq-height" >
        <div class="col" v-for="player in players" :key="player.Id">
          <md-card md-with-hover>
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">{{ player.Name }} </div>
                <!--<div class="md-subhead">{{ card.Role != null  ? card.Role : 'No Role' }}</div>-->
              </md-card-header-text>
              <md-card-media md-medium>
                <picture-box :picUrl="player.PlayerImage" :picType="0"></picture-box>
              </md-card-media>
            </md-card-header>
            <md-card-actions>
              <md-button class="md-success tiro" @click="showInfoWindowById(player.Id)">
                <i class="md-icon md-icon-font material-icons md-theme-default">edit</i>
                Show
              </md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>

    </div>
    <div class="col-md-8">
      <div id="map"></div>
    </div>
  </div>
 
</div>
</template>

<script>
import vueSlider from 'vue-slider-component'
  import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
  import PictureBox from '@/components/PictureBox/PictureBox'

//import axios from 'axios'
import {
  serverBus
} from '../../main';

  export default {
  name: 'PlayerMaps',
  data() {
    return {
      profile:-1,
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
      infoWindows: []
    }
  },
  components: {
    vueSlider,
    MapAutocomplete,
    PictureBox
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
        this.actualTimer = setTimeout(function () {
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
    }
  },
    mounted() {
      this.profile = this.$store.state.authentication.user.Profile;
    },
    methods: {
      showInfoWindowById: function (Id) {
        var markerToOpen = this.markers.filter(function (x) { return x.id == Id })[0];
        var infoWindowToOpen = this.infoWindows.filter(function (x) { return x.id == Id })[0];
        for (var i = 0; i < this.infoWindows.length; i++)   this.infoWindows[i].info.close()
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
    findPlayers: function () {
      var self = this;
      if ((this.actualPos != null) && (this.amount != null)) {
        serverBus.$emit('showLoading', true);
        this.$store.dispatch('getPlayerAroundPoint', {
          lat: this.actualPos.lat,
          lng: this.actualPos.lng,
          rad: this.amount * 4,
          top: 100
        })
          .then(res => {
            self.players = res.data
            for (var i = 0; i < self.markers.length; i++) {
              self.markers[i].marker.setMap(null);
            }
            res.data.forEach(function (player) {
              let point = {
                lat: player.Latitudine,
                lng: player.Longitudine
              };
              let contentString = '<div class="card" style="width: 18rem;">' +
                '<img class="card-img-top" style="max-width: 250px; margin: 0 auto;" src="' + self.$store.state.configurations.imageRootUrl + player.PlayerImage + '" alt="' + player.Name + '">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + player.Name + '</h5>' +
                '<p class="card-text">' +
                player.Catogory +
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
                title: player.Name
              });
              google.maps.event.addListener(markerMap, 'click', function () {
                for (var i = 0; i < self.infoWindows.length; i++)   self.infoWindows[i].info.close()
                infowindow.open(map, markerMap);
              });
              // Event that closes the Info Window with a click on the map
              google.maps.event.addListener(map, 'click', function () {
                infowindow.close();
              });
              markerMap.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
              self.markers.push({ marker: markerMap, id: player.Id });
              self.infoWindows.push({ info: infowindow, id: player.Id })
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
              google.maps.event.addListener(markerMap, 'click', function () {
                for (var i = 0; i < self.infoWindows.length; i++)   self.infoWindows[i].info.close()
                infowindow.open(map, markerMap);
              });
              // Event that closes the Info Window with a click on the map
              google.maps.event.addListener(map, 'click', function() {
                infowindow.close();
              });
              markerMap.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
              self.markers.push({ marker: markerMap, id: team.Id });
              self.infoWindows.push({ info: infowindow, id: team.Id })
            });
            serverBus.$emit('showLoading', false);
          })
          .catch(error => {
            alert('Si è verificato un errore');
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
    },

  }

}
</script>

<style scoped lang="scss">
.button_plus {
    float: left;
    background-color: #3498db;
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
</style>
