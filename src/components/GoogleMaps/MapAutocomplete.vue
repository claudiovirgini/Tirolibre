<template>
<!--<div>-->
<div class="inputWithIcon inputIconBg">
  <div>
    <vue-google-autocomplete ref="address" style="border : 0 solid black" :id="inputComponentName" v-on:keyup="keyhandler" :placeholder="placeHolder" v-on:placechanged="getAddressData" types="(cities)" country="it">
    </vue-google-autocomplete>
    <i class="fa fa-map-marker fa-lg fa-fw" aria-hidden="true" style="height:36px;cursor:pointer" @click="findMyPosition"></i>
  </div>
</div>
</template>

<script>
//import {
//  serverBus
//} from '../main';

import Vue from 'vue'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import axios from 'axios'
import {
  setTimeout
} from 'timers';
export default {
  name: 'MapAutocomplete',
  props: ['initialAddress', 'placeHolder', 'startactualpos', 'inputComponentName'],
  components: {
    VueGoogleAutocomplete
  },
  data() {
    return {
      _placeSelected: null,
      hasError: true,
      //inputComponentName: 'inputMap_',
      _initialAddress: this.initialAddress
    }
  },

  computed: {
    InitialAddress: {
      get() {
        return this._initialAddress;
      },
      set(value) {
        if (value.length > 0) {
          this.hasError = false,
            this._placeSelected = value[0]
          this.$emit('setCorrectAddress', value[0]);
        }
      }

    },
    placeSelected: {
      get() {
        return this._placeSelected;
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
    //this.$store.dispatch('makeid').then(res => {
    //  this.inputComponentName = 'inputMap_' + res;

    //}).catch(error => alert(error.response.data.error_description));

  },
  mounted() {
    if (this.startactualpos == "true") {
      this.findMyPosition()
    } else {
      if (this.initialAddress != null) {
        this.checkAddressValidity(this.initialAddress);
      }
    }
  },
  methods: {
    keyhandler: function(event) {

      if ((event.key == 'Backspace') || (event.key == 'Delete')) {
        this._placeSelected = null;
        this.hasError = true;
        this.$emit('setInvalidAddress');
      } else if (event.key == 'Enter') {
        let stringPlace = $('#' + this.inputComponentName).val();
        this.checkAddressValidity(stringPlace);
      }

      event.preventDefault();
    },

    checkAddressValidity: function(address) {
      var geocoder = new google.maps.Geocoder();
      var self = this
      geocoder.geocode({
          'address': address
        },
        function(results, status) {
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

    getAddressData: function(addressData, placeResultData, id) {
      this.checkAddressValidity(addressData.locality);
      this.$emit('placeChanged', this.placeSelected);
    },
    findMyPosition: function() {

      var self = this;
      axios.post('http://ip-api.com/json')
        .then(res => {
          self.actualPos = {
            lat: res.data.lat,
            lng: res.data.lon
          };
          this.checkAddressValidity(res.data.city);
        })
      // .catch(error => alert('Request failed.  Returned status of', status));
    },
  }
}
</script>
<style scoped lang="scss">
#map {
    height: auto !important;
}
.inputError {
    /*border : 1px solid red;
    background-color:pink*/
    /*box-shadow:2px 2px red ;*/
}

/*.form-control {
    background-color: #FFF;
    background-image: none;
}*/
input[type=text] {
    width: 100%;
    /*border: 2px solid #aaa;
    border-radius: 4px;*/
    /*margin: 8px 0;*/
    outline: none;
    padding: 8px 0 8px 30px;
    /*box-sizing: border-box;*/
    transition: 0.3s;
}

/*input[type=text]:focus {
    border-color: dodgerBlue;
    box-shadow: 0 0 8px 0 dodgerBlue;
}

.inputWithIcon input[type=text] {
    padding-left: 40px;
}*/

.inputWithIcon {
    position: relative;
}

.inputWithIcon i {
    position: absolute;
    left: -10px;
    top: 10px;
    /*padding: 9px 8px;*/
    color: #aaa;
    transition: 0.3s;
}

/*.inputWithIcon input[type=text]:focus + i {
    color: dodgerBlue;
}

.inputWithIcon.inputIconBg i {
    background-color: #aaa;
    color: #fff;
    padding: 9px 4px;
    border-radius: 4px 0 0 4px;
}*/

/*.inputWithIcon.inputIconBg input[type=text]:focus + i {
    color: #fff;
    background-color: dodgerBlue;
}*/
</style>
