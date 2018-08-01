<template lang="html">
  <div>
    <section class="pusher" v-if="filter">
      <div class="main-header">
        <div class="container">
          <div class="row">
            <Logo />
            <div class="col-md-12 text-center">
              <div class="type">
                  <!-- I'm a ... -->
                  <div class="buttons">
                    <!-- <form class="form"> -->
                      <div class="switch-field">
                        <div class="switch-title">-Io sono-</div>
                        <div class="switch-content player form-check form-check-inline">
                            <input type="radio" id="switch_3_left" name="who" value="who-calciatore" class="form-check-input" checked/>
                            <label for="switch_3_left" class="calciatore form-check-label">calciatore</label>
                        </div>
                        <div class="switch-content club form-check form-check-inline">
                          <input type="radio" id="switch_3_center" name="who" value="who-team" class="form-check-input" />
                          <label for="switch_3_center" class="calciatore form-check-label">team</label>
                        </div>
                        <div class="switch-content agent form-check form-check-inline">
                    			<input type="radio" id="switch_3_right" name="who" value="who-agente" class="form-check-input" />
                          <label for="switch_3_right" class="calciatore form-check-label">agente</label>
                        </div>
                      </div>
                  <!-- </form> -->
                  </div>
                </div>
                <div class="what">
                  <div class="buttons">
                    <div class="switch-field">
                      <div class="switch-title">-cerco-</div>
                      <div class="switch-content player form-check form-check-inline">
                        <input type="radio" id="switch_4_left" name="what" value="calciatore" class="form-check-input" v-model="what" checked/>
                        <label for="switch_4_left">calciatore</label>
                      </div>
                      <div class="switch-content club form-check form-check-inline">
                        <input type="radio" id="switch_4_center" name="what" value="team" class="form-check-input" v-model="what" />
                        <label for="switch_4_center">team</label>
                      </div>
                      <div class="switch-content agent form-check form-check-inline">
                        <input type="radio" id="switch_4_right" name="what" value="agente" class="form-check-input"  v-model="what" />
                        <label for="switch_4_right">agente</label>
                      </div>
                    </div>
                  </div>
                </div>

              <md-field class="col-md-6 mx-auto">
                 <md-icon>location_on</md-icon>
                 <label>Dove sto cercando</label>
                 <md-input v-model="where"></md-input>
               </md-field>
                <!-- <div class="where">
                  <div class="buttons">
                    <div class="switch-field-input">
                      <div class="switch-title">-dove sto cercando-</div>
                      <div class="switch-content-input form-group">
                        <label for="where" class="sr-only">Password</label>
                        <input type="text" name="where" id="where" class="form-control mx-auto" v-model="where" placeholder="dove sto cercando">
                      </div>
                    </div>
                  </div>
                </div> -->
              <!-- <hr> -->
              <div class="form-group">
                <div class="col-md-6 mx-auto">
                  <button type="button" @click="userList" class="btn btn-outline-success btn-lg btn-block">Inizia <i class="fa fa-chevron-circle-right"></i></button>
                    <!-- <a href="http://www.tirolibre.it" class="btn btn-outline-success btn-lg btn-block">Inizia <i class="fas fa-chevron-circle-right"></i></a> -->
                </div>
              </div>


              <!-- <span>Picked: {{ what }} // {{ where }}</span>
              <hr>
              Vuex store value: {{ $store.state.what }} // {{ $store.state.where }}
              <br>
              Computed property value: {{ what }} // {{ where }} -->

            </div>
            <!-- <div class="col-md-6"> -->

              <!-- <h1 v-on:click="changeTitle">TEST: {{ title }}</h1> -->
              <!-- <img src="../assets/images/01.jpg" class="float-left m-3" alt="TiroLibre" width="250px">
                              <img src="../assets/images/02.png" class="float-right m-3" alt="TiroLibre" width="250px">
                  <img src="../assets/images/05.jpg" class="float-left m-3" alt="TiroLibre" width="250px"> -->
              <!-- <img src="../assets/images/icoTiroLibre.png" class="" alt="TiroLibre"> -->
            <!-- </div> -->
          </div>
        </div>
    </div>
    </section>

    <!-- <Process />
    <Fact />
    <Review />
    <Footer /> -->

  <!-- result -->
  <result v-if="cardResult" :what="what" :where="where" />
  <!-- /.result -->
</div>
</template>

<script>
import axios from 'axios'
import Logo from '@/components/Logo'
import Result from './Result'
// import Process from '@/components/Process'
// import Fact from '@/components/Fact'
// import Review from '@/components/Review'
// import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: {
    Logo,
    Result
    // Process,
    // Fact,
    // Review,
    // Footer
  },
  data() {
    return {
      // what: '',
      cardResult: false,
      filter: true
    }
  },
  computed: {
    what: {
      get() {
        return this.$store.state.what;
      },
      set(value) {
        this.$store.commit("SET_WHAT", value);
      }
    },
    where: {
      get() {
        return this.$store.state.where;
      },
      set(value) {
        this.$store.commit("SET_WHERE", value);
      }
    },
    filteredCustomers: function() {
      const {
        // what,
        where
      } = this;
      return this.users
        .filter(card => card.profile === what)
      // || card.where === where
    }
  },
  methods: {
    userList: function() {
      console.log("userList");
      console.log("store: " + this.$store.state.what);
      console.log("store: " + this.$store.state.where);
      this.error = null
      this.filter = false
      this.cardResult = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pusher {
    background-image: url("../assets/images/bg-footer.jpg");
    background-repeat: no-repeat;
    background-position: 50% 300px;
    background-size: cover;
    min-height: 100vh;
}
.main-header {
    // background-color: #d7e5e8;
    background-color: #FFF;
    // background-image: url("https://www.higuests.com/assets/images/alfred_001.png");
    background-image: url("../assets/images/logo-footer.png");
    background-repeat: no-repeat;
    background-position: 50% 110%;
    background-size: 200px auto;
    padding-bottom: 220px;
    border-radius: 0 0 9000px 6000px /1500px;
    min-height: 600px;
    overflow: hidden;
    box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
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
    height: 20px;
    margin-bottom: 50px;
    margin-top: 80px;
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
    font-size: 22px;
    text-transform: uppercase;
    padding: 20px;
}
.type {
    .switch-content {
        background: #c0d6bb;
        label {
            &:before {
                background-color: #FFF;
                padding: 5px;
                border-radius: 10px;
                border: 2px solid #178501;
            }
        }
    }
    .switch-content.player {
        label {
            &:before {
                background-image: url("../assets/images/player.png");
            }
        }
    }
    .switch-content.club {
        label {
            &:before {
                background-image: url("../assets/images/club.png");
            }
        }
    }
    .switch-content.agent {
        label {
            &:before {
                background-image: url("../assets/images/agent.png");
            }
        }
    }
    .switch-title {
        color: #168600;
    }
    .switch-field {
        label {
            // background-color: #168600;
            background-color: #FFF;
            color: #168600;
            text-transform: uppercase;
            min-width: 120px;
            // &:first-of-type {
            //     &:before {
            //         background-image: url("../assets/images/player.png");
            //         background-color: #FFF;
            //         padding: 5px;
            //         border-radius: 10px;
            //         border: 2px solid #168600;
            //     }
            // }
            // &:last-of-type {
            //     &:before {
            //         background-image: url("../assets/images/agent.png");
            //         background-color: #FFF;
            //         padding: 5px;
            //         border-radius: 10px;
            //         border: 2px solid #168600;
            //     }
            // }
            // &:before {
            //     background-image: url("../assets/images/club.png");
            //     background-color: #FFF;
            //     padding: 5px;
            //     border-radius: 10px;
            //     border: 2px solid #168600;
            // }
        }
    }
}
.what {
    .switch-content {
        background: #bcd0e5;
        label {
            &:before {
                background-color: #FFF;
                padding: 5px;
                border-radius: 10px;
                border: 2px solid #178501;
            }
            &:hover {
                background-color: #1057a0;
                color: #FFF;
            }
        }
    }
    .switch-content.player {
        label {
            &:before {
                background-image: url("../assets/images/player.png");
            }
        }
    }
    .switch-content.club {
        label {
            &:before {
                background-image: url("../assets/images/club.png");
            }
        }
    }
    .switch-content.agent {
        label {
            &:before {
                background-image: url("../assets/images/agent.png");
            }
        }
    }
    .switch-title {
        color: #1057a0;
    }

    .switch-field input:checked + label {
        // background-color: #1376db;
        background-color: #1057a0;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .switch-field {
        label {
            background-color: #FFF;
            color: #1057a0;
            text-transform: uppercase;
            min-width: 120px;
            // &:first-of-type {
            //     &:before {
            //         background-image: url("../assets/images/player.png");
            //         background-color: #FFF;
            //         padding: 5px;
            //         border-radius: 10px;
            //         border: 2px solid #1057a0;
            //     }
            // }
            // &:last-of-type {
            //     &:before {
            //         background-image: url("../assets/images/agent.png");
            //         background-color: #FFF;
            //         padding: 5px;
            //         border-radius: 10px;
            //         border: 2px solid #1057a0;
            //     }
            // }
            // &:before {
            //     background-image: url("../assets/images/club.png");
            //     background-color: #FFF;
            //     padding: 5px;
            //     border-radius: 10px;
            //     border: 2px solid #1057a0;
            // }
        }
    }
}
.where {
    .switch-title {
        color: #01a084;
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

    .switch-field label:before {
        top: -40px;
        left: 150px;
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
