<template lang="html">
  <div>
    <section class="pusher">
      <div class="main-header">

      <div class="container">
        <div class="row">
          <Logo />
          <div class="col-md-12 text-center">
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
import Logo from '@/components/Logo'
import {
  serverBus
} from '@/main';

export default {
  name: 'Home',
  components: {
    Logo
  },
  data() {
    return {
      msg: 'Welcome to Tirolibre'
    }
  },
  mounted() {
    this.$store.dispatch('confirmEmail', this.$route.query.cf).then(res => {
      serverBus.$emit('showMessage', 'Ora sei attivo puoi effettuare Login');
    }).catch(error => serverBus.$emit('showError', 'Si è verificato un errore in fase di attivazione'));
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
    width: 100%;
    background-color: #FFF;
    background-image: url("../assets/images/black-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    padding-bottom: 220px;
    border-radius: 0 0 9000px 6000px /1500px;
    min-height: 600px;
    overflow: hidden;
    box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
}
</style>
