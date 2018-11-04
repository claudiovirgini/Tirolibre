<template>
<div class="content">
  <div class="md-layout mt-5">
    <div class="md-layout-item md-medium-size-100 md-size-33">
      <md-card class="md-card-profile">
        <div class="md-card-avatar">
          <picture-box isEditable="false" v-model="teamdata.UserImageUrl" :picType="teamdata.Profile" v-if="profileIsLoaded"></picture-box>
        </div>
        <md-card-content>
          <h4 class="card-title">{{name}}</h4>
          <h6 class="category text-gray">Squadra</h6>
          <hr>
          <div class="text-center">
            <div class="row">
              <div class="col-lg-12">
                <h5>
                    Categoria
                    <br><small>{{catName}}</small>
                  </h5>
              </div>
              <!--<div class="col-lg-6">
                  <h5>

                  </h5>
                </div>-->
            </div>
          </div>
        </md-card-content>
        <!--<youtube :video-id="videoId"  ></youtube>-->
      </md-card>
      <md-button @click="sendMessage" class="md-success btn btn-success btn-lg btn-radius" v-if="isAuthenticated"><i class="material-icons">mail_outline</i> Invia Messaggio</md-button>
    </div>
    <div class="md-layout-item md-medium-size-100 md-size-66">
      <div>
        <md-card class="md-card-profile dark-theme">
          <md-card-header data-background-color="yellow">
            <h4 class="title">Scheda Profilo</h4>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Nome</label>
                  <md-input v-model="name" type="text" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Indirizzo</label>
                  <md-input v-model="teamdata.Address.FullAddress" type="text" disabled></md-input>
                  <!--<md-input v-model="teamdata.Address.FullAddress" type="text" disabled></md-input>-->
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label for="year">Anno Fondazione</label>
                  <md-input v-model="yearClass" type="text" disabled/>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Web Site</label>
                  <md-input v-model="website" type="text" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Facebook</label>
                  <md-input v-model="facebook" type="text" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Twitter</label>
                  <md-input v-model="twitter" type="text" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>LinkedIn</label>
                  <md-input v-model="linkedin" type="text" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Telefono</label>
                  <md-input v-model="contactPhone" type="text" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Cellulare</label>
                  <md-input v-model="contactCell" type="text" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label>Mail Alernativa</label>
                  <md-input v-model="contactEmail" type="text" disabled></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-33">
                <md-field>
                  <label for="casftegory">Category</label>
                  <md-input v-model="catName" type="text" disabled></md-input>

                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label for="casftegory">Indirizzo Stadio</label>
                  <md-input v-model="stadiumAddress" type="text" disabled></md-input>
                  <!--<map-autocomplete place-holder="Indirizzo Stadio" input-component-name="gmapss2" :initial-address="stadiumAddress" v-on:setCorrectAddress="setCorrectAddressStadium" v-on:setInvalidAddress="setInvalidAddressStadium"></map-autocomplete>-->
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
      categoryList: [],
      profileLoaded: true,
      teamdata: {},
      teamId: 0,
      profileIsLoaded: false
    }
  },

  methods: {
    playerProfile: function() {
      this.cardResult = false
      this.userProfile = true
    },
    sendMessage: function() {
      let isAuth = this.$store.state.authentication.isAuth
      if (isAuth === true) {
        serverBus.$emit('sendMessage', this.teamdata.Id)
      } else {
        this.modalAuth = true

      }
    }
  },
  computed: {
    catName: {
      get() {
        var returned = '';
        if (this.teamdata != null && this.teamdata.Category != -1) {
          var catId = this.teamdata.Category;
          var temp = this.categoryList.filter(function(x) {
            return x.value == catId
          });
          if ((temp != null) && (temp.length > 0))
            returned = temp[0].text;
          return returned;
        }
        return returned;
      },

    },
    yearClass: {
      get() {
        if (this.teamdata != null && this.teamdata.DataFondation) {
          return this.teamdata.DataFondation;
        } else return null;
      },
    },
    isAuthenticated: {
      get() {
        return this.$store.state.authentication.isAuth;
      }
    },
    imagefile: {
      get() {
        return this.teamdata != null ? this.teamdata.FileLogo : null;
      }
    },
    name: {
      get() {
        return (this.teamdata != null) ? this.teamdata.Name : '';
      },
      set(value) {
        this.teamdata.Name = value;
      }
    },
    foundation: {
      get() {
        return (this.teamdata != null && this.teamdata.DataFondation != -1) ? this.teamdata.DataFondation : '';
      },
      set(value) {
        this.teamdata.DataFondation = value;
      }
    },
    cat: {
      get() {
        return (this.teamdata != null && this.teamdata.Category != -1) ? this.teamdata.Category : '';
      },
      set(value) {
        this.teamdata.Category = value;
      }
    },
    catName: {
      get() {
        var returned = '';
        if (this.teamdata != null && this.teamdata.Category != -1) {
          var catId = this.teamdata.Category;
          var temp = this.categoryList.filter(function(x) {
            return x.value == catId
          });
          if ((temp != null) && (temp.length > 0))
            returned = temp[0].text;
          return returned;
        }
        return returned;
      },

    },
    city: {
      get() {
        return (this.teamdata != null && this.teamdata.Address != null) ? this.teamdata.Address.FullAddress : '';
      },
      set(value) {
        this.teamdata.Address = {
          FullAddressJson: JSON.stringify(value),
          FullAddress: value.formatted_address,
          Location: null
        };
      }
    },
    stadiumAddress: {
      get() {
        return (this.teamdata != null && this.teamdata.StadiumInfos != null && this.teamdata.StadiumInfos.StadiumAddress != null) ? this.teamdata.StadiumInfos.StadiumAddress.FullAddress : '';
      },
      set(value) {
        if (this.teamdata.StadiumInfos == null) this.teamdata.StadiumInfos = {
          StadiumAddress: {},
          StadiumName: ''
        }
        this.teamdata.StadiumInfos.StadiumAddress = {
          FullAddressJson: JSON.stringify(value),
          FullAddress: value.formatted_address,
          Location: null
        };
      }
    },

    contactCell: {
      get() {
        return (this.teamdata != null && this.teamdata.Contact != null) ? this.teamdata.Contact.Mobile : '';
      },
      set(value) {
        if (this.teamdata.Contact == null) this.teamdata.Contact = {
          Phone: '',
          Mobile: '',
          Email: ''
        }
        this.teamdata.Contact.Mobile = value;
      }
    },
    contactPhone: {
      get() {
        return (this.teamdata != null && this.teamdata.Contact != null) ? this.teamdata.Contact.Phone : '';
      },
      set(value) {
        if (this.teamdata.Contact == null) this.teamdata.Contact = {
          Phone: '',
          Mobile: '',
          Email: ''
        }
        this.teamdata.Contact.Phone = value;
      }
    },
    contactEmail: {
      get() {
        return (this.teamdata != null && this.teamdata.Contact != null) ? this.teamdata.Contact.Email : '';
      },
      set(value) {
        if (this.teamdata.Contact == null) this.teamdata.Contact = {
          Phone: '',
          Mobile: '',
          Email: ''
        }
        this.teamdata.Contact.Email = value;
      }
    },
    linkedin: {
      get() {
        return (this.teamdata != null && this.teamdata.Social != null) ? this.teamdata.Social.LinkedInUrl : '';
      },
      set(value) {
        if (this.teamdata.Social == null) this.teamdata.Social = {
          LinkedInUrl: '',
          TwitterUrl: '',
          WebSiteUrl: '',
          FacebookUrl: ''
        }
        this.teamdata.Social.LinkedInUrl = value;
      }
    },
    twitter: {
      get() {
        return (this.teamdata != null && this.teamdata.Social != null) ? this.teamdata.Social.TwitterUrl : '';
      },
      set(value) {
        if (this.teamdata.Social == null) this.teamdata.Social = {
          LinkedInUrl: '',
          TwitterUrl: '',
          WebSiteUrl: '',
          FacebookUrl: ''
        }
        this.teamdata.Social.TwitterUrl = value;
      }
    },
    website: {
      get() {
        return (this.teamdata != null && this.teamdata.Social != null) ? this.teamdata.Social.WebSiteUrl : '';
      },
      set(value) {
        if (this.teamdata.Social == null) this.teamdata.Social = {
          LinkedInUrl: '',
          TwitterUrl: '',
          WebSiteUrl: '',
          FacebookUrl: ''
        }
        this.teamdata.Social.WebSiteUrl = value;
      }
    },
    facebook: {
      get() {
        return (this.teamdata != null && this.teamdata.Social != null) ? this.teamdata.Social.FacebookUrl : '';
      },
      set(value) {
        if (this.teamdata.Social == null) this.teamdata.Social = {
          LinkedInUrl: '',
          TwitterUrl: '',
          WebSiteUrl: '',
          FacebookUrl: ''
        }
        this.teamdata.Social.FacebookUrl = value;
      }
    },
  },
  mounted() {




    var self = this;
    this.teamId = this.$route.query.teamId
    this.profileLoaded = false;
    serverBus.$emit('showLoading', true);

    this.$store.dispatch('getCategories', {}).then(listCategories => {
      this.categoryList = listCategories;
      this.$store.dispatch('getTeamProfile', this.teamId).then(res => {
        self.teamdata = res.data;
        this.profileIsLoaded = true;
        serverBus.$emit('showLoading', false);
      })
    }).catch(error => {
      alert('Si è verificato un errore');
      serverBus.$emit('showLoading', false)
    });



    this.$store.dispatch('getTeamProfile', this.teamId).then(res => {
      this.teamdata = res.data;
      this.profileIsLoaded = true;
      serverBus.$emit('showLoading', false);
    })
  },
}
</script>
<style media="screen">
.dark-theme {
  background-color: rgba(255, 255, 255, .1) !important;
}
</style>
