<template lang="html">
  <div>
    <section class="pusher" v-if="filter">
      <div class="main-header">
        <div class="container">
          <div class="row">
            <Logo />
            <div class="col-xs-12 col-md-8 mx-auto text-center shadow-lg rounded">

              <div class="what" >
                <div class="buttons">
                  <div class="switch-field"  v-bind:class="[hasErrorWhat ? 'hasErrorWhat' : '']">
                      <div class="switch-title">Sono alla ricerca di un ...</div>

                      <div id="example">
                        <carousel-3d :controls-visible="true">
                          <!-- <slide v-for="(slide, i) in slides" :index="i">
                            <img src="https://placehold.it/360x270">
                          </slide> -->
                          <slide :index="0">
                            <div class="switch-content player form-check form-check-inline">
                            <input type="radio" id="switch_4_left" name="what" value="calciatore" class="form-check-input" @click="selectItem" v-model="what" checked />
                            <label class="player" for="switch_4_left">calciatore</label>
                          </div>
                         </slide>
                         <slide :index="1">
                         <div class="switch-content club form-check form-check-inline">
                           <input type="radio" id="switch_4_center" name="what" value="CLUB" class="form-check-input" @click="selectItem" v-model="what" />
                           <label class="club" for="switch_4_center">club</label>
                         </div>
                         </slide>
                         <slide :index="2">
                         <div class="switch-content agent form-check form-check-inline">
                           <input type="radio" id="switch_4_right" name="what" value="agente" class="form-check-input" @click="selectItem" v-model="what" />
                           <label class="agent" for="switch_4_right">agente</label>
                         </div>
                         </slide>
                        </carousel-3d>
                      </div>
                  </div>
                </div>
              </div>
              <div class="where">
                <div class="">
                  <md-field class="col-md-6 mx-auto" v-bind:class="[hasErrorWhere ? 'hasErrorWhat' : '']">
                     <label for="where" class="label-autocomplete">In che zona cerchi?</label>
                    <map-autocomplete id="where" input-component-name="gmap2" class="col-12" place-holder="Dove stai cercando" startactualpos="true" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress"></map-autocomplete>
                  </md-field>
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-6 mx-auto">
                  <md-button @click="findUsers" class="md-success btn btn-success btn-lg btn-block btn-radius">
                    Inizia
                      <!-- <i class="md-icon md-icon-font material-icons md-theme-default">arrow_forward_ios</i> -->
                  </md-button>
                  <!-- <button type="button" @click="findUsers"  class="btn btn-outline-success btn-lg btn-block">Inizia <i class="fa fa-chevron-circle-right"></i></button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- result -->
    <result v-if="cardResult" :what='what' :who='who' :place="placeSelected" />
    <!-- /.result -->

    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import Logo from '@/components/Logo'
import Result from '@/pages/Home/Result.vue'
import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
import Footer from '@/components/Footer'
import {
  Carousel3d,
  Slide
} from 'vue-carousel-3d'
import {
  fail
} from 'assert';

//import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  name: 'Home',
  components: {
    Logo,
    Result,
    MapAutocomplete,
    Carousel3d,
    Slide,
    Footer
  },
  data() {
    return {
      what: '',
      who: '',
      cardResult: false,
      filter: true,
      isValidAddress: null,
      hasErrorWhere: false,
      hasErrorWhat  : false,
      placeSelected : null,
      newPos        : null,
      slides: 3
    }
  },
  computed: {


  },
  mounted() {
    //this.$refs.address.focus();
  },
  methods: {
    selectItem: function() {
      this.hasErrorWhat = false;
    },
    setCorrectAddress: function(place) {
      this.isValidAddress = true;
      this.hasErrorWhere = false;
      this.placeSelected = place
    },
    setInvalidAddress: function() {
      this.isValidAddress = false;
      this.hasErrorWhere = true;
      this._placeSelected = null;
      //alert('INVALID')
    },
    findUsers: function() {
      if ((!this.isValidAddress) || (this.isValidAddress == null) || (this.what == null) || (this.what == '')) {
        if ((!this.isValidAddress) || (this.isValidAddress == null)) {
          this.hasErrorWhere = true;
        }
        if ((this.what == null) || (this.what == '')) this.hasErrorWhat = true;
      } else {
        this.error = null
        this.filter = false
        //this.newPos = {
        //  lat: value.geometry.location.lat(),
        //  lng: value.geometry.location.lng()
        //};
        this.cardResult = true
      }

    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.carousel-3d-slide {
    text-align: center;
    background-color: #303F9F;
    background-image: url("../../assets/images/bg-footer.jpg");
}
.hasErrorWhat {
    border: 2px red solid;
    border-radius: 5px;
}
#map {
    height: auto !important;
}

.pusher {
    background-image: url("../../assets/images/bg-footer.jpg");
    background-repeat: no-repeat;
    background-position: 50% 300px;
    background-size: cover;
    min-height: 100vh;
}
.main-header {
    width: 100%;
    // background-color: #d7e5e8;
    background-color: #FFF;
    // background-image: url("https://www.higuests.com/assets/images/alfred_001.png");
    // background-image: url("../../assets/images/logo-footer.png");

    background-image: url("../../assets/images/black-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    padding-bottom: 220px;
    border-radius: 0 0 9000px 6000px /1500px;
    min-height: 600px;
    overflow: hidden;
    box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
    &:before {
        // content: "";
        position: absolute;
        z-index: 999;
        left: 0;
        top: 300px;
        right: 0;
        bottom: 0;
        background-image: url("../../assets/images/logo-footer.png");
        background-repeat: no-repeat;
        background-position: bottom;
        background-size: 200px auto;
    }
}
// .switch-field input:checked+label {
.switch-field label {
    position: relative;
}
// .switch-field input:checked+label:before {
.switch-field label:before {
    content: '';
    width: 100%;
    height: 100px;
    left: 0;
    right: 0;
    position: absolute;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    bottom: 40px;
}

.switch-content {
    top: 50%;
    height: 20px;
    // margin-bottom: 50px;
    // margin-top: 80px;
    padding-bottom: 0;
    padding-top: 40px;
    border-radius: 5px;
    box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
}

.switch-field,
.switch-field-input {
    padding: 10px 0;
    overflow: hidden;
    label {
        margin: 15px 30px;
    }
}

.switch-content-input {
    margin-top: 20px;
    input {
        border-radius: 50px;
        // border: 2px solid #01a084;
        // margin-left: 60px;
        background-color: #FFF;
        padding: 10px;
        width: 40%;
        border: 1px solid #F1EAE0;
    }
    button {
        background: #01a084;
        border: 2px solid #01a084;
        color: #FFF;
    }
}

.switch-title {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    text-transform: uppercase;
    padding: 10px;
    color: #aaa !important;
}

.who {
    .switch-content {
        background: #c0d6bb;
        label {
            &:before {
                background-color: #FFF;
                padding: 5px;
                border-radius: 10px;
                border: 2px solid #178501;
            }
            &:hover {
                background-color: #178501;
                color: #FFF;
            }
        }
    }
    .switch-content.player {
        label {
            &:before {
                background-image: url("../../assets/images/player.png");
            }
        }
    }
    .switch-content.club {
        label {
            &:before {
                background-image: url("../../assets/images/club.png");
            }
        }
    }
    .switch-content.agent {
        label {
            &:before {
                background-image: url("../../assets/images/agent.png");
            }
        }
    }
    .switch-title {
        color: #168600;
    }

    .switch-field input:checked + label {
        // background-color: #1376db;
        background-color: #178501;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .switch-field {
        label {
            background-color: #FFF;
            color: #168600;
            text-transform: uppercase;
            min-width: 120px;
        }
    }
}
.what {
    .switch-content {
        // background-color: rgba(24,133,2,.3);
        label {
            &:before {
                background-color: #FFF;
                padding: 5px;
                border-radius: 10px;
                border: 1px solid #1057a0;
            }
            &:hover {
                background-color: #1057a0;
                color: #FFF;
            }
        }
        label.player {
            &:before {
                border: 1px solid #178501;
            }
            &:hover {
                background-color: #178501;
            }
        }
        label.club {
            &:before {
                border: 1px solid #1057a0;
            }
            &:hover {
                background-color: #1057a0;
            }
        }
        label.agent {
            &:before {
                border: 1px solid #ffa000;
            }
            &:hover {
                background-color: #ffa000;
            }
        }
    }
    .switch-content.player {
        label {
            &:before {
                background-image: url("../../assets/images/player.png");
            }
        }
    }
    .switch-content.club {
        label {
            &:before {
                background-image: url("../../assets/images/club.png");
            }
        }
    }
    .switch-content.agent {
        label {
            &:before {
                background-image: url("../../assets/images/agent.png");
            }
        }
    }
    .switch-title {
        // color: #1057a0;
        color: #FFF;
    }

    .switch-field input:checked + label {
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .switch-field input:checked + label.player {
        background-color: #178501;
    }
    .switch-field input:checked + label.club {
        background-color: #1057a0;
    }
    .switch-field input:checked + label.agent {
        background-color: #ffa000;
    }
    .switch-field {
        label {
            background-color: #FFF;
            color: #212121;
            text-transform: uppercase;
            min-width: 120px;
        }
    }
}
.where {
    .md-field {
        // background-color: #4b5a65;
        padding: 20px;
        border-radius: 10px;
    }
    .switch-title {
        color: #01a084;
    }
    label {
        left: 40px;
        top: -5px;
    }
}

.switch-field input {
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    border: 0;
    overflow: hidden;
}

.switch-field label {
    float: left;
}

.switch-field label {
    display: inline-block;
    width: auto;
    background-color: #e4e4e4;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    text-shadow: none;
    padding: 6px 14px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    -o-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
}

.switch-field label:hover {
    cursor: pointer;
}

.switch-field input:checked + label {
    background-color: #168600;
    color: #FFF;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.switch-field label:first-of-type {
    border-radius: 4px 0 0 4px;
}

.switch-field label:last-of-type {
    border-radius: 0 4px 4px 0;
}

h1 {
    text-transform: uppercase;
    font-size: 2.5rem;
    color: #374052;
    span {
        // color: #acd07a;
        color: #FFF;
        font-weight: bold;
    }
}
/*------------------
	Responsive
---------------------*/
@media (min-width: 1200px) {
    .container {
        max-width: 1170px;
    }
}
/* Large Mobile :480px. */
@media only screen and (max-width: 767px) {
    .carousel-3d-slide {
        width: 80% !important;
        left: 10%;
    }
    .switch-field label {
        float: none;
    }
    .switch-field label:before {
        // top: -40px;
        // left: 150px;
    }
    .form-check-inline {
        display: block;
        input {
            margin: 40px 0;
        }
        label {
            margin: -40px 0;
        }
    }
    h1 {
        span {
            color: #acd07a;
        }
    }
    .link {
        font-size: 2em;
    }

}
</style>
