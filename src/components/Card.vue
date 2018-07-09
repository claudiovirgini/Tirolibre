<template>
<!--Profile Card 5-->
<div class="col-md-4 mt-4" v-for="card in filteredCustomers" :key="card.title">
  <div class="card profile-card-5">
    <div class="card-img-block">
      <img class="card-img-top" :src="card.src" alt="Card image cap">
    </div>
    <div class="card-body pt-0">
      <h5 class="card-title">{{ card.title }}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  <!-- <p class="mt-3 w-100 float-left text-center"><strong>Card with Floting Picture</strong></p> -->
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Card',
  data() {
    return {
      countries: []
    }
  },
  props: ['search', 'search02', 'search03'],
  methods: {
    countryList: function() {
      this.error = null;
      axios.get('../static/data/country.json', {})
        .then(response => {
          console.log('countryList Response:', response)
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.countries = response.data
        })
        .catch(error => {
          // Request failed.
          console.log('error', error.response)
          this.error = error.response
        })
    }
  },
  computed: {
    filteredCustomers: function() {
      const {
        search,
        search02,
        search03
      } = this;
      return this.countries
        .filter(card => card.title === search || card.title === search02 || card.title === search03)
    }
  },
  mounted() {
    //from your component
    this.countryList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*Profile Card 5*/
.profile-card-5 {
    margin-top: 20px;

    &:hover {
        box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.3);
    }
}

.profile-card-5 .btn {
    border-radius: 2px;
    text-transform: uppercase;
    font-size: 12px;
    padding: 7px 20px;
}

.profile-card-5 .card-img-block {
    width: 91%;
    margin: 0 auto;
    position: relative;
    top: -20px;
}

.profile-card-5 .card-img-block img {
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.63);
}

.profile-card-5 h5 {
    color: #4E5E30;
    font-weight: 600;
}

.profile-card-5 p {
    font-size: 14px;
    font-weight: 300;
}

.profile-card-5 .btn-primary {
    background-color: #4E5E30;
    border-color: #4E5E30;
}
</style>
