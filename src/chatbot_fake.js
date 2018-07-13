
import Vue from 'vue'
import BotUI from '../node_modules/botui/build/botui.js'
import '../node_modules/botui/build/botui.min.css'
// import '../node_modules/botui/build/botui-theme-default.css'
import '../static/css/botui-theme-tirolibre.css'

export default function initBotApp () {
  let homeBot = BotUI('home-bot', {vue: Vue})
  homeBot.message.add({
    content: 'Ciao benvenuto'
  }).then(function () {
    return homeBot.message.add({
      delay: 1000,
      loading: true,
      content: 'Vogliamo iniziare?  🙂'
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
          text: 'A!',
          value: 'who-A'
        }, {
          text: 'B',
          value: 'who-B'
        }]
      });
    }).then(function (res) {
      if(res.value == 'who-A') {
        step3();
      }
      if(res.value == 'who-B') {
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
          text: 'A!',
          value: 'what-A'
        }, {
          text: 'B',
          value: 'what-B'
        }]
      });
    }).then(function (res) {
      if(res.value == 'what-A') {
        where();
      }
      if(res.value == 'what-B') {
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
        content: '!(link) Vai alla nostra pagina risultati'
      });
    }).then(function () {
      end();
    });
  };

  var end = function () {
    // ga_record('message', 'end');
    homeBot.message.add({
      delay: 1000,
      content: '!(link) Vai alla nostra pagina risultati'
    });
  };

}




//
// // window.Vue = Vue; // use either this
// var homeBot = new BotUI('home-bot', {
//   vue: Vue // or this
// });
//
// homeBot.message.add({
//     // human: true,
//   content: 'Ciao benvenuto'
// }).then(function () {
//   return homeBot.message.add({
//     delay: 1500,
//     content: 'Vogliamo iniziare?  🙂'
//   });
// }).then(function () {
//   return homeBot.action.button({
//     delay: 1000,
//     action: [{
//       text: 'Certo!',
//       value: 'certo'
//     }, {
//       text: 'No 😒',
//       value: 'skip'
//     }]
//   });
// }).then(function (res) {
//   if(res.value == 'certo') {
//     bus.$emit('titleChanged', 'Vue Wizards');
//     step2();
//   }
//   if(res.value == 'skip') {
//     end();
//   }
// });
//
//
// var step2 = function () {
//   homeBot.message.add({
//     delay: 1000,
//     content: "Bene!"
//   }).then(function () {
//     return homeBot.message.add({
//       delay: 1200,
//       content: 'Chi sei?'
//     });
//   }).then(function () {
//     return homeBot.action.button({
//       delay: 1000,
//       action: [{
//         text: 'A!',
//         value: 'who-A'
//       }, {
//         text: 'B',
//         value: 'who-B'
//       }]
//     });
//   }).then(function (res) {
//     if(res.value == 'who-A') {
//       step3();
//     }
//     if(res.value == 'who-B') {
//       step3();
//     }
//   });
// };
//
// var step3 = function () {
//   homeBot.message.add({
//     delay: 1000,
//     content: "Ottimo!"
//   }).then(function () {
//     return homeBot.message.add({
//       delay: 1200,
//       content: 'Cosa stai cercando?'
//     });
//   }).then(function () {
//     return homeBot.action.button({
//       delay: 1000,
//       action: [{
//         text: 'A!',
//         value: 'what-A'
//       }, {
//         text: 'B',
//         value: 'what-B'
//       }]
//     });
//   }).then(function (res) {
//     if(res.value == 'what-A') {
//       where();
//     }
//     if(res.value == 'what-B') {
//       where();
//     }
//   });
// };
//
//
// var where = function () {
//   homeBot.message.add({
//     delay: 1000,
//     content: "Fantastico!"
//   }).then(function () {
//     return homeBot.message.add({
//       delay: 1200,
//       content: 'Di dove sei?'
//     });
//   }).then(function () {
//     return homeBot.action.text({
//       delay: 800,
//       action: {
//         value: 'Roma',
//         placeholder: 'Di dove sei?'
//       }
//     });
//   }).then(function (res) {
//     return homeBot.message.bot({
//       delay: 500,
//       content: 'Scopri come abbiamo trovato a ' + res.value + '!'
//     });
//   }).then(end);
// };
//
// var search = function () {
//   homeBot.message.add({
//     delay: 1000,
//     content: "Bene!"
//   }).then(function () {
//     return homeBot.message.add({
//       delay: 1200,
//       content: '!(link) Vai alla nostra pagina risultati'
//     });
//   }).then(function () {
//     end();
//   });
// };
//
// var end = function () {
//   // ga_record('message', 'end');
//   homeBot.message.add({
//     delay: 1000,
//     content: '!(link) Vai alla nostra pagina risultati'
//   });
// };
