<template>
    <md-card style="overflow-y:auto">
      <!--<md-card-header :data-background-color="dataBackgroundColor">
      <h4 class="title">Aggiorna Profilo</h4>
      <p class="category">Completa il tuo profilo</p>
    </md-card-header>-->

      <md-card-content>
        <div class="md-layout-item md-size-100 text-right">
          <md-button class="md-raised md-success" v-on:click="saveProfile()">Aggiorna Profilo</md-button>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Nome</label>
              <md-input v-model="name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Cognome</label>
              <md-input v-model="surname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Classe</label>
              <md-input v-model="yearClass" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Nazionalità</label>
              <md-input v-model="nationality" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label for="ruolo">Ruolo</label>
              <md-select v-model="roleSelected" id="ruolo">
                <md-option v-for="role in roleList" v-bind:value="role.text">
                  {{ role.text }}
                </md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <map-autocomplete place-holder="Dove ti trovi" :initial-address="city" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress"></map-autocomplete>
            </md-field>
          </div>
          <!--<div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Dove Cerchi</label>
              <md-input v-model="researchPlace" type="text"></md-input>
            </md-field>
          </div>-->
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label for="status">Status</label>
              <md-select v-model="actualStatus" id="status">
                <md-option v-for="status in statusList" v-bind:value="status.text">
                  {{ status.text }}
                </md-option>
              </md-select>

            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Telefono</label>
              <md-input v-model="phoneNumber" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Peso</label>
              <md-input v-model="weigth" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Altezza</label>
              <md-input v-model="heigth" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Nome Squadra ultimo campionato</label>
              <md-input v-model="experience1" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Nome Squadra altre esperienze</label>
              <md-input v-model="experience2" type="text" :disabled="(playerdata != null && playerdata.Experiences != null) && (playerdata.Experiences>0)"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Nome Squadra altre esperienze</label>
              <md-input v-model="experience3" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>About Me</label>
              <md-textarea v-model="aboutMe"></md-textarea>
            </md-field>
          </div>

        </div>
      </md-card-content>
  </md-card >
</template>
<script>
  import {serverBus} from '@/main';
  import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
  export default {
    name: 'AgentPlayerProfileForm',
    components: {
      MapAutocomplete
    },
    props: {
      playerId: {
        type: Number
      },
    },
    data() {
      return {
        roleList: [],
        statusList : [],
        playerdata: {},
      }
    },
    methods: {
      setCorrectAddress: function (address) {
        this.city = address;
      },
      setInvalidAddress: function () {
      },
      saveProfile: function () {
        serverBus.$emit('showLoading', true);
        this.$store.dispatch('addOrUpdateAgentPlayer', { agentId: this.$store.state.authentication.user.Id, player: this.playerdata }).then(res => {
          serverBus.$emit('showLoading', false);
          if (this.playerId == null) serverBus.$emit('addedNewPlayerAgent', true);
          alert('Salvataggio OK')
        }).catch(error => {
          alert('Si è verificato un errore'); serverBus.$emit('showLoading', false);
        })
      },
    },
    computed: {
      name: {
        get() {
          return (this.playerdata != null) ? this.playerdata.Name : '';
        },
        set(value) {
          this.playerdata.Name = value;
        }
      },
      surname: {
        get() {
          return (this.playerdata != null) ? this.playerdata.Surname : '';
        },
        set(value) {
          this.playerdata.Surname = value;
        }
      },
      weigth: {
        get() {
          return (this.playerdata != null) ? this.playerdata.Weigth : '';
        },
        set(value) {
          this.playerdata.Weigth = value;
        }
      },
      heigth: {
        get() {
          return (this.playerdata != null) ? this.playerdata.Heigth : '';
        },
        set(value) {
          this.playerdata.Heigth = value;
        }
      },
      aboutMe: {
        get() {
          return (this.playerdata != null) ? this.playerdata.AboutMe : '';
        },
        set(value) {
          this.playerdata.AboutMe = value;
        }
      },
      actualStatus: {
        get() {
          return (this.playerdata != null) ? this.playerdata.ActualStatus : '';
        },
        set(value) {
          this.playerdata.ActualStatus = value;
        }
      },
      city: {
        get() {
          return (this.playerdata != null && this.playerdata.Address != null) ? this.playerdata.Address.FullAddress : '';
        },
        set(value) {
          this.playerdata.Address = { FullAddressJson: JSON.stringify(value), FullAddress: value.formatted_address, Location: null };
        }
      },
      nationality: {
        get() {
          return (this.playerdata != null) ? this.playerdata.Nationality : '';
        },
        set(value) {
          this.playerdata.Nationality = value;
        }
      },
      phoneNumber: {
        get() {
          return (this.playerdata != null) ? this.playerdata.PhoneNumber : '';
        },
        set(value) {
          this.playerdata.PhoneNumber = value;
        }
      },
      yearClass: {
        get() {
          var returned = ''
          if (this.playerdata != null && this.playerdata.BornDate) {
            var temp = new Date(this.playerdata.BornDate);
            returned = temp.getFullYear()
          }
          return returned;
        },
        set(value) {
          if (this.playerdata.BornDate != null) {
            this.playerdata.BornDate = new Date(this.playerdata.BornDate);
          }
          else {
            this.playerdata.BornDate = new Date('01/01/2000');
          }
          this.playerdata.BornDate.setFullYear(value)
        }
      },
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
            this.playerdata.Roles.push({ Id: 0, RoleName: value })
          }
        }
      },
      researchPlace: {
        get() {
          if ((this.playerdata != null) && (this.playerdata.ResearchPlaces != null) && (this.playerdata.ResearchPlaces.length > 0))
            return this.playerdata.ResearchPlaces[0].Value
          else return '';
        },
        set(value) {
          if ((this.playerdata != null) && (this.playerdata.ResearchPlaces != null) && (this.playerdata.ResearchPlaces.length > 0))
            return this.playerdata.ResearchPlaces[0].Value = value;
          else {
            this.playerdata.ResearchPlaces = [];
            this.playerdata.ResearchPlaces.push({ Id: 0, Value: value })
          }
        }
      },
      experience1: {
        get() {
          if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 0))
            return this.playerdata.Experiences[0].TeamName
          else return '';
        },
        set(value) {
          if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 0))
            return this.playerdata.Experiences[0].TeamName = value;
          else {
            this.playerdata.Experiences = [];
            this.playerdata.Experiences.push({ Id: 0, TeamName: value })
          }
        }
      },
      experience2: {
        get() {
          if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 1))
            return this.playerdata.Experiences[1].TeamName
          else
            return '';
        },
        set(value) {
          if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 1))
            return this.playerdata.Experiences[1].TeamName = value;
          else {
            if ((this.playerdata.Experiences != null) && (this.playerdata.Experiences.length == 1)) {
              this.playerdata.Experiences.push({ Id: 0, TeamName: value })
            }
          }
        }
      },
      experience3: {
        get() {
          if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 2))
            return this.playerdata.Experiences[2].TeamName
          else return '';
        },
        set(value) {
          if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 2))
            return this.playerdata.Experiences[2].TeamName = value;
          else {
            if ((this.playerdata.Experiences != null) && (this.playerdata.Experiences.length == 2)) {
              this.playerdata.Experiences.push({ Id: 0, TeamName: value })
            }
          }
        }
      },
     
    },
    created() {
      this.$store.dispatch('getRoleList', {}).then(res => {
        this.roleList = res
      });
      this.$store.dispatch('getStatus', {}).then(res => {
        this.statusList = res;
      })
    },
    mounted() {
      if (this.playerId == null) {
        this.playerdata = {
          FilePlayerImage: '',
          FilePlayerCardImage: '',
          Surname: '',
          BornDate: null, Weigth: null,
          Heigth: null,
          Foot: null,
          ActualStatus: null,
          ActualDivision: null,
          City: null,
          Age: null,
          AboutMe: null,
          Divisions: [],
          Experiences: [],
          ResearchPlaces: [],
          Roles: [],
          Videos: [],
          Name: null
        }
      }
      else {
        serverBus.$emit('showLoading', true);
        this.$store.dispatch('getPlayerAgentProfile',  this.playerId ).then(res => {
          serverBus.$emit('showLoading', false);
          this.playerdata = res.data;
        }).catch(error => {
          alert('Si è verificato un errore'); serverBus.$emit('showLoading', false);
        })
      }
    },

    }
  </script>
<style>
  .md-menu-content.md-select-menu {
    z-index: 100;
  }
</style>
