<template lang="html">
  <div>
      <!-- <section class="hero-section" v-if="cardResult"> -->
      <section class="pusher" v-if="cardResult">
        <div class="main-header">


        <div class="container">
          <div class="row">
            <!-- <Logo /> -->
            <div class="col-12 player-header">

<div class="profile-card shadow-lg">
    <div class="profile-cover">
        <div class="profile-avatar">
            <div class="btns-container">
                <div class="profile-links">
                    <a class="zoom-avatar" href="#"><img src="https://dl.dropboxusercontent.com/s/5liaxzvwbfuqzpo/zoom.png"></a>
                    <a class="read-more" href="#"><img src="https://dl.dropboxusercontent.com/s/62dfoo9h44o58lw/more.png"></a>
                    <a class="view-map" href="#"><img src="https://dl.dropboxusercontent.com/s/9ofmihok0h64lvn/location.png"></a>
                </div>
            </div>
            <a href="#"><img src="https://dl.dropboxusercontent.com/s/7pcnqq18skh1myk/avatar.jpg" alt="Anis M" /></a>
        </div>
        <div class="profile-details">
            <h1>Alejandro Salgado</h1>
            <h6>Attaccante</h6>
        </div>
    </div>
    <div class="profile-info" style="display: none;">
        <h1>About Me</h1>
        <div class="info-area">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.Stet clita kasd gubergren, no sea takimata sanctus est.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        </div>
        <div class="clear"></div>
    </div>
    <div class="profile-map" style="display: none;">
        <iframe width="100%" height="150" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Saveology+New+York&amp;aq=&amp;sll=37.0625,-95.677068&amp;sspn=40.052282,86.572266&amp;t=h&amp;ie=UTF8&amp;hq=Saveology&amp;hnear=New+York&amp;ll=40.552027,-74.420902&amp;spn=0.357117,0.912844&amp;iwloc=near&amp;output=embed"></iframe>
        <div class="clear"></div>
    </div>
    <div class="profile-content">
        <!-- <ul>
            <li>
                <div class="digits">83</div>
                Followers
            </li>
            <li>
                <div class="digits">1507</div>
                Tweets
            </li>
            <li>
                <div class="digits">234</div>
                Friends
            </li>
            <li>
                <div class="digits">51</div>
                Likes
            </li>
            <li>
                <div class="digits">42</div>
                Gits
            </li>
        </ul>
        <div class="clear"></div> -->

        <div class="container">
            <div class="row m-y-2">
                <!-- edit form column -->
                <!-- <div class="col-lg-4 text-lg-center">
                    <h2>Edit Profile</h2>
                </div>
                <hr> -->
                <!-- <div class="col-lg-8">
                    <div class="alert alert-info alert-dismissable"> <a class="panel-close close" data-dismiss="alert">×</a>
                        This is an <strong>.alert</strong>. Use this to show important messages to the user.
                    </div>
                </div> -->
                <div class="col-lg-12 personal-info">
                     <form role="form">
                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold">Nome</label>
                            <div class="col-lg-6">
                                <!-- <input class="form-control" type="text" value="Jane" /> -->
                                <input type="text" v-model="user.firstName">
                                 <!-- <button @click="isEditing = !isEditing" class="hide">
                                   {{ isEditing ? 'Save' : 'Edit' }}
                                 </button>
                                 <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold">Cognome</label>
                            <div class="col-lg-6">
                            <input type="text" v-model="user.lastName">
                            <!-- <input type="text" v-model="user.lastName" :disabled="!isEditing" :class="{view: !isEditing}">
                             <button @click="isEditing = !isEditing" class="hide">
                               {{ isEditing ? 'Save' : 'Edit' }}
                             </button>
                             <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold">Classe</label>
                            <div class="col-lg-6">
                            <input type="text" v-model="user.classe">
                             <!-- <button @click="isEditing = !isEditing" class="hide">
                               {{ isEditing ? 'Save' : 'Edit' }}
                             </button>
                             <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold">Nazionalità</label>
                            <div class="col-lg-6">
                            <input type="text" v-model="user.nazionalita">
                             <!-- <button @click="isEditing = !isEditing" class="hide">
                               {{ isEditing ? 'Save' : 'Edit' }}
                             </button>
                             <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>

                        <hr>

                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold">Ruolo</label>
                            <div class="col-lg-6">
                            <input type="text" v-model="user.ruolo">
                             <!-- <button @click="isEditing = !isEditing" class="hide">
                               {{ isEditing ? 'Save' : 'Edit' }}
                             </button>
                             <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold">Status Contrattuale</label>
                            <div class="col-lg-6">
                            <input type="text" v-model="user.status">
                             <!-- <button @click="isEditing = !isEditing" class="hide">
                               {{ isEditing ? 'Save' : 'Edit' }}
                             </button>
                             <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold">Dove ti trovi</label>
                            <div class="col-lg-6">
                            <input type="text" v-model="user.doveTiTrovi">
                             <!-- <button @click="isEditing = !isEditing" class="hide">
                               {{ isEditing ? 'Save' : 'Edit' }}
                             </button>
                             <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold">Dove cerchi</label>
                            <div class="col-lg-6">
                            <input type="text" v-model="user.doveCerchi">
                             <!-- <button @click="isEditing = !isEditing" class="hide">
                               {{ isEditing ? 'Save' : 'Edit' }}
                             </button>
                             <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>

                        <hr>

                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold">Numero di telefono</label>
                            <div class="col-lg-6">
                            <input type="text" v-model="user.tel">
                             <!-- <button @click="isEditing = !isEditing" class="hide">
                               {{ isEditing ? 'Save' : 'Edit' }}
                             </button>
                             <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold">Peso</label>
                            <div class="col-lg-6">
                            <input type="text" v-model="user.peso">
                             <!-- <button @click="isEditing = !isEditing" class="hide">
                               {{ isEditing ? 'Save' : 'Edit' }}
                             </button>
                             <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold">Altezza</label>
                            <div class="col-lg-6">
                            <input type="text" v-model="user.altezza">
                             <!-- <button @click="isEditing = !isEditing" class="hide">
                               {{ isEditing ? 'Save' : 'Edit' }}
                             </button>
                             <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold">Ultimi tre campionati</label>
                            <div class="col-lg-6">
                            <input type="text" v-model="user.campionato1">
                             <!-- <button @click="isEditing = !isEditing" class="hide">
                               {{ isEditing ? 'Save' : 'Edit' }}
                             </button>
                             <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold"></label>
                            <div class="col-lg-6">
                            <input type="text" v-model="user.campionato2">
                             <!-- <button @click="isEditing = !isEditing" class="hide">
                               {{ isEditing ? 'Save' : 'Edit' }}
                             </button>
                             <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-lg-3 text-right col-form-label form-control-label font-weight-bold"></label>
                            <div class="col-lg-6">
                            <input type="text" v-model="user.campionato3">
                             <!-- <button @click="isEditing = !isEditing" class="hide">
                               {{ isEditing ? 'Save' : 'Edit' }}
                             </button>
                             <button v-if="isEditing" @click="isEditing = false">Cancel</button> -->
                            </div>
                        </div>
                        <!-- <div class="form-group row">
                            <label class="col-lg-3 col-form-label form-control-label">Time Zone</label>
                            <div class="col-lg-9">
                                <select id="user_time_zone" class="form-control" size="0">
                                    <option value="Hawaii">(GMT-10:00) Hawaii</option>
                                    <option value="Alaska">(GMT-09:00) Alaska</option>
                                    <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                                    <option value="Arizona">(GMT-07:00) Arizona</option>
                                    <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                                    <option value="Central Time (US &amp; Canada)"
                                    selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                                    <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                                    <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                                </select>
                            </div>
                        </div> -->
                        <div class="form-group row">
                            <label class="col-lg-3 col-form-label form-control-label"></label>
                            <div class="col-lg-9 text-right">
                                <input type="reset" class="btn btn-secondary" value="Cancel" />
                                <input type="button" class="btn btn-primary" value="Save Changes" />
                            </div>
                        </div>
                    </form>
                </div>
                <!-- <div class="col-lg-4 pull-lg-8 text-xs-center">
                        <img src="//placehold.it/150" class="m-x-auto img-fluid img-circle" alt="avatar" />
                        <h6 class="m-t-2">Upload a different photo</h6>
                        <label class="custom-file">
                          <input type="file" id="file" class="custom-file-input">
                          <span class="custom-file-control">Choose file</span>
                        </label>
                </div> -->
            </div>
        </div>
    </div>
</div>
            </div>
          </div>
          <hr />


          <div class="row">
                  <!-- <div>
                  First Name:
                  <input type="text" v-model="user.firstName" :disabled="!isEditing"
                         :class="{view: !isEditing}">
                </div>
                <div>
                  Last Name:
                  <input type="text" v-model="user.lastName" :disabled="!isEditing"
                         :class="{view: !isEditing}">
                </div>
                <div>

                <button @click="isEditing = !isEditing">
                  {{ isEditing ? 'Save' : 'Edit' }}
                </button>
                <button v-if="isEditing" @click="isEditing = false">Cancel</button>
              </div> -->
            <!-- <p style="color: #000;">Player is:  {{ this.$route.query.user }}</p> -->
            <!-- <p style="color: #000;">Player is:  {{ $route.query.user }}</p> -->

              <!-- <Card /> -->
              <!-- v-if="card.name === this.$route.query.user" -->
            <!-- <div class="col-md-4 mt-4" v-for="card in users" :key="card.name" v-if="card.name === $route.query.user">
              <ul>
                <li>Nome: {{ card.name }}</li>
                <li>Cognome: </li>
                <li>Classe: {{ card.age }}</li>
                <li>Nazionalità: </li>
                <li>Ruolo: {{ card.role }}</li>
                <li>Status Contrattuale: </li>
                <li>Dove ti trovi: </li>
                <li>Dove cerchi: </li>
                <li>Numero di telefono: </li>
                <li>Peso: </li>
                <li>Altezza: </li>
                <li>Ultimi 3 Campionati: </li>
                <hr>
                <li>Foto</li>
                <li>Video</li>
              </ul>
            </div> -->
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
import {
  bus
} from '../event-bus'
import axios from 'axios'

import Header from '@/components/Header'
import Logo from '@/components/Logo'
import Player from './Player'
// import Footer from '@/components/Footer'
export default {
  name: 'Result',
  components: {
    Header,
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
        ruolo: 'attaccante',
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
