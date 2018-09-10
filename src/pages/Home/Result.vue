<template lang="html">
  <div>
      <section class="pusher" v-if="cardResult">
        <div class="main-header">
          <div class="container">
            <div class="row">
              <Logo />
              <div class="col-md-12">
                <form class="">
                  <div class="col-md-6">
                    <div class="md-layout-item">
                      <md-field>
                        <label for="profileList">Cosa cerchi</label>
                        <md-select v-model="profileSelected" @md-selected="mdSelected">
                          <md-option v-for="profile in profileList" v-bind:value="profile.value">
                            {{ profile.text }}
                          </md-option>
                        </md-select>
                      </md-field>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label>
                      <!-- Dove cerchi -->
                      <map-autocomplete place-holder="Dove cerchi?" :initialAddress="selectedAddressString" startactualpos="false" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress"></map-autocomplete>
                      <!--<input placeholder="Dove cerchi?" tabindex="2" />-->
                    </label>
                  </div>
                </form>
              </div>
            </div>

            <!-- <button type="button" class="btn btn-light float-right btn-advanced" data-toggle="collapse" data-target="#filterTeam" v-if="profileSelected === 1">
                Più filtri
           </button> -->
            <div class="row collapse filter-panel show" id="filterTeam" v-if="profileSelected === 1">
              <div class="col">
                <md-field>
                  <label for="category">Categoria</label>
                  <md-select v-model="categorySelected" id="category">
                    <md-option v-for="category in categoryList" :value="category.value">
                      {{ category.text }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="col" style="padding-top:10px;text-align:center">
                <button @click="updateRadius(-5)" class="button_plus">-</button> <vue-slider style="float:left;width:70%;padding-top:13px" ref="slider" v-model="radius"></vue-slider><button @click="updateRadius(5)" class="button_plus">+</button>
              </div>
              <div class="col">
                <md-button @click="findTeam()" class="md-success btn btn-success btn-lg btn-block">
                  <i class="md-icon md-icon-font material-icons md-theme-default">search</i>
                  Cerca
                </md-button>
              </div>
            </div>


            <!-- <button type="button" class="btn btn-light float-right btn-advanced" data-toggle="collapse" data-target="#filterPlayer" v-if="profileSelected === 0">
                Più filtri
           </button> -->
            <div class="row collapse filter-panel show" id="filterPlayer" v-if="profileSelected === 0">
              <div class="col">
                <md-field>
                  <label for="ruolo">Ruolo</label>
                  <md-select v-model="roleSelected" id="ruolo">
                    <md-option v-for="role in roleList" v-bind:value="role.value">
                      {{ role.text }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="col">
                <md-field>
                  <label for="classe">Classe</label>
                  <md-select v-model="classeSelected" id="classe">
                    <md-option v-for="classe in classList" v-bind:value="classe.value">
                      {{ classe.text }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="col">
                <md-field>
                  <label for="status">Status</label>
                  <md-select v-model="statusSelected" id="status">
                    <md-option v-for="status in statusList" v-bind:value="status.value">
                      {{ status.text }}
                    </md-option>
                  </md-select>

                </md-field>
              </div>
              <div class="col">
                <md-field>
                  <label for="category">Categoria</label>
                  <md-select v-model="categorySelected" id="category">
                    <md-option v-for="category in categoryList"  v-bind:value="category.value">
                      {{ category.text }}
                    </md-option>
                  </md-select>

                </md-field>
              </div>

              <div class="col">
                <md-field>
                  <label for="country">Nazionalità</label>
                  <md-select v-model="countrySelected" id="country">
                    <md-option v-for="country in countriesList" v-bind:value="country.value">
                      {{ country.text }}
                    </md-option>
                </md-select>

                </md-field>
              </div>
              <div class="col">
                <md-button @click="findPlayer()" class="md-success btn btn-success btn-lg btn-block">
                  <i class="md-icon md-icon-font material-icons md-theme-default">search</i>
                  Cerca
                </md-button>
                <!-- <button @click="findPlayer()" class="btn btn-success btn-lg btn-block"><i class="fa fa-search"></i> Cerca</button> -->
              </div>
          </div>

              <div class="row">
                <div class="col-md-4 mt-4 col-xs-6 d-flex align-items-stretch" v-for="item in items" :key="item.id">
                  <div class="card profile-card-5 col" @click="showProfile(item)">
                    <div class="card-img-block">
                      <picture-box :picUrl="getImagePathForItem(item)" :picType="item.profile"></picture-box>
                      <!--<img class="card-img-top" :src="getImagePathForItem(item)" alt="Card image cap">-->
                    </div>
                    <div class="card-body pt-0">
                      <h3 class="card-title">
                        {{item.name }}
                      </h3>
                      <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                      <p class="card-text" v-if="item.Profile === 0">
                        {{ item.role }} | {{ item.age }}
                      </p>
                      <p class="card-text" v-if="item.profile === 1">
                        {{ item.fulladdress }}
                      </p>
                      <p class="card-text level" v-if="item.profile === 1">
                        <i class="fas fa-trophy"></i> {{ item.level }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <back-to-top bottom="50px" right="50px">
                <button type="button" class="btn btn-success btn-to-top"><i class="fas fa-chevron-up"></i></button>
              </back-to-top>


            </div>
          </div>
      </section>
</div>
</template>


<script>
import PictureBox from '@/components/PictureBox/PictureBox'
import Logo from '@/components/Logo'
import {
  serverBus
} from '@/main';
import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
import vueSlider from 'vue-slider-component'


export default {
  name: 'Result',
  components: {
    Logo,
    PictureBox,
    MapAutocomplete,
    vueSlider
  },
  props: {
    what: {
      type: String
    },
    place: {
      type: Object,
    },
    who: {
      type: String,
    }
  },
  data: function() {
    return {
      radius: 100,
      statusList: [],
      roleList: [],
      classList: [],
      categoryList: [],
      countriesList: [],
      profileList: [],
      profileSelected: null,
      roleSelected: null,
      classeSelected: null,
      categorySelected: null,
      statusSelected: null,
      countrySelected: null,
      playerIdSelected: 0,
      items: [],
      userProfile: false,
      cardResult: true,
      placeSelected: null,
      _profileSelected: null
    }
  },
  methods: {
    updateRadius: function(amount) {
      this.radius = this.radius + amount;
      if ((this.radius + amount) < 0) this.radius = 0;
      if (this.radius + amount > 100) this.radius = 1000;
    },
    mdSelected: function(val) {
      //if ((this.profileSelected != null) && (this.placeSelected != null))
      //  this.findUsers(this.profileSelected, this.placeSelected, 100);
    },
    setCorrectAddress: function(value) {
      this.placeSelected = value;
      //if ((this.profileSelected != null) && (this.placeSelected != null))
      //   this.findUsers(this.profileSelected, this.placeSelected, 100);
    },
    setInvalidAddress: function() {

    },
    showProfile: function (item) {
      alert(item.id)
      this.$router.push('playerProfile?playerId='+item.id)
    },

    getImagePathForItem: function(item) {
      return this.$store.state.configurations.imageRootUrl + item.fullpath;
    },

    findUsers: function(profile, address, radiusP, filterPlayer, filterTeam) {
      serverBus.$emit('showLoading', true);
      this.$store.dispatch('findUser', {
        profile: profile,
        radius: radiusP,
        place: JSON.stringify(address),
        playerFilter: filterPlayer,
        teamFilter: filterTeam
      }).then(res => {
        this.items = res.data
        serverBus.$emit('showLoading', false);
      }).catch(error => {
        alert('Si è verificato un errore nella chiamata API : ' + JSON.stringify(error));
        serverBus.$emit('showLoading', false);
      })
    },
    findPlayer: function() {
      //        alert('status : ' + this.statusSelected + ' - class : ' + this.classeSelected + ' - Role : ' + this.roleSelected + ' - ProfileSelected : ' + this.profileSelected + ' - categorySelected : ' + this.categorySelected)
      let findPlayerDetails = {
        status: this.statusSelected,
        role: this.roleSelected,
        class: this.classeSelected,
        category: this.categorySelected
      };
      this.findUsers(this.profileSelected, this.placeSelected, 100, findPlayerDetails, null);
    },
    findTeam: function() {
      let findTeamDetails = {
        category: this.categorySelected
      };
      this.findUsers(this.profileSelected, this.placeSelected, this.radius, null, findTeamDetails);
    }
  },
  computed: {
    selectedAddressString: {
      get() {
        if (this.placeSelected != null) return this.placeSelected.formatted_address;
        else return null;
      }
    },
  },

  created() {
    if (this.place != null) this.placeSelected = this.place;
    var self = this;
    this.$store.dispatch('getCategories', {}).then(res => {
      self.categoryList = res
    })
    this.$store.dispatch('getRoleList', {}).then(res => {
      this.roleList = res
    })
    this.$store.dispatch('getStatus', {}).then(res => {
      this.statusList = res;
    })
    this.$store.dispatch('getClassList', {}).then(res => {
      this.classList = res;
    })
    this.$store.dispatch('getCountriesList', {}).then(res => {
      this.countriesList = res;
    })
    this.$store.dispatch('getProfileList', {}).then(res => {
      this.profileList = res;
      setTimeout(function() {
        let temp = self.profileList.filter(d => d.text === self.what);
        self.profileSelected = temp[0].value;
        self.findTeam();
      }, 500);
    })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
// @media screen and (min-width:767px) {
//     .filter-panel {
//         display: block;
//     }
// }
// @media screen and (max-width:766px) {
//     .filter-panel {
//         display: none;
//     }
// }
.filter-panel {
    &:hover {
        // box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
    }
}
.pusher {
    background-image: url("/assets/images/bg-footer.jpg");
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
    background-image: url("/assets/images/logo-footer.png");
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
        &:hover {
            box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
        }
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

.btn-advanced {
    background-color: transparent;
    color: #00842d;
    font-weight: 700;
    border: 1px solid #E4E4E4;
}

[data-toggle="collapse"]:after {
    display: inline-block;
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    content: "\f078";
    transform: rotate(180deg);
    transition: all linear 0.25s;
}
[data-toggle="collapse"].collapsed:after {
    transform: rotate(0deg);
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
    .btn {
        border-radius: 2px;
        text-transform: uppercase;
        font-size: 12px;
        padding: 7px 20px;
    }
    .btn-primary {
        background-color: #4E5E30;
        border-color: #4E5E30;
    }
    .card-img-block {
        width: 91%;
        margin: 0 auto;
        position: relative;
        top: -20px;
        img {
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.63);
        }
    }
    h3 {
        color: #4E5E30;
        font-weight: 700;
        margin-top: 0;
    }
    p {
        font-size: 14px;
        font-weight: 300;
    }
    .card-text.level {
        font-weight: 700;
        color: #00842d;
        text-transform: uppercase;
    }
}
</style>
