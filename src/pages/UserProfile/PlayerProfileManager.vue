<template>
<div class="content">
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-100 md-size-66">
      <md-card class="dark-theme" style="overflow-y:auto">
        <md-card-content>
          <div class="md-layout" v-if="profileLoaded == true">
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Nome e Cognome</label>
                <md-input v-model="name" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="ruolo">Anno di nascita</label>
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

            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="status">Status contrattuale</label>
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
                  <md-option v-for="category in categoryList" v-bind:value="category.Value">
                    {{ category.Value }}
                  </md-option>
                </md-select>
              </md-field>

            </div>
            <!--<div class="md-layout-item md-small-size-10 md-size-10" style="padding-top:20px;padding-left:20px">
  </div>-->
            <div class="md-layout-item md-small-size-65 md-size-65" style="padding-top:18px;padding-left:18px;text-align:right">
              <map-autocomplete input-component-name="gmapsdsf2" place-holder="Località attuale" startactualpos="false" :initial-address="city" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress" style="border-bottom:1px solid lightgrey"></map-autocomplete>

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
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Ultimo campionato disputato (es: nome squadra - livello)</label>
                <md-input v-model="experience1" maxlength="26" type="text"></md-input>
              </md-field>
              <md-field>
                <label>Penultimo campionato disputato (es: nome squadra - livello)</label>
                <md-input v-model="experience2"  maxlength="26" type="text"></md-input>
              </md-field>
              <md-field>
                <label>Terzultimo campionato disputato (es: nome squadra - livello)</label>
                <md-input v-model="experience3"  maxlength="26" type="text"></md-input>
              </md-field>

            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label for="categoria">Categoria Ricerca 1</label>

                <md-select v-model="categorySearch1" id="categoria">
                  <md-option v-for="category in categoryList" v-bind:value="category.Value">

                    <!--<img :src="category.imgPath" style="width:30px;" />-->
                    {{ category.Value }}
                    <!--<div style="float:left;width:55%;font-size:14px;padding-top:5px"> {{ category.Value }} </div>-->

                  </md-option>
                </md-select>
              </md-field>
              <md-field v-show="categorySearch1 != null && categorySearch1 != ''">
                <label for="categoria">Categoria Ricerca 2</label>
                <md-select v-model="categorySearch2" id="categoria">
                  <md-option v-for="category in categoryList" v-bind:value="category.Value">
                    {{ category.Value }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field maxlength="5">
                <label>Descrizione Personale</label>
                <md-textarea v-model="aboutMe"></md-textarea>
              </md-field>
            </div>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" style="float:right" v-on:click="saveProfile()">Salva Profilo</md-button>
            <!-- <md-button class="md-raised md-success" style="float:left" v-on:click="createCard()">Crea la tua CARD</md-button> -->

          </div>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-medium-size-100 md-size-33">
      <md-card class="md-card-profile transparent-theme">
        <div class="card dark-theme vue-avatar-cropper-demo text-center">
          <div class="card-body" v-if="profileLoaded == true">
            <picture-box isEditable="true" v-model="playerdata.UserImageUrl" v-on:changeSource="manageImageChanged" :picType="profile"></picture-box>
          </div>
        </div>
        <!--<md-card-content>
    <h4 class="card-title">{{name}}</h4>
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
  </md-card-content>-->
        <a :href="previewImage" download id="lnk_photo">

          <img :src="previewImage" />
          </a>
        <md-button class="md-primary" @click="downloadImage()">
          <md-icon>
            save_alt
          </md-icon>
          download
        </md-button>
      </md-card>

    </div>
  </div>
</div>
</template>

<script>
import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
import PictureBox from '@/components/PictureBox/PictureBox'
import playerService from '@/services/playerService'
import commonService from '@/services/commonService'

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
      previewImage: null,
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
    downloadImage: function() {
      $("#lnk_photo").get(0).click()
    },
    manageImageChanged: function(img) {
      this.playerdata.UserImageUrl = img;
      this.saveProfile();
    },
    setCorrectAddress: function(address) {
      this.city = address;
    },
    setInvalidAddress: function() {},
    saveProfile: function() {
      serverBus.$emit('showLoading', true);
      if (this.categorySearch1 != null) this.playerdata.Divisions
      playerService.savePlayerProfile(this.$store.state.configurations.serviceBaseUrl, this.playerdata).then(res => {
        this.createCard();
        serverBus.$emit('showLoading', false);
      }).catch(error => {
        // alert('Si è verificato un errore');
        serverBus.$emit('showLoading', false);
      })
    },
    createCard: function() {
      var self = this;
      commonService.renderCardImage(self.$store.state.configurations.serviceBaseUrl, self.playerdata, 950, 63).then(function(canvas) {
        self.previewImage = canvas.toDataURL('image/jpeg', 0.8);
      }, function(err) {
        alert(JSON.stringify(err));
      })
    },


  },

  computed: {
    role: {
      get() {
        return this.playerdata != null && this.playerdata.Roles != null && this.playerdata.Roles.length > 0 ? this.playerdata.Roles[0].RoleName : '';
      }
    },
    //yearClass: {
    //  get() {
    //    var returned = 'not available'
    //    if (this.playerdata != null && this.playerdata.BornDate) {
    //      var temp = new Date(this.playerdata.BornDate);
    //      returned = temp.getFullYear()
    //    }
    //    return returned;
    //  },
    //  set(value) {
    //    alert('mike')
    //    if (this.playerdata != null) {
    //      var myDate = new Date(value, 1, 1, 0, 0, 0);
    //      this.playerdata.BornDate = myDate;
    //      alert('Data : '+this.playerdata.BornDate)
    //    }
    //  }
    //},
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
    categorySearch1: {
      get() {
        return (this.playerdata != null) && (this.playerdata.Divisions != null) && (this.playerdata.Divisions.length > 0) ? this.playerdata.Divisions[0].Name : this.playerdata.LastCategory
      },
      set(value) {
        if ((this.playerdata.Divisions != null) && (this.playerdata.Divisions.length > 0)) this.playerdata.Divisions[0].Name = value;
        else if ((this.playerdata.Divisions != null) && (this.playerdata.Divisions.length == 0)) this.playerdata.Divisions.push({
          Id: 0,
          Name: value
        });
      }
    },
    categorySearch2: {
      get() {
        return (this.playerdata != null) && (this.playerdata.Divisions != null) && (this.playerdata.Divisions.length > 1) ? this.playerdata.Divisions[1].Name : '';
      },
      set(value) {
        if ((this.playerdata.Divisions != null) && (this.playerdata.Divisions.length == 2)) this.playerdata.Divisions[1].Name = value;
        else if ((this.playerdata.Divisions != null) && (this.playerdata.Divisions.length == 1)) this.playerdata.Divisions.push({
          Id: 0,
          Name: value
        });
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
      
        if (this.playerdata != null) {
          this.playerdata.BornDate = new Date('01/06/' + value);
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
      res[0].text = '';
      self.statusList = res;

    });

    self.$store.dispatch('getRoleList', {}).then(res1 => {
      self.roleList = res1;
    })
    self.$store.dispatch('getClassList', {}).then(res2 => {
      res2.splice(0, 1);
      self.classList = res2;
    })
    this.categoryList = commonService.getListaCategorie();
    //self.$store.dispatch('getCategories', {}).then(res3 => {
    //  self.categoryList = res3;
    //})
    this.$store.dispatch('getCountriesList', {}).then(res4 => {
      self.countriesList = res4;
    });
    this.profileLoaded = false;
    serverBus.$emit('showLoading', true);
    playerService.getPlayerProfile(this.$store.state.configurations.serviceBaseUrl, this.$store.state.authentication.user.Id).then(res => {
      //this.$store.dispatch('getPlayerProfile', ).then(res => {
      this.playerdata = res.data;
      this.createCard();
     
      //if ((self.playerdata.Divisions != null) && (self.playerdata.Divisions.length == 0)) self.playerdata.Divisions.push({
      //  Id: 0,
      //  Name: 'Eccellenza'
      //});
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

/*@font-face {
  font-family: 'uni_sansheavy_caps';
  src: url('../../public/fonts/unisansheavy/unisansheavy-webfont.woff2') format('woff2'), url('../../public/fonts/unisansheavy/unisansheavy-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}*/

.transparent-theme {
  background-color: transparent !important;
}

.dark-theme {
  background-color: rgba(255, 255, 255, .1) !important;
}
</style>
