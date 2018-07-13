// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// window.Vue = Vue; // use either this
var homeBot = new BotUI('home-demo', {
  vue: Vue // or this
});

homeBot.message.add({
    // human: true,
  content: 'Ciao benvenuto in TiroLibre'
}).then(function () {
  return homeBot.message.add({
    delay: 1500,
    content: 'Sono pronto a guidarti alla scoperta del mondo del calcio...Vogliamo iniziare?  🙂'
  });
}).then(function () {
  return homeBot.action.button({
    delay: 1000,
    action: [{
      text: 'Certo!',
      value: 'certo'
    }, {
      text: 'No 😒',
      value: 'skip'
    }]
  });
}).then(function (res) {
  if(res.value == 'certo') {
    step2();
  }
  if(res.value == 'skip') {
    end();
  }
});


var step2 = function () {
  homeBot.message.add({
    delay: 1000,
    content: "Bene!"
  }).then(function () {
    return homeBot.message.add({
      delay: 1200,
      content: 'Chi sei?'
    });
  }).then(function () {
    return homeBot.action.button({
      delay: 1000,
      action: [{
        text: 'Calciatore!',
        value: 'who-player'
      }, {
        text: 'Team',
        value: 'who-team'
      }]
    });
  }).then(function (res) {
    if(res.value == 'who-player') {
      step3();
    }
    if(res.value == 'who-team') {
      step3();
    }
  });
};

var step3 = function () {
  homeBot.message.add({
    delay: 1000,
    content: "Ottimo!"
  }).then(function () {
    return homeBot.message.add({
      delay: 1200,
      content: 'Cosa stai cercando?'
    });
  }).then(function () {
    return homeBot.action.button({
      delay: 1000,
      action: [{
        text: 'Calciatore!',
        value: 'what-player'
      }, {
        text: 'Team',
        value: 'what-team'
      }]
    });
  }).then(function (res) {
    if(res.value == 'what-player') {
      where();
    }
    if(res.value == 'what-team') {
      where();
    }
  });
};


var where = function () {
  homeBot.message.add({
    delay: 1000,
    content: "Fantastico!"
  }).then(function () {
    return homeBot.message.add({
      delay: 1200,
      content: 'Di dove sei?'
    });
  }).then(function () {
    return homeBot.action.text({
      delay: 800,
      action: {
        value: 'Roma',
        placeholder: 'Di dove sei?'
      }
    });
  }).then(function (res) {
    return homeBot.message.bot({
      delay: 500,
      content: 'Scopri come abbiamo trovato a ' + res.value + '!'
    });
  }).then(end);
};

var search = function () {
  homeBot.message.add({
    delay: 1000,
    content: "Bene!"
  }).then(function () {
    return homeBot.message.add({
      delay: 1200,
      content: '!(link) Vai alla nostra pagina risultati [tirolibre.it](http://www.tirolibre.it/)'
    });
  }).then(function () {
    end();
  });
};

var end = function () {
  // ga_record('message', 'end');
  homeBot.message.add({
    delay: 1000,
    content: '!(link) Vai alla nostra pagina risultati [tirolibre.it](http://www.tirolibre.it/)'
  });
};
