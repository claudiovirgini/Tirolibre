<template>
<div id="app">
  <Header />
  <router-view></router-view>
</div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
<style>
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700');
@import url('https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700');
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900');
#app {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}


body,
html {
  height: 100%;
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
}

*:hover {
  -webkit-transition: all 1s ease;
  transition: all 1s ease;
}

img {
  max-width: 100%;
}

button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: none;
}

a:focus,
a:hover {
  text-decoration: none;
  outline: none;
}

ol,
ul {
  padding: 0;
  margin: 0;
}



h1,
h2,
h3,
h4,
h5,
h6 {
  color: #FFF;
  margin: 0;
  font-weight: 500;
  /* font-family: "Futura", sans-serif; */
}

h1 {
  font-size: 70px;
}

h2 {
  font-size: 48px;
}

h3 {
  font-size: 30px;
  color: #FFF;
}

h4 {
  font-size: 24px;
}

h5 {
  font-size: 20px;
}

h6 {
  font-size: 14px;
}

p {
  font-size: 15.7px;
  color: #75849a;
  line-height: 1.6;
}

h1 {
  float: left;
  width: 100%;
  color: #FFF;
  margin-bottom: 30px;
  font-size: 14px;
}

.btn-to-top {
  width: 60px;
  height: 60px;
  padding: 10px 16px;
  border-radius: 5px;
  font-size: 22px;
  line-height: 22px;
  background-color: rgba(1, 14, 27, .7);
  color: #FFF;
}

.btn-radius {
  border-radius: 50px !important;
}

.btn-success {
  background-color: #f5ff00;
  color: #000;
  border-color: #f3fd0a;
}

.md-dialog-container {
  max-width: 100%;
}

.md-list-item .md-list-item-container .md-ripple>span {
  padding: 0 15px;
}

.main-panel {
  background-image: url("./assets/images/black-bg.png");
  background-size: cover;
}
</style>
