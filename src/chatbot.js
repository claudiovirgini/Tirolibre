
import Vue from 'vue'
import BotUI from '../node_modules/botui/build/botui.js'
import '../node_modules/botui/build/botui.min.css'
// import '../node_modules/botui/build/botui-theme-default.css'
import '../static/css/botui-theme-tirolibre.css'

export default function initBotApp () {
  let homeBot = BotUI('home-bot', {vue: Vue})
  homeBot.message.add({
    content: 'Ciao benvenuto su Tirolibre'
  }).then(function () {
    return homeBot.message.add({
      delay: 1000,
      loading: true,
      content: 'Vuoi scoprire le ultime offerte del mondo del calcio?'
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
        content: 'Quale è il tuo profilo calcistico?'
      });
    }).then(function () {
      return homeBot.action.button({
        delay: 1000,
        action: [{
          text: 'Calciatore',
          value: 'who-calciatore'
        },
        {
          text: 'Club',
          value: 'who-club'
        },
        {
          text: 'Agente',
          value: 'who-agente'
        },
        {
          text: 'DS',
          value: 'who-ds'
        },
        {
          text: 'Allenatore',
          value: 'who-allenatore'
        }
      ]
      });
    }).then(function (res) {
      if(res.value == 'who-calciatore') {
        step3Calciatore();
      }
      if(res.value == 'who-club') {
        step3Club();
      }
      if(res.value == 'who-agente') {
        step3Agente();
      }
      if(res.value == 'who-ds') {
        step3Ds();
      }
      if(res.value == 'who-allenatore') {
        step3Allenatore();
      }
    });
  };

  var step3Calciatore = function () {
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
          text: 'Club',
          value: 'calciatore-what-club'
        },
        {
          text: 'Agente',
          value: 'calciatore-what-agente'
        },
        {
          text: 'DS',
          value: 'calciatore-what-ds'
        }
      ]
      });
    }).then(function (res) {
        where();
      // if(res.value == 'what-A') {
      //   where();
      // }
      // if(res.value == 'what-B') {
      //   where();
      // }
    });
  };

  var step3Club = function () {
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
          text: 'Calciatore',
          value: 'club-what-calciatore'
        },
        {
          text: 'Allenatore',
          value: 'club-what-allenatore'
        },
        {
          text: 'DS',
          value: 'club-what-ds'
        },
        {
          text: 'Crea Annuncio',
          value: 'club-what-annuncio'
        }
      ]
      });
    }).then(function (res) {
        where();
    });
  };

  var step3Agente = function () {
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
          text: 'Calciatore',
          value: 'agente-what-calciatore'
        },
        {
          text: 'Club',
          value: 'agente-what-club'
        },
        {
          text: 'DS',
          value: 'agente-what-ds'
        },
        {
          text: 'Crea Annuncio',
          value: 'agente-what-annuncio'
        }
      ]
      });
    }).then(function (res) {
        where();
    });
  };

  var step3Ds = function () {
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
          text: 'Calciatore',
          value: 'ds-what-calciatore'
        },
        {
          text: 'Club',
          value: 'ds-what-club'
        },
        {
          text: 'Allenatore',
          value: 'ds-what-allenatore'
        },
        {
          text: 'Crea Annuncio',
          value: 'ds-what-annuncio'
        }
      ]
      });
    }).then(function (res) {
        where();
    });
  };

  var step3Allenatore = function () {
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
          text: 'Calciatore',
          value: 'allenatore-what-calciatore'
        },
        {
          text: 'Club',
          value: 'allenatore-what-club'
        },
        {
          text: 'DS',
          value: 'allenatore-what-ds'
        },
        {
          text: 'Crea Annuncio',
          value: 'allenatore-what-annuncio'
        }
      ]
      });
    }).then(function (res) {
        where();
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
          placeholder: 'Dove stai cercando?'
        }
      });
    }).then(function (res) {
      return homeBot.message.bot({
        delay: 500,
        content: 'Scopri cosa abbiamo trovato a ' + res.value + '!'
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
        content: '!(link) Vai alla nostra pagina risultati'
      });
    }).then(function () {
      end();
    });
  };

  var end = function (res) {
    // ga_record('message', 'end');
    homeBot.message.add({
      delay: 1000,
      loading: true,
      content: '!(link) Vai alla nostra pagina risultati [tirolibre.it](http://localhost:8080/#/result)'
    });
  };

}
