<template lang="html">
  <div>
    <Header />
      <section class="hero-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <form>
                <div class="col-md-6">
                  <label>Cosa cerchi
                    <select tabindex="1" v-model="what">
                      <option>team</option>
                      <option>calciatore</option>
                      <option>coach</option>
                    </select>
                  </label>
                </div>
                <div class="col-md-6">
                  <label>Dove sei
                  <input placeholder="Dove cerchi?" tabindex="2"  v-model="where" />
                </label>
                </div>
              </form>
            </div>
          </div>

          <div class="row">
              <!-- <Card /> -->
            <div class="col-md-4 mt-4" v-for="card in filteredCustomers" :key="card.name">
              <div class="card profile-card-5">
                <div class="card-img-block">
                  <img class="card-img-top" :src="card.fullpath" alt="Card image cap">
                </div>
                <div class="card-body pt-0">
                  <h5 class="card-title">{{ card.name }}</h5>
                  <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                  <p class="card-text" v-if="card.profile === 'calciatore'">
                    {{ card.role }} | {{ card.age }}
                  </p>
                  <p class="card-text" v-if="card.profile === 'team'">
                    {{ card.fulladdress }} | {{ card.level }}
                  </p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>

          </div>


        </div>
      </section>


    <!-- <Footer /> -->
</div>
</template>


<script>
import axios from 'axios'

import Header from '@/components/Header'
// import Footer from '@/components/Footer'
export default {
  name: 'Result',
  components: {
    Header
    // Footer
  },
  data() {
    return {
      countries: []
    }
  },
  props: ['what', 'where'],
  methods: {
    userList: function() {
      this.error = null;
      // ../static/data/country.json
      // http://35.193.9.82:121/api/Search/FindUser
      axios.get('http://35.193.9.82:121/api/Search/FindUser', {})
        .then(response => {
          console.log('userList Response:', response)
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
        what,
        where
      } = this;
      return this.countries
        .filter(card => card.profile === what || card.where === where)
    }
  },
  mounted() {
    //from your component
    this.userList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
.hero-section {
    min-height: 900px;
    padding-top: 160px;
    display: block;
    background-image: url("../assets/images/hero-bg.png");
    background-size: cover;
    // background-color: #f3f7f9;
    background-position: right top;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;

    form {
        display: block;
        margin: 100px auto;
        // width: 950px;
        overflow: hidden;
        background: #FFF;
        border: 1px solid #E4E4E4;
        border-radius: 5px;
        font-size: 0;
    }

    form > div {
        display: inline-block;
        width: 100%;
    }

    form > div > label {
        display: block;
        padding: 20px 20px 10px;
        vertical-align: top;
        font-family: Source Sans Pro, Arial, sans-serif;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        color: #939393;
        cursor: pointer;
    }

    form > div.col-2,
    form > div.col-3,
    form > div.col-4 {
        box-shadow: 1px 1px #E4E4E4;
    }

    form > div.col-2 {
        width: 50%;
    }

    form > div.col-3 {
        width: 33.3333333333%;
    }

    form > div.col-4 {
        width: 25%;
    }

    form > div > label > input {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 27px;
        line-height: 27px;
        margin: 5px -5px 0;
        padding: 7px 5px 3px;
        border: none;
        outline: none;
        border-radius: 3px;
        background: transparent;
        font-size: 14px;
        font-weight: 200;
        opacity: 0.66;
        transition: opacity 0.3s;
    }

    form > div > label > select {
        display: block;
        width: 100%;
        margin: 16px 0 6px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        font-size: 14px;
        font-weight: 200;
        opacity: 0.33;
    }

    form > div > label > input:focus,
    form > div > label > select:focus {
        opacity: 1;
    }
}

.hero-section-home {
    &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 220px;
        // background-image: url("../images/IcoTirolibre.png");
        background-repeat: no-repeat;
        background-position: left center;
        background-size: contain;
        overflow: hidden;
    }
}
@media only screen and (max-width: 767px) {
    .hero-section {
        height: auto;
        padding-bottom: 100px;
        padding-top: 160px;
        background-position: right 50% top;
    }

    .hero-section-home {
        &::before {
            opacity: 0.3;
        }
    }
}

/*------------------
	Responsive
---------------------*/
@media (min-width: 1200px) {
    .container {
        max-width: 1170px;
    }
}
@media (max-width: 1585px) {
    .hero-section .laptop-image {
        left: 0;
    }
}
@media (max-width: 1425px) {
    .header-section .site-btn {
        margin-left: 0;
    }

    .hero-section {
        background-position: right 30% top;
    }

    .hero-section .laptop-image {
        width: auto;
        max-width: 100%;
        top: 70px;
    }
}
@media (min-width: 1199px) and (max-width: 1390px) {}
/* Medium screen : 992px. */
@media only screen and (min-width: 992px) and (max-width: 1199px) {
    .menu-list li a {
        margin-right: 15px;
    }

    .hero-section {
        background-position: right 23% top;
    }

}
/* Tablet :768px. */
@media only screen and (min-width: 768px) and (max-width: 991px) {
    .header-section {
        padding: 30px 15px 0;
    }

    .menu-list li a {
        margin-right: 6px;
    }

    .header-section .site-btn {
        margin-left: 10px;
    }

    .hero-section {
        background-position: right 25% top;
        height: 730px;
        padding-top: 160px;
    }
    .hero-text h2 {
        font-size: 45px;
    }

    .pull-3 {
        right: 0;
    }

    .push-8 {
        left: 0;
    }

}
/* Large Mobile :480px. */
@media only screen and (max-width: 767px) {
    .header-section {
        padding: 30px 0;
        background: #fff;
    }

    .header-section .responsive-bar {
        float: right;
        font-size: 25px;
        display: block;
        cursor: pointer;
    }

    .header-section .user {
        float: right;
        font-size: 25px;
        color: #333;
        margin-right: 20px;
        display: block;
    }

    .main-menu {
        float: none;
        position: absolute;
        width: 100%;
        left: 0;
        top: 100%;
        background: #fff;
        padding: 0 15px;
        display: none;
        -webkit-box-shadow: 0 14px 43px rgba(33, 54, 61, 0.15);
        box-shadow: 0 14px 43px rgba(33, 54, 61, 0.15);
    }

    .menu-list {
        list-style: none;
    }

    .menu-list li {
        display: block;
        border-top: 1px solid #e1e1e1;
    }

    .menu-list li a {
        display: block;
        padding: 10px 5px;
        margin-right: 0;
        color: #20509e;
    }

    .hero-text h2 {
        font-size: 40px;
    }

    .hero-section {
        height: auto;
        padding-bottom: 100px;
        padding-top: 160px;
        background-position: right 50% top;
    }

    .pull-3 {
        right: 0;
    }

    .push-8 {
        left: 0;
    }

    .header-section .site-btn {
        display: none;
    }

}
/* small Mobile :320px. */
@media only screen and (max-width: 479px) {}

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
