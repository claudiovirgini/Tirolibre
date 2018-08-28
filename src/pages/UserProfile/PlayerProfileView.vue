<template>
<div class="content">
  <div class="md-layout mt-5">

    <div class="md-layout-item md-medium-size-100 md-size-33">
      <user-card :playerdata="playerdata"/>
    </div>
    <div class="md-layout-item md-medium-size-100 md-size-66">
      <user-info data-background-color="green" :playerdata="playerdata" />
    </div>

  </div>

</div>
</template>

<script>
  
import UserCard from '@/pages/UserProfile/PlayerProfileViewCard.vue'
  import UserInfo from '@/pages/UserProfile/PlayerProfileViewForm.vue'
import { serverBus } from '@/main';

export default {
  name: 'PlayerProfileView',
  components: {
    UserCard,
    UserInfo
    },
    data() {
      return {
        playerdata: {}
      }
    },

  props: {
      playerId: {
        type: Number
      }
    },
  methods: {
    playerProfile: function() {
      this.cardResult = false
      this.userProfile = true
      console.log("player " + this.$store.state.id)
    }
  },

    mounted() {
    this.$store.dispatch('getPlayerProfile', this.playerId).then(res => {
        this.playerdata = res.data
      }).catch(error => alert('Si è verificato un errore'))
    }
}
</script>
