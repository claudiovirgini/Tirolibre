<template>
<div class="content">
  <div class="md-layout mt-5">

    <div class="md-layout-item md-medium-size-100 md-size-33">
      <user-card/>
    </div>
    <div class="md-layout-item md-medium-size-100 md-size-66">
      <user-info data-background-color="green" />
    </div>

  </div>

</div>
</template>

<script>
import axios from 'axios'

import UserCard from './UserProfile/UserCard'
import UserInfo from './UserProfile/UserInfo'


export default {
  name: 'userProfile',
  components: {
    UserCard,
    UserInfo
    // Player
    // Footer
  },
  data() {
    return {
      users: [],
      userProfile: false,
      cardResult: true,
      isEditing: false,

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
