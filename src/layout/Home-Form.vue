<template lang="html">
  <div>
    <!-- <Header /> -->
    <!-- <section class="hero-section hero-section-home pusher" v-if="filter"> -->
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

              <div class="where">
                <div class="buttons">
                  <div class="switch-field-input">
                    <!-- <div class="switch-title">-dove sto cercando-</div> -->
                    <div class="switch-content-input form-group">
                      <label for="where" class="sr-only">Password</label>
                      <input type="text" name="where" id="where" class="form-control mx-auto" v-model="where" placeholder="dove sto cercando">
                    </div>
                  </div>
                </div>
              </div>
            <hr>
            <div class="form-group">
              <div class="col-md-6 mx-auto">
                <button type="button" @click="userList" class="btn btn-outline-success btn-lg btn-block">Inizia <i class="fas fa-chevron-circle-right"></i></button>
                  <!-- <a href="http://www.tirolibre.it" class="btn btn-outline-success btn-lg btn-block">Inizia <i class="fas fa-chevron-circle-right"></i></a> -->
              </div>
            </div>
            <!-- container element for chat window -->
            <!-- <div id="chat"></div> -->
            <!-- <BotUI class="col-md-6"></BotUI> -->
            <!-- <input type="radio" id="one" name="what" value="calciatore" v-model="what">
            <label for="one">calciatore</label>
            <br>
            <input type="radio" id="two" name="what" value="team" v-model="what">
            <label for="two">team</label>
            <br> -->
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
import {
  EventBus
} from '../event-bus'
import axios from 'axios'
import Header from '@/components/Header'
import BotUI from '@/components/BotUI'
import Result from './Result'
import Logo from '@/components/Logo'
// import Process from '@/components/Process'
// import Fact from '@/components/Fact'
// import Review from '@/components/Review'
// import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: {
    Header,
    BotUI,
    Result,
    Logo
    // Process,
    // Fact,
    // Review,
    // Footer
  },
  data() {
    return {
      // what: '',
      cardResult: false,
      filter: true,
      msg: 'Welcome to Your Vue.js App',
      q1: '',
      q2: '',
      title: ''
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
      // ../static/data/country.json
      // http://35.193.9.82:121/api/Search/FindUser
      axios.get('../static/data/country.json', {})
        .then(response => {
          console.log('userList Response:', response)
          console.log('querystring:', this.to)
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.users = response.data
        })
        .catch(error => {
          // Request failed.
          console.log('error', error.response)
          this.error = error.response
        })
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
// test

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
.hero-section {
    min-height: 900px;
    padding-top: 30px;
    display: block;
    background-image: url("../assets/images/home5-bg.png");
    background-size: cover;
    // background-color: #f3f7f9;
    background-position: right top;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;

    form {
        display: block;
        margin: 100px auto;
        // width: 950px;
        overflow: hidden;
        background: #FFF;
        border: 1px solid #E4E4E4;
        border-radius: 5px;
        font-size: 0;
    }

    form > div {
        display: inline-block;
        width: 100%;
    }

    form > div > label {
        display: block;
        padding: 20px 20px 10px;
        vertical-align: top;
        font-family: Source Sans Pro, Arial, sans-serif;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        color: #939393;
        cursor: pointer;
    }

    form > div.col-2,
    form > div.col-3,
    form > div.col-4 {
        box-shadow: 1px 1px #E4E4E4;
    }

    form > div.col-2 {
        width: 50%;
    }

    form > div.col-3 {
        width: 33.3333333333%;
    }

    form > div.col-4 {
        width: 25%;
    }

    form > div > label > input {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 27px;
        line-height: 27px;
        margin: 5px -5px 0;
        padding: 7px 5px 3px;
        border: none;
        outline: none;
        border-radius: 3px;
        background: transparent;
        font-size: 14px;
        font-weight: 200;
        opacity: 0.66;
        transition: opacity 0.3s;
    }

    form > div > label > select {
        display: block;
        width: 100%;
        margin: 16px 0 6px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        font-size: 14px;
        font-weight: 200;
        opacity: 0.33;
    }

    form > div > label > input:focus,
    form > div > label > select:focus {
        opacity: 1;
    }
}

.hero-section-home {
    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 220px;
        // background-image: url("../images/IcoTirolibre.png");
        background-repeat: no-repeat;
        background-position: left center;
        background-size: contain;
        overflow: hidden;
    }
}

// Button

.btn-container {
    position: absolute;
    left: 50%;
    margin: 0 0 100px -150px;
}

.btn-go {
    width: 300px;
    height: 50px;
    line-height: 50px;
    background-color: #FF6138;
    border-radius: 8px;
    color: #fff;
    font-family: 'Indie Flower', cursive;
    font-size: 22px;
    font-weight: normal;
    text-decoration: none;
    text-align: center;
    display: inline-block;
    position: relative;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: -webkit-transform;
    transition-property: transform;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    -webkit-transform: translateY(-6px);
    -ms-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-animation-name: hover;
    animation-name: hover;
    -webkit-animation-duration: 1.5s;
    animation-duration: 1.5s;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
    &:before {
        pointer-events: none;
        position: absolute;
        z-index: -1;
        content: '';
        top: 100%;
        left: 5%;
        height: 10px;
        width: 90%;
        opacity: 0;
        background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
        background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -webkit-transition-property: -webkit-transform, opacity;
        transition-property: transform, opacity;
        opacity: 0.4;
        -webkit-transform: translateY(6px);
        -ms-transform: translateY(6px);
        transform: translateY(6px);
        -webkit-animation-name: hover-shadow;
        animation-name: hover-shadow;
        -webkit-animation-duration: 1.5s;
        animation-duration: 1.5s;
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-direction: alternate;
        animation-direction: alternate;
    }
    &:hover {
        background-color: #e16e50;
    }
}

@keyframes hover {
    50% {
        -webkit-transform: translateY(-3px);
        -ms-transform: translateY(-3px);
        transform: translateY(-3px);
    }

    100% {
        -webkit-transform: translateY(-6px);
        -ms-transform: translateY(-6px);
        transform: translateY(-6px);
    }
}

@-webkit-keyframes hover-shadow {
    0% {
        -webkit-transform: translateY(6px);
        transform: translateY(6px);
        opacity: 0.4;
    }

    50% {
        -webkit-transform: translateY(3px);
        transform: translateY(3px);
        opacity: 1;
    }

    100% {
        -webkit-transform: translateY(6px);
        transform: translateY(6px);
        opacity: 0.4;
    }
}

@keyframes hover-shadow {
    0% {
        -webkit-transform: translateY(6px);
        -ms-transform: translateY(6px);
        transform: translateY(6px);
        opacity: 0.4;
    }

    50% {
        -webkit-transform: translateY(3px);
        -ms-transform: translateY(3px);
        transform: translateY(3px);
        opacity: 1;
    }

    100% {
        -webkit-transform: translateY(6px);
        -ms-transform: translateY(6px);
        transform: translateY(6px);
        opacity: 0.4;
    }
}

@-webkit-keyframes hover {
    50% {
        -webkit-transform: translateY(-3px);
        transform: translateY(-3px);
    }

    100% {
        -webkit-transform: translateY(-6px);
        transform: translateY(-6px);
    }
}

@keyframes hover {
    50% {
        -webkit-transform: translateY(-3px);
        -ms-transform: translateY(-3px);
        transform: translateY(-3px);
    }

    100% {
        -webkit-transform: translateY(-6px);
        -ms-transform: translateY(-6px);
        transform: translateY(-6px);
    }
}

@media only screen and (max-width: 767px) {
    .hero-section {
        height: auto;
        padding-bottom: 100px;
        padding-top: 160px;
        background-position: right 50% top;
    }

    .hero-section-home {
        &::before {
            opacity: 0.3;
        }
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
@media (max-width: 1585px) {
    .hero-section .laptop-image {
        left: 0;
    }
}
@media (max-width: 1425px) {
    .header-section .site-btn {
        margin-left: 0;
    }

    .hero-section {
        background-position: right 30% top;
    }

    .hero-section .laptop-image {
        width: auto;
        max-width: 100%;
        top: 70px;
    }
}
@media (min-width: 1199px) and (max-width: 1390px) {}
/* Medium screen : 992px. */
@media only screen and (min-width: 992px) and (max-width: 1199px) {
    .menu-list li a {
        margin-right: 15px;
    }

    .hero-section {
        background-position: right 23% top;
    }

}
/* Tablet :768px. */
@media only screen and (min-width: 768px) and (max-width: 991px) {
    .header-section {
        padding: 30px 15px 0;
    }

    .menu-list li a {
        margin-right: 6px;
    }

    .header-section .site-btn {
        margin-left: 10px;
    }

    .hero-section {
        background-position: right 25% top;
        height: 730px;
        padding-top: 160px;
    }
    .hero-text h2 {
        font-size: 45px;
    }

    .pull-3 {
        right: 0;
    }

    .push-8 {
        left: 0;
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
    .header-section {
        padding: 30px 0;
        background: #fff;
    }

    .header-section .responsive-bar {
        float: right;
        font-size: 25px;
        display: block;
        cursor: pointer;
    }

    .header-section .user {
        float: right;
        font-size: 25px;
        color: #333;
        margin-right: 20px;
        display: block;
    }

    .main-menu {
        float: none;
        position: absolute;
        width: 100%;
        left: 0;
        top: 100%;
        background: #fff;
        padding: 0 15px;
        display: none;
        -webkit-box-shadow: 0 14px 43px rgba(33, 54, 61, 0.15);
        box-shadow: 0 14px 43px rgba(33, 54, 61, 0.15);
    }

    .menu-list {
        list-style: none;
    }

    .menu-list li {
        display: block;
        border-top: 1px solid #e1e1e1;
    }

    .menu-list li a {
        display: block;
        padding: 10px 5px;
        margin-right: 0;
        color: #20509e;
    }

    .hero-text h2 {
        font-size: 40px;
    }

    .hero-section {
        height: auto;
        padding-bottom: 100px;
        padding-top: 60px;
        background-position: right 50% top;
    }

    .pull-3 {
        right: 0;
    }

    .push-8 {
        left: 0;
    }

    .header-section .site-btn {
        display: none;
    }

}
/* small Mobile :320px. */
@media only screen and (max-width: 479px) {}
</style>
