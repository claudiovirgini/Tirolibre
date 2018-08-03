<template lang="html">
  <div>
      <section class="pusher" v-if="cardResult">
        <div class="main-header">
          <div class="container">
            <div class="row">
              <Logo />
              <div class="col-md-12">
                  <!-- <p style="color: #000;">What is: {{ what }}</p>
                  <p style="color: #000;">Where is: {{ where }}</p> -->
                <form class="shadow-lg">
                  <div class="col-md-6">
                    <label>Cosa cerchi
                      <select tabindex="1" v-model="what">
                        <option>calciatore</option>
                        <option>team</option>
                        <option>agente</option>
                        <option>ds</option>
                        <option>allenatore</option>
                      </select>
                    </label>
                  </div>
                  <div class="col-md-6">
                    <label>Dove cerchi
                    <input placeholder="Dove cerchi?" tabindex="2" v-model="where" />
                  </label>
                  </div>
                </form>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 mt-4" v-for="card in filteredCustomers" :key="card.name" @click="playerProfile(card.name)">
                <div class="card profile-card-5">
                  <div class="card-img-block">
                    <img class="card-img-top" :src="card.fullpath" alt="Card image cap">
                  </div>
                  <div class="card-body pt-0">
                    <h5 class="card-title">{{ card.name }}</h5>
                    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                    <p class="card-text" v-if="card.profile === 'calciatore'">
                      {{ card.role }} | {{ card.age }}
                    </p>
                    <p class="card-text" v-if="card.profile === 'team'">
                      {{ card.fulladdress }} | {{ card.level }}
                    </p>
                    <div class="md-layout-item md-size-100 text-center">
                      <md-button class="md-raised md-success">
                        <!-- <router-link class="total-btn" :to="{ name: 'Player', params: { profile: card.name }, query: {user: card.name}}"> -->
                        <router-link class="total-btn" :to="{ params: { profile: card.name }, query: {user: card.name}}">
                          Apri profilo
                        </router-link>
                      </md-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    <!-- <Footer /> -->

      <!-- player -->
      <!-- <player v-if="userProfile" :player="player" /> -->
      <userProfile v-if="userProfile" />
      <!-- /.player -->
</div>
</template>


<script>
import axios from 'axios'

import Logo from '@/components/Logo'
// import Player from './Player'
import UserProfile from './UserProfile'
// import Footer from '@/components/Footer'
export default {
  name: 'Result',
  components: {
    Logo,
    UserProfile
    // Player
    // Footer
  },
  props: {
    nome: {
      type: String,
      default: 'center'
    },
  },
  data() {
    return {
      countries: [],
      userProfile: false,
      cardResult: true,
    }
  },
  // props: ['what', 'where', 'to'],
  methods: {
    userList: function() {
      this.error = null;
      // ../static/data/country.json
      // http://35.193.9.82:121/api/Search/FindUser
      axios.get('http://35.193.9.82:121/api/Search/FindUser', {})
        .then(response => {
          console.log('userList Response:', response)
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
    },
    playerProfile: function() {
      this.cardResult = false
      this.userProfile = true
      console.log("player " + this.$store.state.id)
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
    player: {
      get() {
        return this.$store.state.player;
      },
      set(value) {
        this.$store.commit("SET_PLAYER", value);
      }
    },
    filteredCustomers: function() {
      const {
        what,
        where
      } = this;
      return this.countries
        .filter(card => card.profile === what)
      // || card.where === where
    }
  },
  mounted() {
    //from your component

    // console.log("store player:" + this.$route.query.player)
    // console.log("store player id:" + this.$route.query.id)
    // console.log("query player:" + $route.params.id)
    this.userList()
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
h1 {
    text-transform: uppercase;
    font-size: 2.5rem;
    span {
        // color: #088039;
        color: #FFF;
    }
}
.pusher {
    form {
        display: block;
        margin: 30px auto;
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
        padding: 10px 20px;
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

/*------------------
	Responsive
---------------------*/
@media (min-width: 1200px) {
    .container {
        max-width: 1170px;
    }
}

/*Profile Card 5*/
.md-button-content {
    a {
        color: #FFF !important;
    }
}
.profile-card-5 {
    margin-top: 20px;

    &:hover {
        box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.3);
    }
}

.profile-card-5 .btn {
    border-radius: 2px;
    text-transform: uppercase;
    font-size: 12px;
    padding: 7px 20px;
}

.profile-card-5 .card-img-block {
    width: 91%;
    margin: 0 auto;
    position: relative;
    top: -20px;
}

.profile-card-5 .card-img-block img {
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.63);
}

.profile-card-5 h5 {
    color: #4E5E30;
    font-weight: 600;
}

.profile-card-5 p {
    font-size: 14px;
    font-weight: 300;
}

.profile-card-5 .btn-primary {
    background-color: #4E5E30;
    border-color: #4E5E30;
}
</style>
