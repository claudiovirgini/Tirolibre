<template>
<div>
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
        <router-link class="total-btn" tag="button" :to="{ name: 'Player', params: { id: $route.params.id }, query: {user: card.name}}">
          Apri profilo
        </router-link>

      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Card',
  data() {
    return {
      countries: [],
      userProfile: false,
      cardResult: true,
    }
  },
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
    this.userList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*Profile Card 5*/
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
