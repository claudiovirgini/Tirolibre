import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/layout/Home'
import ResultView from '@/layout/Result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      // Inject  props based on route.query values (our query parameters!)
        props: (route) => ({
            to: route.query.to
        })
    },
    {
      path: '/result',
      name: 'Result',
      component: ResultView,
        props: (route) => ({
            to: route.query.to
        })
    }
  ]
})
