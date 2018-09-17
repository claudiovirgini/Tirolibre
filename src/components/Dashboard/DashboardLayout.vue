<template>
<div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
  <notifications></notifications>

  <side-bar>
    <!--<mobile-menu slot="content"></mobile-menu>-->
    <!-- <sidebar-link to="/dashboard">
    <md-icon>dashboard</md-icon>
    <p>Dashboard</p>
  </sidebar-link> -->
    <sidebar-link to="/agent" v-if="isAgentProfile">
      <md-icon>person</md-icon>
      <p>Agent Profile</p>
    </sidebar-link>
    <sidebar-link to="/player" v-if="isPlayerProfile">
      <md-icon>person</md-icon>
      <p>Player Profile</p>
    </sidebar-link>
    <sidebar-link to="/team" v-if="isTeamProfile">
      <md-icon>person</md-icon>
      <p>Team Profile</p>
    </sidebar-link>
    <sidebar-link to="/maps" v-if="isPlayerProfile || isAgentProfile || isTeamProfile">
      <md-icon>location_on</md-icon>
      <p>Maps</p>
    </sidebar-link>
    <sidebar-link to="/market" v-if="isPlayerProfile">
      <md-icon>import_export</md-icon>
      <p>Market</p>
    </sidebar-link>
    <sidebar-link to="/portfolio" v-if="isAgentProfile">
      <md-icon>supervised_user_circle</md-icon>
      <p>Portfolio</p>
    </sidebar-link>
    <!-- <sidebar-link to="/premium">
    <md-icon>local_grocery_store</md-icon>
    <p>Passa a Premium</p>
  </sidebar-link> -->
    <!-- <sidebar-link to="/notifications">
    <md-icon>notifications</md-icon>
    <p>Notifications</p>
  </sidebar-link> -->
    <sidebar-link to="/upgrade" class="" v-if="isPlayerProfile">
      <md-icon>unarchive</md-icon>
      <p>Upgrade to PRO</p>
    </sidebar-link>
    <sidebar-link to="/" class="active-pro">
      <!-- <li class="nav-item logout active-pro"> -->
      <md-icon>power_settings_new</md-icon>
      <p v-on:click="logout()" class="text-uppercase">Logout</p>
      <!-- <a class="cd-signup" v-on:click="logout()" title="Logout"><i class="fas fa-power-off"></i> Logout</a> -->
    </sidebar-link>
  </side-bar>

  <div class="main-panel">
    <top-navbar></top-navbar>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</div>
</template>
<style lang="scss">
.nav-item.active p {
    color: #212121;
}
</style>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .1s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

  {
  opacity: 0
}
</style>
<script>
import TopNavbar from '@/components/Dashboard/TopNavbar.vue'
//import ContentFooter from './ContentFooter.vue'
//import DashboardContent from './Content.vue'
//import MobileMenu from '@/components/Dashboard/MobileMenu.vue'

export default {
  components: {
    TopNavbar,
    //DashboardContent,
    //ContentFooter,
    //MobileMenu
  },
  data() {
    return {
      isPlayerProfile: false,
      isTeamProfile: false,
      isAgentProfile: false,
    }
  },
  created() {
    var profile = this.$store.state.authentication.user.Profile;
    if (profile == 0) this.isPlayerProfile = true;
    if (profile == 1) this.isTeamProfile = true;
    if (profile == 2) this.isAgentProfile = true;
  },
  methods: {
    logout: function() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>
