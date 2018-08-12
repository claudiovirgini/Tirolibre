<template lang="html">
  <div>
      <section class="pusher" v-if="cardResult">
        <div class="main-header">
          <div class="container">
            <div class="row">
              <Logo />
              <div class="col-md-12">
                <form class="shadow-lg">
                  <div class="col-md-6">
                    <label>Cosa cerchi
                      <select tabindex="1" v-model="profileSelected">
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
                    <input placeholder="Dove cerchi?" tabindex="2"  />
                  </label>
                  </div>
                </form>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 mt-4" v-for="item in items" :key="item.id">
                <div class="card profile-card-5">
                  <div class="card-img-block">
                    <img class="card-img-top" :src="getImagePathForItem(item)" alt="Card image cap">
                  </div>
                  <div class="card-body pt-0">
                    <h5 class="card-title">{{ item.name}}</h5>
                    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                    <p class="card-text" v-if="item.Profile === 'calciatore'">
                      {{ item.role }} | {{ item.age }}
                    </p>
                    <p class="card-text" v-if="item.profile === 'team'">
                      {{ item.fulladdress }} | {{ item.level }}
                    </p>
                    <div class="md-layout-item md-size-100 text-center">
                      <md-button class="md-raised md-success" >
                        <!-- <router-link class="total-btn" :to="{ name: 'Player', params: { profile: card.name }, query: {user: card.name}}"> -->
                        <div  class="total-btn"  @click="showProfile(item)">
                          Apri profilo
                        </div>
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
      <userProfile v-if="userProfile" :playerId="playerIdSelected" />
      <!-- /.player -->
</div>
</template>


<script>
import Logo from '@/components/Logo'
import UserProfile from './UserProfile'
  import { serverBus } from '../main';

export default {
  name: 'Result',
  components: {
    Logo,
    UserProfile
  },
  props: {
    what: {
      type: String,
      default: 'center'
    },
    who: {
      type: String,
      default: 'center'
    }
  },
  data() {
    return {
      playerIdSelected : 0,
      items: [],
      userProfile: false,
      cardResult: true,
    }
  },
    methods: {
      showProfile: function (item) {
        this.cardResult = false
        this.userProfile = true
        this.playerIdSelected = item.id;
      },
      getImagePathForItem: function (item) {
        return this.$store.state.configurations.imageRootUrl + item.fullpath;
    },
      userList: function () {
        serverBus.$emit('showLoading', true);
        this.$store.dispatch('findUser', { profile: this.what, top: 100 }
        ).then(res => {
          this.items = res.data
          serverBus.$emit('showLoading', false);
          }).catch(error => { alert('Si è verificato un errore'); serverBus.$emit('showLoading', false); })
    },
    playerProfile: function() {
      this.cardResult = false
      this.userProfile = true
      console.log("player " + this.$store.state.id)
    }
  },
  computed: {
    profileSelected: {
      get() {
        return this._profileSelected;
      },
      set(value) {
        this._profileSelected = value;
        serverBus.$emit('showLoading', true);
        this.$store.dispatch('findUser', { profile: this._profileSelected, top: 100 }
        ).then(res => {
          this.items = res.data
          serverBus.$emit('showLoading', false);
          }).catch(error => { serverBus.$emit('showLoading', false); alert('Si è verificato un errore') })
      }
    },
  },
    mounted() {
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
    width: 100%;
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
