<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="green"  v-bind:playerdata="playerdata">

        </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card  v-bind:playerdata="playerdata">

        </user-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  EditProfileForm,
  UserCard
} from '@/pages'

  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    name: 'UserProfile',
    data() {
      return {
        playerdata: {},
      }
    },
    mounted() {
      //if (this.$store.state.authentication.user == null)
      //  this.$router.go('/')
      //else 
        this.$store.dispatch('getPlayerProfile', this.$store.state.authentication.user.Id).then(res => {
          this.playerdata = res.data;
        }).catch(error => alert('Si è verificato un errore'));
    }
  }
</script>
