<template>
<footer class="footer-section">
  <div class="container">
    <div class="row spad">
      <div class="col-md-4 footer-widget">
        <p>VIA MARSALA 29/H</p>
        <p> 00185 ROMA, ITALIA </p>
        <p>P.IVA: IT 14602891005</p>
      </div>

      <div class="col-md-4 footer-widget">
        <img src="../assets/images/TiroLibreLogo_black.png" class="d-inline-block align-top" alt="TiroLibre" width="150px">
        <p>
          Copyright &copy;2018 All rights reserved
        </p>
      </div>
      <div class="col-md-4 footer-widget pl-lg-5 pl-3">
        <h5 class="widget-title">Seguici su</h5>
        <div class="social">
          <a href="https://www.facebook.com/Tiro.Libre16/" class="facebook"><i class="fa fa-facebook"></i></a>
          <a href="https://www.linkedin.com/in/tiro-libre-425094121/" class="linkedin"><i class="fab fa-linkedin"></i></a>
          <a href="https://www.instagram.com/tirolibre.it/" class="instagram"><i class="fa fa-instagram"></i></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="row">
        <div class="col-lg-8 text-center text-lg-right">
          <ul class="footer-nav">
            <li><a href="https://www.iubenda.com/privacy-policy/7839753">Privacy Policy</a></li>
            <li><a href="https://www.iubenda.com/privacy-policy/7839753/cookie-policy">Cookie Policy</a></li>
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
    line-height: 38px;
    font-size: 18px;
    color: #FFF !important;
}

.social a:last-child {
    margin-right: 0;
}

.social .facebook {
    background: #3866b8;
}

.social .linkedin {
    background: #0078ba;
}

.social .instagram {
    background: #ff9b1b;
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
