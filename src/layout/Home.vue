<template lang="html">
  <div>
    <!-- <Header /> -->
    <section class="hero-section hero-section-home" v-if="filter">
      <div class="container">
        <div class="row">
          <Logo />
          <div class="col-md-12">
            <!-- container element for chat window -->
            <!-- <div id="chat"></div> -->
            <BotUI class="col-md-6"></BotUI>
            <!-- <input type="radio" id="one" name="what" value="calciatore" v-model="what">
            <label for="one">calciatore</label>
            <br>
            <input type="radio" id="two" name="what" value="team" v-model="what">
            <label for="two">team</label>
            <br> -->
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
    </section>

    <!-- <Process />
    <Fact />
    <Review />
    <Footer /> -->

  <!-- result -->
  <result v-if="cardResult" :what="what" />
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
    filteredCustomers: function() {
      const {
        // what,
        where
      } = this;
      return this.countries
        .filter(card => card.profile === what)
      // || card.where === where
    }
  },
  methods: {
    userList: function() {
      console.log("userList");
      console.log("store: " + this.$store.state.what);
      this.error = null
      this.filter = false
      this.cardResult = true
      // ../static/data/country.json
      // http://35.193.9.82:121/api/Search/FindUser
      axios.get('http://35.193.9.82:121/api/Search/FindUser', {})
        .then(response => {
          console.log('userList Response:', response)
          console.log('querystring:', this.to)
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.countries = response.data
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
.switch-field {
    font-family: "Lucida Grande", Tahoma, Verdana, sans-serif;
    padding: 40px;
    overflow: hidden;
}

.switch-title {
    text-align: left;
    margin-bottom: 6px;
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
    background-color: #A5DC86;
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
