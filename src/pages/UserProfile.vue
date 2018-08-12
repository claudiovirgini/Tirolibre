<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="green"  v-bind:playerdata="playerdata" v-if="profileLoaded">

        </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card  v-bind:playerdata="playerdata" v-if="profileLoaded">

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
  import { serverBus } from '../main';

  export default {
    components: {
      EditProfileForm,
      UserCard
    },
    name: 'UserProfile',
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
        }).catch(error => { alert('Si è verificato un errore'); serverBus.$emit('showLoading', false) });
    }
  }
</script>
