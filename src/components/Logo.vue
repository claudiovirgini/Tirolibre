<template>
<div class="col-md-12 text-center mt-4">
  <img src="../assets/images/TiroLibreLogo_black.png" class="d-inline-block align-top" alt="TiroLibre">
  <h1 class="display-4">Il contatto diretto tra <span>squadre</span> e <span>calciatori</span></h1>
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
@media only screen and (max-width: 479px) {
    h1 {
        text-align: center;
    }
}
</style>
