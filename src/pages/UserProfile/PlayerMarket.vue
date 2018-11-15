<template>
<div>
  <!-- The front is based on of my SVG link hover effect https://codepen.io/Zeaklous/pen/kyGqm -->

  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-6 mx-auto dark-theme text-center" v-if="posts && posts.length">
        <div class="card col-6 mt-3 mb-3" v-for="post of posts">
          <div class="front side" v-bind:style="{ 'background-image': 'url(' + post.img + ')' }">>
            <!-- <h1 class="logo">{{ post.name }}</h1> -->
          </div>

          <div class="back side">
            <h3 class="name">{{ post.name }}</h3>
            <div class="role">{{ post.role }}</div>
            <div class="info">
              <p><span class="property">Telefono: </span>{{ post.tel }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <!-- create notice  -->
  <md-dialog class="black" :md-active.sync="showDialog" @md-opened="myOpenMethod" @md-closed="myCloseMethod">
    <md-dialog-content>
      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-100 md-small-size-100 dark-theme">
          <md-card-header data-background-color="yellow">
            <md-dialog-title>Inserisci Annuncio</md-dialog-title>
          </md-card-header>

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="first-name">Nome</label>
                  <md-input name="first-name" id="first-name" v-model="firstName" />
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="last-name">Cognome</label>
                  <md-input name="last-name" id="last-name" v-model="lastName" />
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="role">Ruolo</label>
                  <md-select v-model="roleSelected" id="ruolo">
                    <md-option v-for="role in roleList" v-bind:value="role.text">
                      {{ role.text }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label for="scheda">Scheda</label>
                  <md-input name="scheda" id="scheda" v-model="scheda" />
                </md-field>
              </div>
            </div>
          </md-card-content>


          <md-card-actions>
            <md-button type="submit" class="md-primary">Crea Annuncio</md-button>
          </md-card-actions>
        </md-card>

      </form>
    </md-dialog-content>
    <!-- <md-dialog-actions>
      <md-button class="md-primary" @click="showDialog = false">Close</md-button>
      <md-button class="md-primary" @click="showDialog = false">Save</md-button>
    </md-dialog-actions> -->
  </md-dialog>
  <md-button class="position-fixed add-btn md-fab md-fab-fixed-bottom-right md-primary md-raised" @click="showDialog = true">
    <md-icon>add</md-icon>
  </md-button>
</div>
<!-- / create notice  -->

<!-- <div class="container">
    <div class="row">
      <div class="mx-auto">
        <ul class="col-12" v-if="posts && posts.length">
          <li v-for="post of posts">
            <img v-bind:src="post.img" />
          </li>
        </ul>
      </div>
    </div>
  </div> -->
</div>
</template>

<script>
import axios from 'axios'
import playerService from '@/services/playerService'
import commonService from '@/services/commonService'


export default {
  name: 'PlayerMarket',
  data() {
    return {
      showDialog: false,
      product1: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/card-2.jpg',
      product2: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/card-2.jpg',
      product3: 'https://demos.creative-tim.com/vue-material-dashboard-pro/img/card-2.jpg',
      posts: [],
      errors: [],
      firstName: '',
      lastName: '',
      role: '',
      scheda: '',
      roleList: [],
      playerdata: {},
      previewImage: null
    }
  },
  created() {
    var self = this;
    this.$store.dispatch('getStatus', {}).then(res => {
      self.statusList = res;

    });
    playerService.getPlayerProfile(this.$store.state.configurations.serviceBaseUrl, this.$store.state.authentication.user.Id).then(res => {
      //this.$store.dispatch('getPlayerProfile', ).then(res => {
      this.playerdata = res.data;
      this.createCard();
      // this.profileLoaded = true;
      serverBus.$emit('showLoading', false);
    }).catch(error => {
      // alert('Si è verificato un errore');
      serverBus.$emit('showLoading', false)
    });
    this.error = null;
    axios.get('../../assets/market.json', {})
      .then(response => {
        console.log('noticeList Response:', response)
        if (response.status !== 200) {
          this.errors = response.statusText
          return
        }
        this.posts = response.data
      })
      .catch(error => {
        // Request failed.
        console.log('error', errors.response)
        this.errors = errors.response
      })
  },
  methods: {
    noticeList: function() {
      this.error = null;
      axios.get('../static/data/country.json', {})
        .then(response => {
          console.log('countryList Response:', response)
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
    createCard: function() {
      var self = this;
      commonService.renderCardImage(self.$store.state.configurations.serviceBaseUrl, self.playerdata, 950, 63).then(function(canvas) {
        self.previewImage = canvas.toDataURL('image/jpeg', 0.8);
      }, function(err) {
        alert(JSON.stringify(err));
      })
    }
  },
  computed: {
    roleSelected: {
      get() {
        if ((this.playerdata != null) && (this.playerdata.Roles != null) && (this.playerdata.Roles.length > 0))
          return this.playerdata.Roles[0].RoleName

      },
      set(value) {
        if ((this.playerdata != null) && (this.playerdata.Roles != null) && (this.playerdata.Roles.length > 0))
          return this.playerdata.Roles[0].RoleName = value;
        else {
          this.playerdata.Roles = [];
          this.playerdata.Roles.push({
            Id: 0,
            RoleName: value
          })
        }
      }
    }
  }
}
</script>
<style lang="scss">
.md-fab .md-ripple {
    padding: 0 !important;
}
</style>
<style scoped lang="scss">
.black {
    background-color: #212121 !important;
}
.dark-theme {
    background-color: rgba(255, 255, 255, .1) !important;
}
ul {
    max-width: 500px;
}
.add-btn {
    bottom: 50px;
    right: 25px;
    width: 50px !important;
    height: 50px !important;
}
.md-button:not(.md-just-icon) .md-button-content i {
    font-size: 2rem !important;
}

$padding: 30px;

.container {
    perspective: 800px;

    /* Styling */
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 4px;

    /* Center it */
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
}
.card {
    /* Styling */
    max-width: 600px;
    height: auto;
    min-height: 300px;
    background: rgb(20,20,20);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

    /* Card flipping effects */
    transform-style: preserve-3d;
    transition: 1.3s;
}
.side {
    position: absolute;
    width: 95%;
    height: 100%;
    backface-visibility: hidden;
    /* Fix Chrome rendering bug */
    transform: rotate(0deg) translateZ(1px);
}

/* Flip the card on hover */
.back,
.container .card:hover {
    transform: rotateY(-180deg) translateZ(1px);
}

/* Front styling */
.front {
    /* Center the name + outline (almost) */
    line-height: 390px;
    /* Height - some (because visual center is a little higher than actual center) */
    text-align: center;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}
.logo {
    outline: 1px solid #19F6E8;
    display: inline-block;
    padding: 15px 40px;

    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    font-size: 1.4em;
    font-weight: normal;
    line-height: 32px;
    letter-spacing: 8px;
}

/* Back styling */
.back {
    background: #f8fe1e;
    padding: $padding;
}
.name {
    color: #3B3B3B;
    margin-bottom: 0;
}
.role {
    color: #00842e;
}
p {
    margin: 0.8em 0;
}
.info {
    position: absolute;
    bottom: $padding;
    left: $padding;
    color: #3b3b3b;
}
.property {
    color: #3B3B3B;
    font-weight: 700;
}

/* Make semi-responsive */
@media (max-width:700px) {
    .card {
        // transform: scale(.5);
    }
    .container .card:hover {
        transform: rotateY(-180deg) translateZ(1px);
    }
}
</style>
