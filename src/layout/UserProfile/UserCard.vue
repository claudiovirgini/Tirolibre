<template>
<div>
  <md-card class="md-card-profile" v-for="card in filteredCustomers" :key="card.name">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage">
    </div>
    <md-card-content>
      <h4 class="card-title">{{ card.name }}</h4>
      <h6 class="category text-gray">{{ card.profile }}</h6>
      <hr>
      <div class="text-center">
        <div class="row">
          <div class="col-lg-6">
            <h5>Ruolo
              <br><small>{{ card.role }}</small></h5></div>
          <div class="col-lg-6">
            <h5>Classe
              <br><small>{{ card.age }}</small></h5></div>
        </div>
      </div>
    </md-card-content>
  </md-card>
</div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'user-card',
  props: {
    cardUserImage: {
      type: String,
      default: require('@/assets/img/faces/marc.jpg')
    }
  },
  components: {
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
