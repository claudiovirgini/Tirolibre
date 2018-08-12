<template>

   
    <vue-google-autocomplete ref="address" style="width:95%;float:right"
                             :id="inputComponentName"
                             v-on:keyup="keyhandler"
                             classname="form-control"
                             :placeholder="placeHolder"
                             v-on:placechanged="getAddressData"
                             types="(cities)"
                             v-bind:class="[hasError ? 'inputError' : '']"
                             country="it">
    </vue-google-autocomplete>

</template>

<script>

//import {
//  serverBus
//} from '../main';

import Vue from 'vue'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
    name: 'MapAutocomplete',
    props: ['initialAddress','placeHolder'],
  components: {
    VueGoogleAutocomplete
  },
  data() {
    return {
      _placeSelected: null,
      hasError: true,
      inputComponentName : 'inputMap_'
    }
  },
    computed: {
      placeSelected: {
        get() {
          return this._placeSelected ;
        },
        set(value) {
          if (value.length > 0) {
            this.hasError = false,
            this._placeSelected = value[0]
            this.$emit('setCorrectAddress', value[0]);
          }
        }

      }
  },
    created() {
        this.$store.dispatch('makeid').then(res => {
          this.inputComponentName = 'inputMap_' + res;
        }).catch(error => alert(error.response.data.error_description));
      if (this.initialAddress != null) {
        this.checkAddressValidity(this.initialAddress);
      }
   },
    methods: {
      keyhandler: function (event) {
        if ((event.key == 'Backspace') || (event.key == 'Delete')) {
          this._placeSelected = null;
          this.hasError = true;
          this.$emit('setInvalidAddress');
        }
        else if (event.key == 'Enter') {
          let stringPlace = $('#' + this.inputComponentName).val();
          this.checkAddressValidity(stringPlace);
        }
        event.preventDefault();
      },

      checkAddressValidity: function (address) {
        var geocoder = new google.maps.Geocoder();
        var self = this
        geocoder.geocode({ 'address': address },
          function (results, status) {
            if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
              $('#' + self.inputComponentName).val(results[0].formatted_address)
              self.placeSelected = results;
            } else {
              self._placeSelected = null;
              self.hasError = true;
              self.$emit('setInvalidAddress')
            };
        });
      },
      /**
       * When the location found
       * @param {Object} addressData Data of the found location
       * @param {Object} placeResultData PlaceResult object
       * @param {String} id Input container ID
       */
      getAddressData: function (addressData, placeResultData, id) {
        this.placeSelected = addressData;
        this.$emit('placeChanged', this.placeSelected);
      },
  }
}
</script>
<style scoped lang="scss">
  #map {
    height: auto !important;
  }
  .inputError{
    /*border : 1px solid red;
    background-color:pink*/
    /*box-shadow:2px 2px red ;*/
  }

</style>
