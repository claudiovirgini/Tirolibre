<template>
<div class="content">
  <div class="md-layout mt-5">

    <div class="md-layout-item md-medium-size-100 md-size-33">
      <user-card :playerdata="playerdata" />
      <md-button @click="sendMessage" class="md-success btn btn-success btn-lg btn-radius" v-if="isAuthenticated"><i class="material-icons">mail_outline</i> Invia Messaggio</md-button>
      <!-- <button @click="sendMessage()">SEND MESSAGE</button> -->
    </div>
    <div class="md-layout-item md-medium-size-100 md-size-66">
      <user-info data-background-color="yellow" :playerdata="playerdata" />
    </div>

  </div>

</div>
</template>

<script>
import UserCard from '@/pages/UserProfile/PlayerProfileViewCard.vue'
import UserInfo from '@/pages/UserProfile/PlayerProfileViewForm.vue'

import {
  serverBus
} from '@/main';

export default {
  name: 'PlayerProfileView',
  components: {
    UserCard,
    UserInfo
  },
  data() {
    return {
      playerdata: {},
      fullPathPlayerImage: null,
      infoPage: {
        url: '',
        type: '',
        title: 'About me',
        description: '',
        image: null
      }
    }
  },

  //props: {
  //  playerId: {
  //    type: Number
  //  }
  //},
  methods: {
    playerProfile: function() {
      this.cardResult = false
      this.userProfile = true
    },
    sendMessage: function() {
      serverBus.$emit('sendMessage', this.playerdata.Id);
    }
  },
  computed: {
    isAuthenticated: {
      get() {
        return this.$store.state.authentication.isAuth;
      }
    }
  },
  mounted() {
    serverBus.$emit('showLoading', true);
    this.playerId = this.$route.query.playerId
    this.$store.dispatch('getPlayerProfile', this.playerId).then(res => {
      this.playerdata = res.data
      serverBus.$emit('showLoading', false);
    }).catch(error => {
      alert('Si è verificato un errore');
      serverBus.$emit('showLoading', false);
    })
  }
}
</script>
