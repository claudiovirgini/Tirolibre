<template lang="html">
  <div>
    <!-- <Header /> -->
    <section class="pusher">
      <div class="main-header">

      <div class="container">
        <div class="row">
          <Logo />
          <div class="col-md-12 text-center">
            Ciao!
            <hr>

              {{msg}}
            <!-- <span>Picked: {{ what }} // {{ where }}</span>


            <hr>
            Vuex store value: {{ $store.state.what }} // {{ $store.state.where }}
            <br>
            Computed property value: {{ what }} // {{ where }} -->

          </div>
        </div>
      </div>

    </div>
    </section>

</div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header'
import Logo from '@/components/Logo'

export default {
  name: 'Home',
  components: {
    Header,
    Logo
  },
  data() {
    return {
      msg: 'Welcome to TiroLibre'
    }
    },
    mounted() {
      alert(this.$route.query.cf)
      axios.post(this.$store.state.configurations.serviceBaseUrl + '/api/Account/ConfirmEmail', { Environment: this.$store.state.configurations.environment, ConfirmationCode: this.$route.query.cf})
        .then(response => {
          alert('Activation OK')
        })
        .catch(error => {
          alert('Activation KO')
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pusher {
    background-image: url("../assets/images/bg-footer.jpg");
    background-repeat: no-repeat;
    background-position: 50% 300px;
    background-size: cover;
    min-height: 100vh;
}
.main-header {
    // background-color: #d7e5e8;
    background-color: #FFF;
    // background-image: url("https://www.higuests.com/assets/images/alfred_001.png");
    background-image: url("../assets/images/logo-footer.png");
    background-repeat: no-repeat;
    background-position: 50% 110%;
    background-size: 200px auto;
    padding-bottom: 220px;
    border-radius: 0 0 9000px 6000px /1500px;
    min-height: 600px;
    overflow: hidden;
    box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
}
</style>
