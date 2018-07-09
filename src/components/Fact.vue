<template>
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
</template>

<script>
export default {
  name: 'Fact'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
</style>
