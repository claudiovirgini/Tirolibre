<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <team-profile-form data-background-color="green"  :teamdata="teamData"   v-if="profileLoaded">

        </team-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <team-card  :category="categoryName"  :teamdata="teamData" v-if="profileLoaded">

        </team-card>
      </div>
    </div>
  </div>
</template>

<script>
import TeamProfileForm from '@/pages/TeamProfile/TeamProfileForm.vue'
  import TeamCard from '@/pages/TeamProfile/TeamCard.vue'
import { serverBus } from '@/main';

  export default {
    components: {
      TeamProfileForm,
      TeamCard
    },
    name: 'TeamProfileManager',
    data() {
      return {
        categoryName: '',
        agentData: {},
        profileLoaded : false
      }
    },

    mounted() {
      //if (this.$store.state.authentication.user == null)
      //  this.$router.go('/')
      //else
      var self = this;
      serverBus.$emit('showLoading', true);
      this.$store.dispatch('getTeamProfile', this.$store.state.authentication.user.Id).then(res => {
        self.teamData = res.data;
        self.$store.dispatch('getCategories', {}).then(listCategories => {
          self.categoryName = (listCategories.filter(function (x) { return x.value == self.teamData.Category })[0]).text;
          self.profileLoaded = true;
          serverBus.$emit('showLoading', false);
        })

        }).catch(error => { alert('Si è verificato un errore'); serverBus.$emit('showLoading', false) });
    }
  }
</script>
