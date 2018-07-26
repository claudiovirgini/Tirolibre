import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/layout/Home'
import ResultView from '@/layout/Result'
import PlayerView from '@/layout/Player'
import WelcomeView from '@/layout/Welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/confirm',
      name: 'Welcome',
      component: WelcomeView
    },
    {
      path: '/result',
      name: 'Result',
      component: ResultView,
      // Inject  props based on route.query values (our query parameters!)
      props: (route) => ({
          player: route.query.name
      })
    },
    {
      path: '/player',
      name: 'Player',
      component: PlayerView,
      // Inject  props based on route.query values (our query parameters!)
      props: (route) => ({
          player: route.query.name
      })
    }
  ]
  // mode: 'history'
})
