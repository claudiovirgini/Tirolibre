<template>
<footer class="footer-section">
  <div class="container">
    <div class="row spad">
      <div class="col-md-6 col-lg-3 footer-widget">
        <!-- <img src="assets/images/logo.png" class="mb-4" alt=""> -->
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dese mollit anim id est laborum.</p>
        <span>
  Copyright &copy;2018 All rights reserved | Made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="http://www.tirolibre.it" target="_blank">TiroLibre</a>
        </span>
      </div>
      <div class="col-md-6 col-lg-3 offset-lg-6 footer-widget pl-lg-5 pl-3">
        <h5 class="widget-title">Follow Us</h5>
        <div class="social">
          <a href="" class="facebook"><i class="fa fa-facebook"></i></a>
          <a href="" class="google"><i class="fa fa-google-plus"></i></a>
          <a href="" class="instagram"><i class="fa fa-instagram"></i></a>
          <a href="" class="twitter"><i class="fa fa-twitter"></i></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="row">
        <div class="col-lg-8 text-center text-lg-right">
          <ul class="footer-nav">
            <li><a href="">DPA</a></li>
            <li><a href="">Terms of Use</a></li>
            <li><a href="">Privacy Policy </a></li>
            <li><a href="">support@company.com</a></li>
            <li><a href="">(123) 456-7890</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
footer {
    // background-color: #dfeaf0;
    border-top: 1px solid #dfeaf0;
}

.footer-widget span {
    color: #acb9cc;
}

.footer-widget p {
    margin-bottom: 20px;
}

.footer-widget .widget-title {
    margin-bottom: 30px;
    font-size: 20px;
}

.footer-widget ul {
    list-style: none;
}

.footer-widget ul a {
    font-size: 16px;
    color: #75849a;
    display: block;
    margin-bottom: 12px;
}

.footer-widget ul li:last-child a {
    margin-bottom: 0;
}

.social a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    display: inline-block;
    margin-right: 10px;
    text-align: center;
    padding-top: 7px;
    font-size: 18px;
}

.social a:last-child {
    margin-right: 0;
}

.social .facebook {
    background: #4b6cd0;
}

.social .google {
    background: #f03b3b;
}

.social .instagram {
    background: #bb8950;
}

.social .twitter {
    background: #49a7f3;
}

.footer-bottom {
    border-top: 1px solid #ebebeb;
    padding: 30px 0;
}

.footer-nav {
    list-style: none;
}

.footer-nav li {
    display: inline-block;
}

.footer-nav li a {
    color: #75849a;
    font-size: 14px;
    margin-left: 20px;
}
</style>
