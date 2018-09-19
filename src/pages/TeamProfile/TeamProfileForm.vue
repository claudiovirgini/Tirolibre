<template>
<form>
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
        <div class="md-layout-item md-size-100 text-right">
          <md-button class="md-raised md-success" v-on:click="saveProfile()">Aggiorna Profilo</md-button>
        </div>
      </div>
    </md-card-content>
  </md-card>
</form>
</template>
<script>
import {
  serverBus
} from '@/main';

import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
export default {
  name: 'TeamProfileForm',
  components: {
    MapAutocomplete
    },
    data() {
      return {
        yearList: [],
        categoryList : [],
        teamdata: {}
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
            serverBus.$emit('showLoading', false);
        })
      }).catch(error => { alert('Si è verificato un errore'); serverBus.$emit('showLoading', false) });
    },
    methods: {
    setCorrectAddress: function(address) {
      this.city = address;
    },
    setInvalidAddress: function() {},
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
        return (this.teamdata != null && this.teamdata.Social != null)  ? this.teamdata.Social.LinkedInUrl : '';
      },
      set(value) {
        if (this.teamdata.Social == null) this.teamdata.Social = { LinkedInUrl: '', TwitterUrl: '', WebSiteUrl: '', FacebookUrl:''}
        this.teamdata.Social.LinkedInUrl = value;
      }
    },
    twitter: {
      get() {
        return (this.teamdata != null && this.teamdata.Social != null)  ? this.teamdata.Social.TwitterUrl : '';
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
        return (this.teamdata != null && this.teamdata.Social != null)  ? this.teamdata.Social.FacebookUrl : '';
      },
      set(value) {
        if (this.teamdata.Social == null) this.teamdata.Social = { LinkedInUrl: '', TwitterUrl: '', WebSiteUrl: '', FacebookUrl: '' }
        this.teamdata.Social.FacebookUrl = value;
      }
    },
  },
}
</script>
<style>

</style>
