<template>
<div class="col-md-12">
  <a class="link link--nukun" href="#">Tir<span>O</span>Libre</a>
  <h1 class="display-4">Il contatto diretto con<br /> <span>squadre</span> e <span>calciatori</span></h1>
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
    font-family: 'Roboto', sans-serif;
    font-weight: 700; //bold
    font-size: 2.5em;
    text-align: left;
    span {
        text-transform: uppercase;
    }
}
.link--nukun {
    color: #E3E8DC;
    font-weight: 900;
    text-transform: uppercase;
    overflow: hidden;
    padding: 10px 0;
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
}

.link {
    float: left;
    outline: none;
    text-decoration: none;
    position: relative;
    font-size: 5em;
    line-height: 1;
    // color: #9e9ba4;
    color: #1e1a1b;
    display: inline-block;
}
.link--nukun::after,
.link--nukun::before {
    content: '';
    position: absolute;
    width: 30%;
    height: 5px;
    background: #E3E8DC;
    bottom: 0;
    left: 35%;
    -webkit-transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
    -webkit-transition-timing-function: cubic-bezier(0.2,1,0.3,1);
    transition-timing-function: cubic-bezier(0.2,1,0.3,1);
}
.link--nukun span {
    // color: #E3E8DC;
    color: #088039;
    display: inline-block;
    position: relative;
    -webkit-transform: perspective(1000px) rotate3d(0,1,0,0deg);
    transform: perspective(1000px) rotate3d(0,1,0,0deg);
    -webkit-transition: -webkit-transform 0.5s, color 0.5s;
    transition: transform 0.5s, color 0.5s;
    -webkit-transition-timing-function: cubic-bezier(0.2,1,0.3,1);
    transition-timing-function: cubic-bezier(0.2,1,0.3,1);
}
.link--nukun::after {
    background: #ACD07A;
    -webkit-transform: translate3d(-300%,0,0) scale3d(0,1,1);
    transform: translate3d(-300%,0,0) scale3d(0,1,1);
}
.link--nukun:hover {
    // color: #1e1a1b;
    color: #046c93;
}
.link--nukun:hover::before {
    -webkit-transform: translate3d(300%,0,0) scale3d(0,1,1);
    transform: translate3d(300%,0,0) scale3d(0,1,1);
}
.link--nukun:hover span {
    background-image: url("/static/img/icoTiroLibre.8ba6833.png");
    background-size: contain;
    background-repeat: no-repeat;
    color: transparent;
    -webkit-transform: perspective(1000px) rotate3d(0,1,0,360deg);
    transform: perspective(1000px) rotate3d(0,1,0,360deg);
}
.link--nukun:hover::after {
    -webkit-transform: translate3d(0,0,0) scale3d(1,1,1);
    transform: translate3d(0,0,0) scale3d(1,1,1);
}
@media only screen and (max-width: 479px) {
    h1 {
        text-align: center;
    }
}
</style>
