<template>
<div class="content">
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-100 md-size-66">
      <md-card style="overflow-y:auto">
        <md-card-content>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" v-on:click="saveProfile()">Salva Profilo</md-button>
          </div>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Nome</label>
                <md-input v-model="name" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="ruolo">Class</label>
                <md-select v-model="yearClass" id="ruolo">
                  <md-option v-for="cla in classList" v-bind:value="cla.value">
                    {{ cla.text }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="ruolo">Nazionalità</label>
                <md-select v-model="nationality" id="country">
                  <md-option v-for="country in countriesList" v-bind:value="country.text">
                    {{ country.text }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="ruolo">Ruolo</label>
                <md-select v-model="roleSelected" id="ruolo">
                  <md-option v-for="role in roleList" v-bind:value="role.text">
                    {{ role.text }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33" style="padding-top:10px">
              <map-autocomplete v-if="showAddressComponent" input-component-name="gmapsdsf2" place-holder="Località attuale" :initial-address="city" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress"></map-autocomplete>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="status">Status</label>
                <md-select v-model="actualStatus" id="status">
                  <md-option v-for="status in statusList" v-bind:value="status.text">
                    {{ status.text }}
                  </md-option>
                </md-select>

              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Telefono</label>
                <md-input v-model="phoneNumber" type="number"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Peso</label>
                <md-input v-model="weigth" type="number"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Altezza</label>
                <md-input v-model="heigth" type="number"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="categoria">Categoria Attuale</label>
                <md-select v-model="lastCategory" id="categoria">
                  <md-option v-for="category in categoryList" v-bind:value="category.text">
                    {{ category.text }}
                  </md-option>
                </md-select>

              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Transfer Market Link</label>
                <md-input v-model="externalLink" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Link video</label>
                <md-input v-model="videoLink" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Nome Squadra ultimo campionato</label>
                <md-input v-model="experience1" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Nome Squadra altre esperienze</label>
                <md-input v-model="experience2" type="text" :disabled="(playerdata != null && playerdata.Experiences != null) && (playerdata.Experiences>0)"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Nome Squadra altre esperienze</label>
                <md-input v-model="experience3" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100">
              <md-field maxlength="5">
                <label>About Me</label>
                <md-textarea v-model="aboutMe"></md-textarea>
              </md-field>
            </div>

          </div>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-medium-size-100 md-size-33">
      <md-card class="md-card-profile">
        <div class="card vue-avatar-cropper-demo text-center">
          <div class="card-body" v-if="profileLoaded == true">
            <picture-box isEditable="true" v-model="playerdata.UserImageUrl" v-on:changeSource="manageImageChanged" :picType="profile"></picture-box>
          </div>
        </div>
        <md-card-content>
          <h4 class="card-title">{{name}}</h4>
          <h6 class="category text-gray">Profile</h6>
          <hr>
          <div class="text-center">
            <div class="row">
              <div class="col-lg-6">
                <h5>
                    Ruolo
                    <br><small>{{ role }}</small>
                  </h5>
              </div>
              <div class="col-lg-6">
                <h5>
                    Classe
                    <br><small>{{ yearClass }}</small>
                  </h5>
              </div>
            </div>
          </div>
        </md-card-content>

      </md-card>
    </div>
  </div>
</div>
</template>

<script>
import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
import PictureBox from '@/components/PictureBox/PictureBox'

import {
  serverBus
} from '@/main';

export default {
  components: {
    MapAutocomplete,
    PictureBox
  },
  name: 'PlayerProfileManager',
  event: 'imgChanged',
  data() {
    return {
      profileLoaded: true,
      showAddressComponent: true,
      roleList: [],
      statusList: [],
      categoryList: [],
      countriesList: [],
      classList: [],
      playerdata: {},
      imgSrc: '',
      cropImg: '',
    }
  },
  methods: {
    manageImageChanged: function(img) {
      // alert(JSON.stringify(img))
      this.playerdata.UserImageUrl = img;
    },
    setCorrectAddress: function(address) {
      this.city = address;
    },
    setInvalidAddress: function() {},
    saveProfile: function() {
      serverBus.$emit('showLoading', true);
      this.$store.dispatch('savePlayerProfile', this.playerdata).then(res => {
        serverBus.$emit('showLoading', false);
      }).catch(error => {
        // alert('Si è verificato un errore');
        serverBus.$emit('showLoading', false);
      })
    },
    //setImage(e) {
    //  const file = e.target.files[0];
    //  if (!file.type.includes('image/')) {
    //    alert('Please select an image file');
    //    return;
    //  }
    //  if (typeof FileReader === 'function') {
    //    const reader = new FileReader();
    //    reader.onload = (event) => {
    //      this.imgSrc = event.target.result;
    //      // rebuild cropperjs with the updated source
    //      this.$refs.cropper.replace(event.target.result);
    //    };
    //    reader.readAsDataURL(file);
    //  } else {
    //    alert('Sorry, FileReader API not supported');
    //  }
    //},
    //cropImage() {
    //  // get image data for post processing, e.g. upload or setting image src
    //  this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    //},
    //rotate() {
    //  // guess what this does :)
    //  this.$refs.cropper.rotate(90);
    //}
  },
  computed: {
    role: {
      get() {
        return this.playerdata != null && this.playerdata.Roles != null && this.playerdata.Roles.length > 0 ? this.playerdata.Roles[0].RoleName : '';
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
      }
    },
    profile: {
      get() {
        return (this.playerdata != null) ? this.playerdata.Profile : '';
      },
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
    externalLink: {
      get() {
        return (this.playerdata != null) ? this.playerdata.ExternalLink : '';
      },
      set(value) {
        this.playerdata.ExternalLink = value;
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
        return (this.playerdata != null && this.playerdata.Address != null) ? this.playerdata.Address.FullAddress : '';
      },
      set(value) {
        this.playerdata.Address = {
          FullAddressJson: JSON.stringify(value),
          FullAddress: value.formatted_address,
          Location: null
        };
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
    lastCategory: {
      get() {
        return (this.playerdata != null) ? this.playerdata.LastCategory : '';
      },
      set(value) {
        this.playerdata.LastCategory = value;
      }
    },
    yearClass: {
      get() {
        var returned = ''
        if (this.playerdata != null && this.playerdata.BornDate) {
          var temp = new Date(this.playerdata.BornDate);
          returned = temp.getFullYear()
        }
        return returned;
      },
      set(value) {
        if (this.playerdata.BornDate != null) {
          this.playerdata.BornDate = new Date('01/06/' + value);
        } else {
          this.playerdata.BornDate = new Date('01/01/2000');
        }
      }
    },
    roleSelected: {
      get() {
        if ((this.playerdata != null) && (this.playerdata.Roles != null) && (this.playerdata.Roles.length > 0))
          return this.playerdata.Roles[0].RoleName

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
        else return '';
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


    videoLink: {
      get() {
        if ((this.playerdata != null) && (this.playerdata.Videos != null) && (this.playerdata.Videos.length > 0))
          return this.playerdata.Videos[0].VideoUrl
        else return '';
      },
      set(value) {
        if ((this.playerdata != null) && (this.playerdata.Videos != null) && (this.playerdata.Videos.length > 0))
          return this.playerdata.Videos[0].VideoUrl = value;
        else {
          this.playerdata.Videos = [];
          this.playerdata.Videos.push({
            Id: 0,
            VideoUrl: value
          })
        }
      }
    },
    experience1: {
      get() {
        if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 0))
          return this.playerdata.Experiences[0].TeamName
        else return '';
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
          return '';
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
        else return '';
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

  created() {
    var self = this;
    this.showAddressComponent = false;

    this.$store.dispatch('getStatus', {}).then(res => {
      self.statusList = res;

    });

    self.$store.dispatch('getRoleList', {}).then(res1 => {
      self.roleList = res1;
    })
    self.$store.dispatch('getClassList', {}).then(res2 => {
      self.classList = res2;
    })
    self.$store.dispatch('getCategories', {}).then(res3 => {
      self.categoryList = res3;
    })
    this.$store.dispatch('getCountriesList', {}).then(res4 => {
      self.countriesList = res4;
    });
    this.profileLoaded = false;
    serverBus.$emit('showLoading', true);
    this.$store.dispatch('getPlayerProfile', this.$store.state.authentication.user.Id).then(res => {
      this.playerdata = res.data;
      this.profileLoaded = true;
      serverBus.$emit('showLoading', false);
    }).catch(error => {
      // alert('Si è verificato un errore');
      serverBus.$emit('showLoading', false)
    });

  },
}
</script>
<style>
.md-menu-content.md-select-menu {
  z-index: 100;
}
</style>
