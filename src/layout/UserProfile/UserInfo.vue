<template>
<div>
  <!-- <Logo/> -->
  <md-card class="md-card-profile" v-for="card in filteredCustomers" :key="card.name">

    <md-card-header :data-background-color="dataBackgroundColor">
      <h4 class="title">Scheda Profilo</h4>
      <!-- <p class="category">Completa il tuo profilo</p> -->
    </md-card-header>

    <md-card-content>

      <div class="md-layout">
        <!-- <div class="md-layout-item md-small-size-100 md-size-50">
          <md-field>
            <label>Nome</label>
            <md-input type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-50">
          <md-field>
            <label>Cognome</label>
            <md-input type="text"></md-input>
          </md-field>
        </div> -->
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Ruolo</label>
            <md-input :value='card.role' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Nazionalità</label>
            <md-input :value='card.nazionalita' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Ruolo</label>
            <md-input :value='card.role' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Dove ti Trovi</label>
            <md-input type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Dove Cerchi</label>
            <md-input :value='card.doveCerchi' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Status</label>
            <md-input :value='card.status' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Telefono</label>
            <md-input :value='card.tel' disabled type="number"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Peso</label>
            <md-input :value='card.peso' disabled type="number"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Altezza</label>
            <md-input :value='card.altezza' disabled type="number"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Nome Squadra ultimo campionato</label>
            <md-input :value='card.campionato1' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Campionato 2</label>
            <md-input :value='card.campionato2' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Campionato 3</label>
            <md-input :value='card.campionato3' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-100">
          <md-field maxlength="5">
            <label>About Me</label>
            <md-textarea :value='card.about' disabled></md-textarea>
          </md-field>
        </div>
      </div>

    </md-card-content>
  </md-card>


</div>
</template>

<script>
import axios from 'axios'


import Logo from '@/components/Logo'
export default {
  name: 'user-card',
  props: {
    cardUserImage: {
      type: String,
      default: require('@/assets/img/faces/marc.jpg')
    },
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
  components: {
    Logo
    // UserCard
    // Logo,
    // Player
    // Footer
  },
  data() {
    return {
      users: [],
      userProfile: false,
      cardResult: true,
      isEditing: false,
      user: {
        firstName: 'Alejandro',
        lastName: 'Salgado',
        classe: '1990',
        nazionalita: 'Italiana',
        role: 'attaccante',
        status: 'svincolato',
        doveTiTrovi: 'Roma',
        doveCerchi: 'Roma',
        tel: '1234567890',
        peso: '72',
        altezza: '187',
        campionato1: 'Serie D',
        campionato2: 'Serie D',
        campionato3: 'Serie D'
      }
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
          this.users = response.data
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
      return this.users
        .filter(card => card.name === this.$route.query.user)
      // || card.where === where
    }
  },
  mounted() {
    //from your component
    console.log("user:" + this.$route.query.user)
    this.userList()
  }
}
</script>

<style>

</style>
