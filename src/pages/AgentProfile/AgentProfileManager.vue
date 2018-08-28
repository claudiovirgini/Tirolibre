<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <player-profile-form data-background-color="green"  :playerdata="playerdata" v-if="profileLoaded">

        </player-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <player-card   :playerdata="playerdata" v-if="profileLoaded">

        </player-card>
      </div>
    </div>
  </div>
</template>

<script>
import PlayerProfileForm from '@/pages/AgentProfile/AgentProfileForm.vue'
  import PlayerCard from '@/pages/AgentProfile/AgentCard.vue'
  import { serverBus } from '@/main';

  export default {
    components: {
      PlayerProfileForm,
      PlayerCard
    },
    name: 'AgentProfileManager',
    data() {
      return {
        playerdata: {},
        profileLoaded : false
      }
    },

    mounted() {
      //if (this.$store.state.authentication.user == null)
      //  this.$router.go('/')
      //else
      serverBus.$emit('showLoading', true);
        this.$store.dispatch('getPlayerProfile', this.$store.state.authentication.user.Id).then(res => {
          this.playerdata = res.data;
          this.profileLoaded = true;
          serverBus.$emit('showLoading', false);
          //serverBus.$on('updateProfile', updateProfile);

        }).catch(error => { alert('Si è verificato un errore'); serverBus.$emit('showLoading', false) });
    }
  }
</script>
