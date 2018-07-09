<template>
<section class="process-section spad">
  <div class="container">
    <div class="section-title text-center">
      <h2>Come funziona</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
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
</template>

<script>
export default {
  name: 'Process'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
</style>
