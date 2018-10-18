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
        <!--<div class="md-layout-item md-small-size-100 md-size-50">
          <md-field>
            <label>Cognome</label>
            <md-input v-model="surname" type="text"></md-input>
          </md-field>
        </div>-->
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Classe</label>
            <md-input v-model="yearClass" type="number"></md-input>
          </md-field>
        </div>
        <!--<div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Nazionalità</label>
            <md-input v-model="nationality"  type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Ruolo</label>
            <md-input v-model="roleSelected" type="text"></md-input>
          </md-field>
        </div>-->
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <!--<label>Dove ti Trovi</label>-->
            <map-autocomplete place-holder="Dove ti trovi" :initial-address="city" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress"></map-autocomplete>

            <!--<md-input v-model="city" type="text"></md-input>-->
          </md-field>
        </div>
        <!--<div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Dove Cerchi</label>
            <md-input v-model="researchPlace" type="text"></md-input>
          </md-field>
        </div>-->
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
        <!--<div class="md-layout-item md-small-size-100 md-size-33">
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
        </div>-->
        <!--<div class="md-layout-item md-small-size-100 md-size-33">
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
        </div>-->
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
</form>
</template>
<script>
import {
  serverBus
} from '@/main';

import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
export default {
  name: 'AgentProfileForm',
  components: {
    MapAutocomplete
  },
  props: {
    agentdata: {
      type: Object
    },
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },

  methods: {
    setCorrectAddress: function(address) {
      this.city = address;
    },
    setInvalidAddress: function() {},
    saveProfile: function() {
      serverBus.$emit('showLoading', true);
      this.$store.dispatch('saveAgentProfile', this.agentdata).then(res => {
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

  }

}
</script>
<style>

</style>
