<template>
<md-card class="md-card-profile">
  <div class="md-card-avatar">
    <img class="img" :src="cardUserImage">
  </div>

  <md-card-content>
    <h4 class="card-title">Nome Cognome</h4>
    <h6 class="category text-gray">Attaccante</h6>
    <!-- <p class="card-description">
      Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
    </p> -->
    <hr>
    <div class="text-center">
      <div class="row">
        <div class="col-lg-6">
          <h5>Ruolo
            <br><small>attaccante</small></h5></div>
        <div class="col-lg-6">
          <h5>Classe
            <br><small>1999</small></h5></div>
      </div>
    </div>
    <!-- <md-button class="md-round md-success">Follow</md-button> -->
  </md-card-content>
</md-card>
</template>
<script>
export default {
  name: 'user-card',
  props: {
    cardUserImage: {
      type: String,
      default: require('@/assets/img/faces/marc.jpg')
    }
  },
  data() {
    return {}
  }
}
</script>
<style>
.card-title {
  color: #252422;
  font-weight: bold;
  text-transform: uppercase;
}

h5 {
  font-size: 1.25rem;
  color: #252422;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: .5rem;
}

small {
  color: #9a9a9a;
  font-weight: 300;
  line-height: 1.4em;
}
</style>
