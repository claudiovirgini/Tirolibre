<template>
<div class="content">
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-100 md-size-66">
      <md-card>
        <md-card-header data-background-color="yellow">
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

            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Classe</label>
                <md-input v-model="yearClass" type="number"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <map-autocomplete place-holder="Dove ti Trovi" input-component-name="gmap1" :initial-address="city" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress"></map-autocomplete>
                <!--<map-autocomplete place-holder="Dove ti trovi"                              :initial-address="city" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress"></map-autocomplete>-->
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Status</label>
                <md-input v-model="actualStatus" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Telefono</label>
                <md-input v-model="phoneNumber" type="number"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100">
              <md-field maxlength="5">
                <label>Biografy</label>
                <md-textarea v-model="biografy"></md-textarea>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100 text-right">
              <md-button class="md-raised md-success" v-on:click="saveProfile()">Aggiorna Profilo</md-button>
            </div>
          </div>

        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-medium-size-100 md-size-33">
      <md-card class="md-card-profile">
        <div class="card vue-avatar-cropper-demo text-center">
          <div class="card-body" v-if="profileLoaded == true">
            <picture-box isEditable="true" v-model="agentdata.UserImageUrl" v-on:changeSource="manageImageChanged" :picType="agentdata.Profile"></picture-box>
          </div>
        </div>
          <md-card-content>
            <h4 class="card-title">{{ name}}</h4>
            <h6 class="category text-gray">{{ profile }}</h6>
          </md-card-content>
      </md-card>
    </div>
  </div>
</div>
</template>

<script>
  import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
  import PictureBox from '@/components/PictureBox/PictureBox'

import AgentCard from '@/pages/AgentProfile/AgentCard.vue'
import {
  serverBus
} from '@/main';

export default {
  components: {
    MapAutocomplete,
    PictureBox
  },
  name: 'AgentProfileManager',
  data() {
    return {
      profileLoaded: true,
      agentdata: {},
      profileLoaded: false
    }
  },
    methods: {
      manageImageChanged: function (img) {
        this.agentdata.UserImageUrl = img;
      },
      setCorrectAddress: function (address) {
        this.city = address;
      },
      setInvalidAddress: function () { },
      saveProfile: function () {
        serverBus.$emit('showLoading', true);
        this.$store.dispatch('saveAgentProfile', this.agentdata).then(res => {
          serverBus.$emit('showLoading', false);
        }).catch(error => {
          alert('Si è verificato un errore');
          serverBus.$emit('showLoading', false);
        })
      },
    },
    computed: {
      name: {
        get() {
          return (this.agentdata != null) ? this.agentdata.Name : '';
        },
        set(value) {
          this.agentdata.Name = value;
        }
      },
      biografy: {
        get() {
          return (this.agentdata != null) ? this.agentdata.Biografy : '';
        },
        set(value) {
          this.agentdata.Biografy = value;
        }
      },
      actualStatus: {
        get() {
          return (this.agentdata != null) ? this.agentdata.ActualStatus : '';
        },
        set(value) {
          this.agentdata.ActualStatus = value;
        }
      },
      city: {
        get() {
          return (this.agentdata != null && this.agentdata.Address != null) ? this.agentdata.Address.FullAddress : '';
        },
        set(value) {
          this.agentdata.Address = {
            FullAddressJson: JSON.stringify(value),
            FullAddress: value.formatted_address,
            Location: null
          };
        }
      },
      phoneNumber: {
        get() {
          return (this.agentdata != null) ? this.agentdata.PhoneNumber : '';
        },
        set(value) {
          this.agentdata.PhoneNumber = value;
        }
      },

    },
  mounted() {
    this.profileLoaded = false;

    serverBus.$emit('showLoading', true);
    this.$store.dispatch('getAgentProfile', this.$store.state.authentication.user.Id).then(res => {
      this.agentdata = res.data;
      this.profileLoaded = true;
      serverBus.$emit('showLoading', false);
    }).catch(error => {
      alert('Si è verificato un errore');
      serverBus.$emit('showLoading', false)
    });
  }
}
</script>
