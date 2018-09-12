<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <agent-profile-form data-background-color="green"  :agentdata="teamData" v-if="profileLoaded">

        </agent-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <agent-card   :agentdata="teamData" v-if="profileLoaded">

        </agent-card>
      </div>
    </div>
  </div>
</template>

<script>
import AgentProfileForm from '@/pages/AgentProfile/AgentProfileForm.vue'
import AgentCard from '@/pages/AgentProfile/TeamCard.vue'
import { serverBus } from '@/main';

  export default {
    components: {
      AgentProfileForm,
      AgentCard
    },
    name: 'TeamProfileManager',
    data() {
      return {
        agentData: {},
        profileLoaded : false
      }
    },

    mounted() {
      //if (this.$store.state.authentication.user == null)
      //  this.$router.go('/')
      //else
      serverBus.$emit('showLoading', true);
      this.$store.dispatch('getTeamProfile', this.$store.state.authentication.user.Id).then(res => {
        this.teamData = res.data;
        this.profileLoaded = true;
        serverBus.$emit('showLoading', false);
        }).catch(error => { alert('Si è verificato un errore'); serverBus.$emit('showLoading', false) });
    }
  }
</script>
