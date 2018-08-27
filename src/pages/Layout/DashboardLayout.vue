<template>
<div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
  <notifications></notifications>

  <side-bar>
    <mobile-menu slot="content"></mobile-menu>
    <!-- <sidebar-link to="/dashboard">
      <md-icon>dashboard</md-icon>
      <p>Dashboard</p>
    </sidebar-link> -->
    <sidebar-link to="/user">
      <md-icon>person</md-icon>
      <p>User Profile</p>
    </sidebar-link>
    <sidebar-link to="/maps">
      <md-icon>location_on</md-icon>
      <p>Maps</p>
    </sidebar-link>
    <sidebar-link to="/market">
      <md-icon>import_export</md-icon>
      <p>Market</p>
    </sidebar-link>
    <sidebar-link to="/portfolio">
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
    <sidebar-link to="/upgrade" class="">
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

    <dashboard-content>

    </dashboard-content>

    <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
  </div>
</div>
</template>
<style lang="scss">
.nav-item.active p {
    color: #FFF;
}
</style>
<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from '@/pages/Layout/MobileMenu.vue'

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  methods: {
    logout: function() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>
