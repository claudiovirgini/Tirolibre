<template>
<div class="col-md-12 text-center mt-4">
  <img src="../assets/images/TiroLibreLogo_black.png" class="d-inline-block align-top" alt="TiroLibre">
  <!-- <h1 class="display-4">Il contatto diretto tra <span>squadre</span> e <span>calciatori</span></h1> -->
  <h1 class="display-4"><span>il mercato del calcio 365 giorni l'anno</span></h1>
  <h3 class="lead">Interagisci con le offerte e ottieni feedback istantanei in ogni momento, <span>quando vuoi, dove vuoi</span></h3>
  <div class="col-md-6">
  </div>

</div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
    font-weight: 700;
    font-size: 1.5em;
    span {
        text-transform: uppercase;
    }
}
h3 {
    color: #000;
    span {
        text-transform: uppercase;
        font-weight: 700;
    }
}
@media only screen and (max-width: 479px) {
    h1 {
        text-align: center;
    }
}
</style>
