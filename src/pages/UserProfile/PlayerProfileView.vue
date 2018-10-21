<template>
  <div class="content">
    <div class="md-layout mt-5">
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <picture-box isEditable="false" v-model="playerdata.UserImageUrl" picType="0" v-if="profileIsLoaded"></picture-box>
          </div>
          <md-card-content>
            <h4 class="card-title">{{name}}</h4>
            <h6 class="category text-gray">Calciatore</h6>
            <hr>
            <div class="text-center">
              <div class="row">
                <div class="col-lg-6">
                  <h5>
                    Ruolo
                    <br><small>{{roleSelected}}</small>
                  </h5>
                </div>
                <div class="col-lg-6">
                  <h5>
                    Classe
                    <br><small>{{yearClass}}</small>
                  </h5>
                </div>
              </div>
            </div>
          </md-card-content>
          <youtube :video-id="videoId"  ></youtube>
        </md-card>
        <md-button @click="sendMessage" class="md-success btn btn-success btn-lg btn-radius" v-if="isAuthenticated"><i class="material-icons">mail_outline</i> Invia Messaggio</md-button>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <div>
          <md-card class="md-card-profile">
            <md-card-header data-background-color="yellow">
              <h4 class="title">Scheda Profilo</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Classe</label>
                    <md-input :value='yearClass' disabled type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Nazionalità</label>
                    <md-input :value='nationality' disabled type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Ruolo</label>
                    <md-input :value='roleSelected' disabled type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Dove ti Trovi</label>
                    <md-input :value="city" type="text" disabled></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Dove Cerchi</label>
                    <md-input :value='researchPlace' disabled type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Status</label>
                    <md-input :value='actualStatus' disabled type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Telefono</label>
                    <md-input :value='phoneNumber' disabled type="number"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Peso</label>
                    <md-input :value='weigth' disabled type="number"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Altezza</label>
                    <md-input :value='heigth' disabled type="number"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Nome Squadra ultimo campionato</label>
                    <md-input :value='experience1' disabled type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Campionato 2</label>
                    <md-input :value='experience2' disabled type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Campionato 3</label>
                    <md-input :value='experience3' disabled type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field maxlength="5">
                    <label>About Me</label>
                    <md-textarea :value='aboutMe' disabled></md-textarea>
                  </md-field>
                </div>
              </div>

            </md-card-content>
          </md-card>
        </div>
      </div>
     
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  import PictureBox from '@/components/PictureBox/PictureBox'
  import VueYouTubeEmbed from 'vue-youtube-embed'
  //import {
  //  getIdFromURL,
  //  getTimeFromURL
  //} from 'vue-youtube-embed'
  Vue.use(VueYouTubeEmbed)

  import {
    getIdFromURL,
    getTimeFromURL
  } from 'vue-youtube-embed'
import {
  serverBus
} from '@/main';

export default {
  name: 'PlayerProfileView',
  components: {
    PictureBox,
    VueYouTubeEmbed
  },
  data() {
    return {
      profileIsLoaded: true,
      playerdata: {},
      fullPathPlayerImage: null,
      infoPage: {
        url: '',
        type: '',
        title: 'About me',
        description: '',
        image: null,
        modalAuth: false
      }
    }
  },

  //props: {
  //  playerId: {
  //    type: Number
  //  }
  //},
  methods: {
    playerProfile: function() {
      this.cardResult = false
      this.userProfile = true
    },
    sendMessage: function() {
      let isAuth = this.$store.state.authentication.isAuth
      console.log("auth: " + isAuth)
      if (isAuth === true) {
        serverBus.$emit('sendMessage', this.playerdata.Id)
      } else {
        this.modalAuth = true
        // alert("non autenticato")
      }
    }
  },
  computed: {
    isAuthenticated: {
      get() {
        return this.$store.state.authentication.isAuth;
      }
    },
      videoId: {
        get() {
          return this.playerdata != null && this.playerdata.Videos != null && this.playerdata.Videos.length > 0 ? getIdFromURL(this.playerdata.Videos[0].VideoUrl) : '';
        }
      },
      videoUrl: {
        get() {
          return this.playerdata != null && this.playerdata.Videos != null && this.playerdata.Videos.length > 0 ?
            this.playerdata.Videos[0].VideoUrl :
            '';
        }
      },
      profile: {
        get() {
          return (this.playerdata != null) ? this.playerdata.Profile : 0;
        }
      },
      imagefile: {
        get() {
          return this.playerdata != null ? this.playerdata.UserImageUrl : null
        }
      },
      roleSelected: {
        get() {
          if ((this.playerdata != null) && (this.playerdata.Roles != null) && (this.playerdata.Roles.length > 0))
            return this.playerdata.Roles[0].RoleName
          else return 'not available';
        }
      },
      name: {
        get() {
          return (this.playerdata != null) ? this.playerdata.Name : '';
        },
        set(value) {
          this.playerdata.Name = value;
        }
      },
      weigth: {
        get() {
          return (this.playerdata != null) ? this.playerdata.Weigth : '';
        },
        set(value) {
          this.playerdata.Weigth = value;
        }
      },
      heigth: {
        get() {
          return (this.playerdata != null) ? this.playerdata.Heigth : '';
        },
        set(value) {
          this.playerdata.Heigth = value;
        }
      },
      aboutMe: {
        get() {
          return (this.playerdata != null) ? this.playerdata.AboutMe : '';
        },
        set(value) {
          this.playerdata.AboutMe = value;
        }
      },
      actualStatus: {
        get() {
          return (this.playerdata != null) ? this.playerdata.ActualStatus : '';
        },
        set(value) {
          this.playerdata.ActualStatus = value;
        }
      },
      city: {
        get() {
          return (this.playerdata != null) ? this.playerdata.City : '';
        },
        set(value) {
          this.playerdata.City = value;
        }
      },
      nationality: {
        get() {
          return (this.playerdata != null) ? this.playerdata.Nationality : '';
        },
        set(value) {
          this.playerdata.Nationality = value;
        }
      },
      phoneNumber: {
        get() {
          return (this.playerdata != null) ? this.playerdata.PhoneNumber : '';
        },
        set(value) {
          this.playerdata.PhoneNumber = value;
        }
      },
      yearClass: {
        get() {
          var returned = 'not available'
          if (this.playerdata != null && this.playerdata.BornDate) {
            var temp = new Date(this.playerdata.BornDate);
            returned = temp.getFullYear()
          }
          return returned;
        },
        set(value) {
          if (this.playerdata.BornDate != null) {
            this.playerdata.BornDate = new Date(this.playerdata.BornDate);
          } else {
            this.playerdata.BornDate = new Date('01/01/2000');
          }
          this.playerdata.BornDate.setFullYear(value)
        }
      },
      roleSelected: {
        get() {
          if ((this.playerdata != null) && (this.playerdata.Roles != null) && (this.playerdata.Roles.length > 0))
            return this.playerdata.Roles[0].RoleName
          else return 'not available';
        },
        set(value) {
          if ((this.playerdata != null) && (this.playerdata.Roles != null) && (this.playerdata.Roles.length > 0))
            return this.playerdata.Roles[0].RoleName = value;
          else {
            this.playerdata.Roles = [];
            this.playerdata.Roles.push({
              Id: 0,
              RoleName: value
            })
          }
        }
      },
      researchPlace: {
        get() {
          if ((this.playerdata != null) && (this.playerdata.ResearchPlaces != null) && (this.playerdata.ResearchPlaces.length > 0))
            return this.playerdata.ResearchPlaces[0].Value
          else return 'not available';
        },
        set(value) {
          if ((this.playerdata != null) && (this.playerdata.ResearchPlaces != null) && (this.playerdata.ResearchPlaces.length > 0))
            return this.playerdata.ResearchPlaces[0].Value = value;
          else {
            this.playerdata.ResearchPlaces = [];
            this.playerdata.ResearchPlaces.push({
              Id: 0,
              Value: value
            })
          }
        }
      },
      experience1: {
        get() {
          if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 0))
            return this.playerdata.Experiences[0].TeamName
          else return 'not available';
        },
        set(value) {
          if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 0))
            return this.playerdata.Experiences[0].TeamName = value;
          else {
            this.playerdata.Experiences = [];
            this.playerdata.Experiences.push({
              Id: 0,
              TeamName: value
            })
          }
        }
      },
      experience2: {
        get() {
          if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 1))
            return this.playerdata.Experiences[1].TeamName
          else
            return 'not available';
        },
        set(value) {
          if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 1))
            return this.playerdata.Experiences[1].TeamName = value;
          else {
            if ((this.playerdata.Experiences != null) && (this.playerdata.Experiences.length == 1)) {
              this.playerdata.Experiences.push({
                Id: 0,
                TeamName: value
              })
            }
          }
        }
      },
      experience3: {
        get() {
          if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 2))
            return this.playerdata.Experiences[2].TeamName
          else return 'not available';
        },
        set(value) {
          if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 2))
            return this.playerdata.Experiences[2].TeamName = value;
          else {
            if ((this.playerdata.Experiences != null) && (this.playerdata.Experiences.length == 2)) {
              this.playerdata.Experiences.push({
                Id: 0,
                TeamName: value
              })
            }
          }
        }
      },
  },
  mounted() {
    serverBus.$emit('showLoading', true);
    this.playerId = this.$route.query.playerId
    this.profileIsLoaded = false;
    this.$store.dispatch('getPlayerProfile', this.playerId).then(res => {
      this.playerdata = res.data
      this.profileIsLoaded = true;
      serverBus.$emit('showLoading', false);
    }).catch(error => {
      // alert('Si è verificato un errore');
      serverBus.$emit('showLoading', false);
    })
  }
}
</script>
