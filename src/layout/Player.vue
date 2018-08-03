<template lang="html">
  <div>
      <!-- <section class="hero-section" v-if="cardResult"> -->
      <section class="pusher" v-if="cardResult">
        <div class="main-header">


        <div class="container">
          <div class="row">
            <!-- <Logo /> -->
            <div class="col-12 player-header">

              <md-card class="md-card-profile">
                <div class="md-card-avatar">
                  <img class="img" :src="cardUserImage">
                </div>

                <md-card-content>
                  <h4 class="card-title">Nome Cognome</h4>
                  <h6 class="category text-gray">Attaccante</h6>
                  <!-- <p class="card-description">
                    Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
                  </p> -->
                  <hr>
                  <div class="text-center">
                    <div class="row">
                      <div class="col-lg-6">
                        <h5>Ruolo
                          <br><small>attaccante</small></h5></div>
                      <div class="col-lg-6">
                        <h5>Classe
                          <br><small>1999</small></h5></div>
                    </div>
                  </div>
                  <!-- <md-button class="md-round md-success">Follow</md-button> -->
                </md-card-content>
              </md-card>
              
                <md-card>
                  <md-card-header :data-background-color="dataBackgroundColor">
                    <h4 class="title">Aggiorna Profilo</h4>
                    <p class="category">Completa il tuo profilo</p>
                  </md-card-header>

                  <md-card-content>
                    <div class="md-layout">
                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                          <label>Nome</label>
                          <md-input v-model="firstName" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-50">
                        <md-field>
                          <label>Cognome</label>
                          <md-input v-model="lastName" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>Classe</label>
                          <md-input v-model="classe" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>Nazionalità</label>
                          <md-input v-model="nazionalita" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>Ruolo</label>
                          <md-input v-model="ruolo" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>Dove ti Trovi</label>
                          <md-input v-model="doveTiTrovi" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>Dove Cerchi</label>
                          <md-input v-model="doveCerchi" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>Status</label>
                          <md-input v-model="status" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>Telefono</label>
                          <md-input v-model="tel" type="number"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>Peso</label>
                          <md-input v-model="peso" type="number"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>Altezza</label>
                          <md-input v-model="altezza" type="number"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>Nome Squadra ultimo campionato</label>
                          <md-input v-model="campionato1" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>Campionato 2</label>
                          <md-input v-model="campionato2" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-field>
                          <label>Campionato 3</label>
                          <md-input v-model="status" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-100">
                        <md-field maxlength="5">
                          <label>About Me</label>
                          <md-textarea v-model="aboutMe"></md-textarea>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-100 text-right">
                        <md-button class="md-raised md-success">Aggiorna Profilo</md-button>
                      </div>
                    </div>

                  </md-card-content>
                </md-card>
            </div>
          </div>
        </div>
      </div>
      </section>

    <!-- <Footer /> -->

      <!-- player -->
      <player v-if="userProfile" :player="player" />
      <!-- /.player -->
</div>
</template>


<script>
import axios from 'axios'

import Logo from '@/components/Logo'
import Player from './Player'
// import Footer from '@/components/Footer'
export default {
  name: 'Result',
  components: {
    Logo,
    Player
    // Footer
  },
  data() {
    return {
      users: [],
      userProfile: false,
      cardResult: true,
      isEditing: false,
      user: {
        firstName: 'Alejandro',
        lastName: 'Salgado',
        classe: '1990',
        nazionalita: 'Italiana',
        role: 'attaccante',
        status: 'svincolato',
        doveTiTrovi: 'Roma',
        doveCerchi: 'Roma',
        tel: '1234567890',
        peso: '72',
        altezza: '187',
        campionato1: 'Serie D',
        campionato2: 'Serie D',
        campionato3: 'Serie D'
      }
    }
  },
  // props: ['what', 'where', 'to'],
  methods: {
    userList: function() {
      this.error = null;
      // ../static/data/country.json
      // http://35.193.9.82:121/api/Search/FindUser
      axios.get('http://35.193.9.82:121/api/Search/FindUser', {})
        .then(response => {
          console.log('userList Response:', response)
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.users = response.data
        })
        .catch(error => {
          // Request failed.
          console.log('error', error.response)
          this.error = error.response
        })
    },
    playerProfile: function() {
      this.cardResult = false
      this.userProfile = true
      console.log("player " + this.$store.state.id)
    }
  },
  computed: {
    what: {
      get() {
        return this.$store.state.what;
      },
      set(value) {
        this.$store.commit("SET_WHAT", value);
      }
    },
    player: {
      get() {
        return this.$store.state.player;
      },
      set(value) {
        this.$store.commit("SET_PLAYER", value);
      }
    }
  },
  mounted() {
    //from your component

    console.log("store player id:" + this.$route.query.player)
    this.userList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
input {
    padding: 8px 10px;
}
.pusher {
    background-image: url("../assets/images/bg-footer.jpg");
    background-repeat: no-repeat;
    background-position: 50% 300px;
    background-size: cover;
    min-height: 100vh;
}
.main-header {
    // background-color: #d7e5e8;
    background-color: #FFF;
    // background-image: url("https://www.higuests.com/assets/images/alfred_001.png");
    background-image: url("../assets/images/logo-footer.png");
    background-repeat: no-repeat;
    background-position: 50% 110%;
    background-size: 200px auto;
    padding-bottom: 220px;
    border-radius: 0 0 9000px 6000px /1500px;
    min-height: 600px;
    overflow: hidden;
    box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
}
.left {
    float: left;
}
.right {
    float: right;
}
.clear {
    clear: both;
}

.profile-card {
    margin: 50px;
    // width: 500px;
    min-height: 400px;
    h1,
    h6 {
        color: #FFF;
    }
}
.profile-card .profile-cover {
    background: url("https://ak1.picdn.net/shutterstock/videos/3307751/thumb/1.jpg?i10c=img.resize(height:160)") no-repeat center;
    position: relative;
    height: 260px;

    -webkit-border-top-left-radius: 5px;
    -webkit-border-top-right-radius: 5px;
    -moz-border-radius-topleft: 5px;
    -moz-border-radius-topright: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-size: cover;

    transition: all 0.5s;
    -moz-transition: all 0.5s;
    /* Firefox 4 */
    -webkit-transition: all 0.5s;
    /* Safari and Chrome */
    -o-transition: all 0.5s;
    /* Opera */
}
.profile-card .profile-cover:hover {
    filter: none;
    filter: none;
    -webkit-filter: none;

}
.profile-card .profile-cover .profile-avatar {
    background: #ffffff;
    border: 1px solid #eeeeee;
    border: 5px solid #ffffff;
    width: 150px;
    height: 150px;
    position: absolute;
    margin: 25px auto 0;
    overflow: hidden;
    left: 0;
    right: 0;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    transition: all 0.5s;
    -moz-transition: all 0.5s;
    /* Firefox 4 */
    -webkit-transition: all 0.5s;
    /* Safari and Chrome */
    -o-transition: all 0.5s;
    /* Opera */
}
.profile-card .profile-cover .profile-avatar:hover {
    margin-top: 23px;
}
.profile-card .profile-cover .profile-avatar .btns-container {
    position: relative;
}
.profile-card .profile-cover .profile-avatar .btns-container .profile-links {
    position: absolute;
    top: 110px;
    left: 0;
    right: 0;
    text-align: center;
    display: none;
}
.profile-card .profile-cover .profile-avatar .btns-container .profile-links a {
    display: inline-block;
    background: #ffffff;
    text-decoration: none;
    padding: 5px;
}
.profile-card .profile-cover .profile-avatar .btns-container .profile-links a img {
    display: block;
}
.profile-card .profile-cover .profile-avatar .btns-container .profile-links a.zoom-avatar {
    background: rgba(103, 186, 144, 0.7);
}
.profile-card .profile-cover .profile-avatar .btns-container .profile-links a.zoom-avatar:hover {
    background: rgba(103, 186, 144, 1);
}
.profile-card .profile-cover .profile-avatar .btns-container .profile-links a.read-more {
    background: rgba(231, 76, 60, 0.7);
}
.profile-card .profile-cover .profile-avatar .btns-container .profile-links a.read-more:hover {
    background: rgba(231, 76, 60, 1);
}
.profile-card .profile-cover .profile-avatar .btns-container .profile-links a.view-map {
    background: rgba(157, 177, 218, 0.7);
}
.profile-card .profile-cover .profile-avatar .btns-container .profile-links a.view-map:hover {
    background: rgba(157, 177, 218, 1);
}
.profile-card .profile-cover .profile-details {
    background: rgba(0,0,0,0.4);
    border-top: 1px solid rgba(0,0,0,0.5);
    color: #ffffff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    font-weight: bold;
    padding: 5px 0 7px;
}
.profile-card .profile-cover .profile-details h6 {
    font-weight: normal;
}
.profile-card .profile-info {
    background: #e74c3c;
    color: #ffffff;
    padding: 10px;
    font-family: Arial;
    text-align: justify;
}
.profile-card .profile-info h1 {
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding-bottom: 3px;
    padding-left: 10px;
    margin-bottom: 5px;
}
.profile-card .profile-info .info-area {
    padding: 0 10px 5px;
}
.profile-card .profile-map {
    border-top: 1px solid #cccccc;
    float: left;
    width: 100%;
}
.profile-card .profile-content {
    background: #ffffff;
    padding-top: 20px;
    /* Old browsers */
    /* IE9 SVG, needs conditional override of 'filter' to 'none' */
    background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZmZmZiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlZWVlZWUiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+");
    background: -moz-linear-gradient(top, #ffffff 0%, #eeeeee 100%);
    /* FF3.6+ */
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ffffff), color-stop(100%,#eeeeee));
    /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(top, #ffffff 0%,#eeeeee 100%);
    /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(top, #ffffff 0%,#eeeeee 100%);
    /* Opera 11.10+ */
    background: -ms-linear-gradient(top, #ffffff 0%,#eeeeee 100%);
    /* IE10+ */
    background: linear-gradient(to bottom, #ffffff 0%,#eeeeee 100%);
    /* W3C */

    border: 1px solid #cccccc;
    border-top: none;
    -webkit-border-bottom-right-radius: 5px;
    -webkit-border-bottom-left-radius: 5px;
    -moz-border-radius-bottomright: 5px;
    -moz-border-radius-bottomleft: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
}
.profile-card .profile-content ul li {
    float: left;
    padding: 10px 32px;
    text-align: center;
    border-right: 1px solid #eeeeee;
    border-left: 1px solid #ffffff;
}
.profile-card .profile-content ul li:first-child {
    border-left: none;
}
.profile-card .profile-content ul li:last-child {
    border-right: none;
}
.profile-card .profile-content ul li .digits {
    font-weight: bold;
    font-size: 16px;
}

.player-header {
    // background-color: red;

}
button.hide {
    cursor: pointer;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
}

.view {
    border-color: transparent;
    background-color: initial;
    color: initial;
}
li {
    list-style: none;
}
h1 {
    text-transform: uppercase;
    font-size: 2.5rem;
    span {
        // color: #088039;
        color: #FFF;
    }
}
</style>
