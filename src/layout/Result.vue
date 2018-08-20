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
                    <div class="md-layout-item">
                      <md-field>
                        <label for="profile">Cosa cerchi</label>
                        <md-select v-model="profileSelected" id="profile">
                          <md-option value="team">team</md-option>
                          <md-option value="calciatore">calciatore</md-option>
                          <md-option value="agente">agente</md-option>
                          <md-option value="ds">direttore sportivo</md-option>
                          <md-option value="allenatore">allenatore</md-option>
                        </md-select>
                      </md-field>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label>
                      <!--Dove cerchi-->
                      <map-autocomplete place-holder="Dove cerchi?" :initialAddress="selectedAddressString" startactualpos="false" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress"></map-autocomplete>
                      <!--<input placeholder="Dove cerchi?" tabindex="2" />-->
                    </label>
                  </div>
                </form>
              </div>

            </div>
            <div class="row" id="filterPlayer"  v-if="_profileSelected === 'calciatore'">
              <div class="col-md-4">
                <md-field  >
                  <label for="ruolo">Ruolo</label>
                  <md-select v-model="roleSelected" id="ruolo">
                    <md-option v-for="role in roleList" v-bind:value="role.value">
                      {{ role.text }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="col-md-4">
                <md-field>
                  <label for="classe">Classe</label>
                  <md-select v-model="classeSelected" id="classe">
                    <md-option v-for="classe in classList" v-bind:value="classe.value">
                      {{ classe.text }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="col-md-4">
                <md-field>
                  <label for="status">Status</label>
                  <md-select v-model="statusSelected" id="status">
                    <md-option value="svincolato">svincolato</md-option>
                    <md-option value="contratto1">Contartto ad 1 anno</md-option>
                    <md-option value="contratto2">Contartto ad 2 anno</md-option>
                    <md-option value="contratto3">Contartto ad 3 anno</md-option>
                    <md-option value="contratto4">Contartto ad 4 anno</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="col-md-4">
                <md-field>
                  <label for="category">Categoria</label>
                  <md-select v-model="categorySelected" id="category">
                      <md-option v-for="category in categoryList" :value="category.value" :key="category.value" >
                        {{ category.text }}
                      </md-option>
                    </md-select>

                </md-field>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 mt-4" v-for="item in items" :key="item.id">
                <div class="card profile-card-5">
                  <div class="card-img-block">
                    <picture-box :picUrl="getImagePathForItem(item)" :picType="item.profile == 0 ? profilecard : item.profile"></picture-box>
                    <!--<img class="card-img-top" :src="getImagePathForItem(item)" alt="Card image cap">-->
                  </div>
                  <div class="card-body pt-0">
                    <h5 class="card-title">
                      {{item.name }}
                    </h5>
                    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                    <p class="card-text" v-if="item.Profile === 0">
                      {{ item.role }} | {{ item.age }}
                    </p>
                    <p class="card-text" v-if="item.profile === 1">
                      {{ item.fulladdress }} | {{ item.level }}
                    </p>
                    <div class="md-layout-item md-size-100 text-center">
                      <md-button class="md-raised md-success">
                        <!-- <router-link class="total-btn" :to="{ name: 'Player', params: { profile: card.name }, query: {user: card.name}}"> -->
                        <div class="total-btn" @click="showProfile(item)">
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
      <userProfile v-if="userProfile" :playerId="playerIdSelected" />
</div>
</template>


<script>
import PictureBox from '@/components/PictureBox/PictureBox'
import Logo from '@/components/Logo'
import UserProfile from './UserProfile'
  import { serverBus } from '../main';
  import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'


export default {
  name: 'Result',
  components: {
    Logo,
    UserProfile,
    PictureBox,
    MapAutocomplete
  },
  props: {
    what: {
      type: String,
      default: 'team'
    },
    place: {
      type: Object,
    },
    who: {
      type: String,
      default: 'calciatore'
    }
  },
  data() {
    return {
      roleList: [],
      classList: [],
      categoryList: [],

      profilecard: 100,

      roleSelected:  '',
      classeSelected : '',
      _categorySelected: null,
      statusSelected : '',
      playerIdSelected: 0,
      items: [],
      userProfile: false,
      cardResult: true,
      placeSelected: null,
      _profileSelected : "calciatore"
    }
  },
    methods: {
      setCorrectAddress: function (value) {
        this.placeSelected = value;
        this.findUsers(this._profileSelected, this.placeSelected, 100);
      },
      setInvalidAddress: function () {

      },
      showProfile: function (item) {
        this.cardResult = false
        this.userProfile = true
        this.playerIdSelected = item.id;
      },
      getImagePathForItem: function (item) {
        return this.$store.state.configurations.imageRootUrl + item.fullpath;
    },
    findUsers :function(profile, address, radiusP) {
      serverBus.$emit('showLoading', true);
      this.$store.dispatch('findUser', { profile: profile, radius: radiusP, place: JSON.stringify(address) }
      ).then(res => {
        this.items = res.data
        serverBus.$emit('showLoading', false);
      }).catch(error => { alert('Si è verificato un errore'); serverBus.$emit('showLoading', false); })
    },
    playerProfile: function() {
      this.cardResult = false
      this.userProfile = true
    }
  },
    computed: {
      categorySelected :{
        get() {
          return this._categorySelected;
        },
        set(value) {
          this._categorySelected = value;
        }
      },
      selectedAddressString: {
        get() {
          if (this.placeSelected != null) return this.placeSelected.formatted_address;
          else return null;
        }
      },
    profileSelected: {
      get() {
        return this._profileSelected;
      },
      set(value) {
        this._profileSelected = value;
        this.findUsers(this._profileSelected, this.placeSelected, 100);
      }
    },
    },
 
    created() {
      this.$store.dispatch('getCategories', {}).then(res => {
        this.categoryList = res
        this._categorySelected = res[0];
      }).catch(error => { alert('Si è verificato un errore nel caricamento dei ruoli'); })
      this.$store.dispatch('getRoleList', {}).then(res => {
        this.roleList = res
      }).catch(error => { alert('Si è verificato un errore nel caricamento dei ruoli');})
      this.$store.dispatch('getClassList', {}).then(res => {
        this.classList = res;
      }).catch(error => { alert('Si è verificato un errore nel caricamento dei ruoli'); })
      if (this.place != null)
        this.placeSelected = this.place;
      if (this.what != null)
        this._profileSelected = this.what;
      this.findUsers(this._profileSelected, this.placeSelected, 100);
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
