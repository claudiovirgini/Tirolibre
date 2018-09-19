<template>
  <div class="content">
    <div class="md-layout"  v-if="profileIsLoaded">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <!--<form>-->
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">Aggiorna Profilo</h4>
              <p class="category">Completa il tuo profilo</p>
            </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Nome</label>
                    <md-input v-model="name" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <map-autocomplete place-holder="Dove ti Trovi" :initial-address="city" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress"></map-autocomplete>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label for="year">Anno Fondazione</label>
                    <md-select v-model="foundation" id="year">
                      <md-option v-for="year in yearList" v-bind:value="year">
                        {{ year }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label>Web Site</label>
                    <md-input v-model="website" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Facebook</label>
                    <md-input v-model="facebook" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Twitter</label>
                    <md-input v-model="twitter" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>LinkedIn</label>
                    <md-input v-model="linkedin" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Telefono</label>
                    <md-input v-model="contactPhone" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Cellulare</label>
                    <md-input v-model="contactCell" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Mail Alernativa</label>
                    <md-input v-model="contactEmail" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label for="casftegory">Category</label>
                    <md-select v-model="cat" id="casftegory">
                      <md-option v-for="myCat in categoryList" v-bind:value="myCat.value">
                        {{ myCat.text }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <map-autocomplete place-holder="Indirizzo Stadio" :initial-address="stadiumAddress" v-on:setCorrectAddress="setCorrectAddressStadium" v-on:setInvalidAddress="setInvalidAddressStadium"></map-autocomplete>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 text-right">
                  <md-button class="md-raised md-success" v-on:click="saveProfile()">Aggiorna Profilo</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        <!--</form>-->
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <md-card class="md-card-profile">
          <div class="md-card-avatar">
            <picture-box :picUrl="imagefile" :picType="1"></picture-box>
            <!--<img class="img" :src="imagefile">-->
          </div>
          <md-card-content>
            <h4 class="card-title">{{name}}</h4>
            <h6 class="category text-gray">{{catName}}</h6>
          </md-card-content>

        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
  import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
  import PictureBox from '@/components/PictureBox/PictureBox'

import { serverBus } from '@/main';

  export default {
    components: {
      MapAutocomplete,
      PictureBox

    },
    data() {
      return {
        yearList: [],
        categoryList: [],
        teamdata: {},
        profileIsLoaded : false
      }
    },
    props: {
      dataBackgroundColor: {
        type: String,
        default: ''
      }
    },
    mounted() {
      var self = this;
      var currentYear = (new Date).getFullYear();
      for (var i = 0; i < 200; i++) {
        this.yearList.push(currentYear - i)
      }
      serverBus.$emit('showLoading', true);
      this.$store.dispatch('getCategories', {}).then(listCategories => {
        self.categoryList = listCategories;
        this.$store.dispatch('getTeamProfile', this.$store.state.authentication.user.Id).then(res => {
          self.teamdata = res.data;
          self.profileIsLoaded = true;
          serverBus.$emit('showLoading', false);
        })
      }).catch(error => { alert('Si è verificato un errore'); serverBus.$emit('showLoading', false) });
    },
    methods: {
      setCorrectAddress: function (address) {
        this.city = address;
      },
      setInvalidAddress: function () { },
      setCorrectAddressStadium: function (address) {
        this.stadiumAddress = address;
      },
      setInvalidAddressStadium: function () { },
      saveProfile: function () {
        serverBus.$emit('showLoading', true);
        this.$store.dispatch('saveTeamProfile', this.teamdata).then(res => {
          serverBus.$emit('showLoading', false);
          // alert('Salvataggio OK')
        }).catch(error => {
          alert('Si è verificato un errore');
          serverBus.$emit('showLoading', false);
        })
      },
    },
    computed: {
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
            var temp = this.categoryList.filter(function (x) { return x.value == catId});
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
          if (this.teamdata.StadiumInfos == null) this.teamdata.StadiumInfos = {StadiumAddress: {}, StadiumName:''}
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
          if (this.teamdata.Contact == null) this.teamdata.Contact = { Phone: '', Mobile: '', Email: '' }
          this.teamdata.Contact.Mobile = value;
        }
      },
      contactPhone: {
        get() {
          return (this.teamdata != null && this.teamdata.Contact != null) ? this.teamdata.Contact.Phone : '';
        },
        set(value) {
          if (this.teamdata.Contact == null) this.teamdata.Contact = { Phone: '', Mobile: '', Email: '' }
          this.teamdata.Contact.Phone = value;
        }
      },
      contactEmail: {
        get() {
          return (this.teamdata != null && this.teamdata.Contact != null) ? this.teamdata.Contact.Email : '';
        },
        set(value) {
          if (this.teamdata.Contact == null) this.teamdata.Contact = { Phone: '', Mobile: '', Email: '' }
          this.teamdata.Contact.Email = value;
        }
      },
      linkedin: {
        get() {
          return (this.teamdata != null && this.teamdata.Social != null) ? this.teamdata.Social.LinkedInUrl : '';
        },
        set(value) {
          if (this.teamdata.Social == null) this.teamdata.Social = { LinkedInUrl: '', TwitterUrl: '', WebSiteUrl: '', FacebookUrl: '' }
          this.teamdata.Social.LinkedInUrl = value;
        }
      },
      twitter: {
        get() {
          return (this.teamdata != null && this.teamdata.Social != null) ? this.teamdata.Social.TwitterUrl : '';
        },
        set(value) {
          if (this.teamdata.Social == null) this.teamdata.Social = { LinkedInUrl: '', TwitterUrl: '', WebSiteUrl: '', FacebookUrl: '' }
          this.teamdata.Social.TwitterUrl = value;
        }
      },
      website: {
        get() {
          return (this.teamdata != null && this.teamdata.Social != null) ? this.teamdata.Social.WebSiteUrl : '';
        },
        set(value) {
          if (this.teamdata.Social == null) this.teamdata.Social = { LinkedInUrl: '', TwitterUrl: '', WebSiteUrl: '', FacebookUrl: '' }
          this.teamdata.Social.WebSiteUrl = value;
        }
      },
      facebook: {
        get() {
          return (this.teamdata != null && this.teamdata.Social != null) ? this.teamdata.Social.FacebookUrl : '';
        },
        set(value) {
          if (this.teamdata.Social == null) this.teamdata.Social = { LinkedInUrl: '', TwitterUrl: '', WebSiteUrl: '', FacebookUrl: '' }
          this.teamdata.Social.FacebookUrl = value;
        }
      },
    },
  }
</script>
