import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Dashboard from '@/pages/Dashboard.vue'
import UserProfile from '@/pages/UserProfile.vue'
import Maps from '@/pages/Maps.vue'
import UpgradeToPRO from '@/pages/UpgradeToPRO.vue'


import HomeView from '@/layout/Home'
import ResultView from '@/layout/Result'
import WelcomeView from '@/layout/Welcome'
import UserProfileView from '@/layout/UserProfile'

const routes = [
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
    path: '/userProfile',
    name: 'UserProfile',
    component: UserProfileView
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'user',
        name: 'User Profile',
        component: UserProfile
      },
      {
        path: 'maps',
        name: 'Maps',
        meta: {
          hideFooter: true
        },
        component: Maps

      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: UpgradeToPRO
      }
    ]
  }
]

export default routes
