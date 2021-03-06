// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

// router setup
import routes from './routes/routes'

// store
import { store } from './store/store'


// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notifications from './components/NotificationPlugin'
import BackToTop from 'vue-backtotop'
import Carousel3d from 'vue-carousel-3d'
import moment from 'vue-moment'
import VueChatScroll from 'vue-chat-scroll'
import Croppa from 'vue-croppa'




// MaterialDashboard plugin
import MaterialDashboard from './material-dashboard'

import Chartist from 'chartist'


// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: 'nav-item active'
})

Vue.use(VueRouter)
Vue.use(MaterialDashboard)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)
Vue.use(BackToTop)
Vue.use(Carousel3d)
Vue.use(moment);
Vue.use(VueChatScroll);
Vue.use(Croppa);

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})
export const serverBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,

  data: {
    Chartist: Chartist
  }
})
