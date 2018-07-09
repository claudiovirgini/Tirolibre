<template lang="html">
  <div>
    <Header />
    <section class="hero-section hero-section-home">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <!-- container element for chat window -->
            <div id="chat"></div>
          </div>
          <!-- <div class="col-md-6">
            <img src="assets/images/icoTiroLibre.png" class="" alt="TiroLibre">
          </div> -->
        </div>
      </div>
    </section>

    <section class="process-section spad">
      <div class="container">
        <div class="section-title text-center">
          <h2>Come funziona</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
        </div>
        <div class="row">
          <div class="col-md-4 process">
            <div class="process-step">
              <figure class="process-icon">
                <img src="https://www.shareicon.net/data/512x512/2016/06/27/787154_people_512x512.png" alt="#" class="img-thumbnail">
              </figure>
              <h4>Crea il tuo profilo</h4>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
            </div>
          </div>
          <div class="col-md-4 process">
            <div class="process-step">
              <figure class="process-icon">
                <img src="https://pbs.twimg.com/profile_images/599257844983037952/_5YDb4qI.png" alt="#" class="img-thumbnail">
              </figure>
              <h4>Contatta il club</h4>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
            </div>
          </div>
          <div class="col-md-4 process">
            <div class="process-step">
              <figure class="process-icon">
                <img src="http://hyipstat.top/blog/1/1420/1510900659.jpg" alt="#" class="img-thumbnail">
              </figure>
              <h4>Bella pe te</h4>
              <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section class="fact-section gradient-bg">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-md-6 col-lg-3">
            <div class="fact">
              <h2>60</h2>
              <p>Calciatori</p>
              <i class="ti-basketball"></i>
            </div>
          </div>
          <div class="col-sm-6 col-md-6 col-lg-3">
            <div class="fact">
              <h2>120</h2>
              <p>Club</p>
              <i class="ti-panel"></i>
            </div>
          </div>
          <div class="col-sm-6 col-md-6 col-lg-3">
            <div class="fact">
              <h2>50</h2>
              <p>Coach</p>
              <i class="ti-stats-up"></i>
            </div>
          </div>
          <div class="col-sm-6 col-md-6 col-lg-3">
            <div class="fact">
              <h2>24</h2>
              <p>Agenti</p>
              <i class="ti-user"></i>
            </div>
          </div>
        </div>
      </div>
    </section>



      <!-- Review section -->
      <section class="review-section spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 push-8">
              <img src="https://colorlib.com/preview/theme/cryptocurrency/img/quote.png" alt="" class="quote mb-5">
              <div class="review-text-slider owl-carousel">
                <div class="review-text">
                  <p>"Organizzazione seria e precisa, che ti segue su ogni dettaglio e soddisfa i tuoi criteri di ricerca”</p>
                </div>
                <div class="review-text">
                  <p>"Servizio davvero efficente ed utile. Ringrazio lo staff di TiroLibre per il loro lavoro e consiglio a tutti di utilizzare questa piattaforma”</p>
                </div>
                <div class="review-text">
                  <p>"TiroLibre es un equipo de gente que trabaja de manera muy profesional con la atencion el interes de los futbolistas y los clubes, logrando ayudar a ambas partes a obtener los resultados que estan buscando!”</p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 pr-0 pull-3">
              <div class="review-meta-slider owl-carousel pt-5">
                <div class="author-meta">
                  <div class="author-avatar set-bg" data-setbg="http://www.claudiovirgini.com/private/tirolibre/assets/images/1.jpg"></div>
                  <div class="author-name">
                    <h4>Riccardo Casagrande</h4>
                    <p>Calciatore</p>
                  </div>
                </div>
                <div class="author-meta">
                  <div class="author-avatar set-bg" data-setbg="http://www.claudiovirgini.com/private/tirolibre/assets/images/2.jpg"></div>
                  <div class="author-name">
                    <h4>Daniele Palamà</h4>
                    <p>Agente</p>
                  </div>
                </div>
                <div class="author-meta">
                  <div class="author-avatar set-bg" data-setbg="http://www.claudiovirgini.com/private/tirolibre/assets/images/3.jpg"></div>
                  <div class="author-name">
                    <h4>Lucas German Surber</h4>
                    <p>Calciatore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Review section end -->



    <!-- <Review /> -->
    <Footer />
</div>
</template>




<script>
import Header from '@/components/Header'
import Review from '@/components/Review'
import Footer from '@/components/Footer'
export default {
  name: 'Home',
  components: {
    Header,
    Review,
    Footer
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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

.profile-wrapper.active {
    opacity: 1;
    bottom: -6px;
}

.profile-wrapper {
    transition: bottom 0.30s,opacity 0.30s;
    z-index: 100000;
    display: block;
    background-color: #fff;
    border-radius: 20px 20px 0 0;
    position: fixed;
    bottom: 0;
    right: 20px;
    box-shadow: 0 -2px 4px 4px rgba(0,0,0,0.1);
    opacity: 0;
}

.profile-wrapper .close {
    color: #364053;
    position: absolute;
    right: 0;
    top: 0;
    padding: 12px;
    font-size: 22px;
    cursor: pointer;
}

.profile-wrapper a.play-video {
    margin-top: 30px;
    display: block;
    height: 140px;
    width: 260px;
    // background-image: url("../images/IcoTirolibre.png");
    background-position: 50% 100%;
    background-repeat: no-repeat;
    background-size: contain;
    outline: 0;
    opacity: 0.3;
}
/*---------------------
	Process Section
-----------------------*/
.spad {
    padding-top: 100px;
    padding-bottom: 90px;
}

.section-title {
    margin-bottom: 60px;

    h2 {
        color: #20509e;
        margin-bottom: 20px;
        font-size: 48px;
    }

    p {
        font-size: 15.7px;
        color: #75849a;
        line-height: 1.6;
    }
}

.process:last-child .process-step:after {
    display: none;
}

.process-step {
    position: relative;
    text-align: center;
    padding: 35px;
    margin-top: 30px;
    -webkit-box-shadow: 0 14px 43px rgba(33, 54, 61, 0.15);
    box-shadow: 0 14px 43px rgba(33, 54, 61, 0.15);

    &::after {
        position: absolute;
        content: '';
        width: 275px;
        height: 56px;
        top: -40px;
        right: -40%;
        background: url("https://colorlib.com/preview/theme/cryptocurrency/img/process-line.png") no-repeat scroll 0 0/cover;
    }

    .process-icon {
        // height: 55px;
        margin-bottom: 30px;
        padding-top: 5px;
    }

    h4 {
        color: #20509e;
    }

    p {
        font-size: 15.7px;
        color: #75849a;
        line-height: 1.6;
    }
}
/*---------------------
	Fact Section
-----------------------*/
.fact-section {
    padding: 100px 0;
}

.comment .comment-content .c-btn:hover,
.comment-form label,
.gradient-bg,
.member-social a:hover,
.single-blog-page .social-share a:hover,
.site-btn.sb-gradients {
    /* FF3.6-15 */
    /* Chrome10-25,Safari5.1-6 */
    background: -webkit-gradient(linear, left top, right top, from(#3e2bce), color-stop(100%, #2dd3aa), color-stop(100%, #2dd3aa), to(#2dd3aa));
    background: -o-linear-gradient(left, #3e2bce 0%, #2dd3aa 100%, #2dd3aa 100%, #2dd3aa 100%);
    background: linear-gradient(to right, #3e2bce 0%, #2dd3aa 100%, #2dd3aa 100%, #2dd3aa 100%);
}

.fact {
    h2 {
        float: left;
        color: #16d0c5;
        font-size: 60px;
        margin-right: 20px;
    }

    p {
        padding-top: 7px;
        float: left;
        padding-top: 14px;
        line-height: 1.4;
        color: #fff;
        text-transform: uppercase;
    }
}
/*---------------------
  Review Section
-----------------------*/
.review-meta-slider {
    position: relative;
    width: 300px;
}

.author-meta {
    padding: 50px 0 70px;
    position: relative;
    text-align: center;
}

.author-meta:last-child {
    margin-right: 0;
}

.author-avatar {
    width: 80px;
    height: 80px;
    border: 6px solid #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 16px 21px rgba(33, 54, 61, 0.15);
    box-shadow: 0 16px 21px rgba(33, 54, 61, 0.15);
    display: inline-block;
}

.author-avatar h4 {
    font-size: 22px;
}

.author-avatar p {
    font-size: 14px;
}

.author-name {
    position: absolute;
    width: 280px;
    left: -50%;
    bottom: -10px;
    margin-left: -50px;
    text-align: center;
    visibility: hidden;
}

.center .author-meta {
    top: -6px;
}

.center .author-name {
    visibility: visible;
}

.center .author-avatar {
    width: 100px;
    height: 100px;
}

.review-text p {
    font-size: 22px;
}

.review-text-slider .owl-nav {
    padding-top: 15px;
}

.review-text-slider .owl-next,
.review-text-slider .owl-prev {
    width: 50px;
    height: 50px;
    display: inline-block;
    background: #cbd3df;
    color: #fff;
    font-size: 24px;
    text-align: center;
    margin-right: 10px;
    border-radius: 50%;
    padding-top: 8px;
}

.pull-3 {
    right: 66.666667%;
}

.push-8 {
    left: 33.333333%;
}

.set-bg {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    color: #20509e;
    margin: 0;
    font-weight: 500;
    font-family: "Futura", sans-serif;
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

    .hero-section,
    .page-info-section {
        background-position: right 30% top;
    }

    .hero-section .laptop-image {
        width: auto;
        max-width: 100%;
        top: 70px;
    }

    .about-img {
        left: -50px;
        width: 600px;
    }
}
@media (min-width: 1199px) and (max-width: 1390px) {
    .member {
        padding: 35px 10px;
    }

    .member-img {
        width: 160px;
        height: 160px;
    }

    .member-info {
        padding: 50px 27px 10px;
        height: 275px;
    }

    .member-social a {
        margin: 0 5px;
    }
}
/* Medium screen : 992px. */
@media only screen and (min-width: 992px) and (max-width: 1199px) {
    .menu-list li a {
        margin-right: 15px;
    }

    .hero-section,
    .page-info-section {
        background-position: right 23% top;
    }

    .about-img {
        left: 0;
        width: 480px;
    }

    .member {
        width: calc(33.333333% - 25px);
        margin-bottom: 30px;
    }

    .team-members {
        text-align: center;
    }

    .fact h2 {
        font-size: 45px;
        margin-right: 10px;
    }

    .fact p {
        padding-top: 7px;
    }

    .fact i {
        font-size: 67px;
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

    .page-info-section {
        background-position: right 33% top;
    }

    .page-info-section h2 {
        font-size: 40px;
    }

    .hero-text h2 {
        font-size: 45px;
    }

    .process-step:after {
        width: 154px;
        height: 35px;
        top: -10px;
        right: -44%;
        background-size: contain;
    }

    .about-img {
        position: relative;
        display: block;
        left: 0;
        width: auto;
        margin-top: 50px;
    }

    .member {
        width: calc(33.333333% - 25px);
        margin-bottom: 30px;
        padding: 35px 10px;
    }

    .member-img {
        width: 160px;
        height: 160px;
    }

    .member-info {
        padding: 50px 27px 10px;
        height: 275px;
    }

    .member-social a {
        margin: 0 5px;
    }

    .team-members {
        text-align: center;
    }

    .fact {
        margin-bottom: 30px;
    }

    .pull-3 {
        right: 0;
    }

    .push-8 {
        left: 0;
    }

    .review-section {
        text-align: center;
    }

    .review-text {
        padding: 0 60px;
    }

    .review-text-slider .owl-nav {
        padding-top: 0;
        position: absolute;
        top: 50%;
        margin-top: -45px;
        left: 0;
        width: 100%;
    }

    .review-text-slider .owl-prev {
        float: left;
    }

    .review-text-slider .owl-next {
        float: right;
    }

    .review-meta-slider {
        margin: auto;
    }

    .author-meta {
        padding-top: 0;
    }

    .newsletter-form {
        padding-left: 0;
    }

    .footer-widget {
        margin-bottom: 30px;
    }

    .newsletter-section {
        text-align: center;
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

    .page-info-section {
        background-position: right 56% top;
        margin-top: 97px;
    }

    .page-info-section h2 {
        font-size: 40px;
    }

    .about-img {
        position: relative;
        display: block;
        left: 0;
        width: auto;
        margin-top: 50px;
    }

    .team-members {
        margin: 0;
        padding: 0 15px;
    }

    .member {
        width: 100%;
        margin-bottom: 30px;
        margin-left: 0;
    }

    .fact {
        margin-bottom: 30px;
    }

    .process-step:after {
        display: none;
    }

    .pull-3 {
        right: 0;
    }

    .push-8 {
        left: 0;
    }

    .review-section {
        text-align: center;
    }

    .review-text {
        padding: 0 60px;
    }

    .review-text-slider .owl-nav {
        padding-top: 0;
        position: absolute;
        top: 50%;
        margin-top: -45px;
        left: 0;
        width: 100%;
    }

    .review-text-slider .owl-prev {
        float: left;
    }

    .review-text-slider .owl-next {
        float: right;
    }

    .review-meta-slider {
        margin: auto;
    }

    .author-meta {
        padding-top: 0;
    }

    .header-section .site-btn {
        display: none;
    }

    .newsletter-form {
        padding-left: 0;
    }

    .newsletter-section {
        text-align: center;
    }

    .review-text p {
        font-size: 20px;
    }

    .blog-item {
        margin-bottom: 30px;
    }

    .footer-widget {
        margin-bottom: 30px;
    }

    .single-blog-page .social-share {
        text-align: left;
        margin-top: 20px;
    }
}
/* small Mobile :320px. */
@media only screen and (max-width: 479px) {
    .review-text {
        padding: 0 45px;
    }

    .review-text p {
        font-size: 18px;
    }

    .newsletter-form input {
        padding-right: 30px;
    }

    .newsletter-form button {
        position: relative;
        padding: 14px;
        border-radius: 50px;
        margin-top: 23px;
    }

    .review-text-slider .owl-next,
    .review-text-slider .owl-prev {
        width: 40px;
        height: 40px;
        font-size: 18px;
    }

    .review-meta-slider {
        width: auto;
    }

    .member-img {
        width: 180px;
        height: 180px;
    }

    .member-info {
        padding: 50px 20px 10px;
        height: 320px;
    }

    .blog-text {
        padding: 15px;
    }

    .comment .comment-avator {
        float: none;
        margin-bottom: 20px;
    }

    .comment .comment-content {
        padding-left: 0;
    }
}
</style>
