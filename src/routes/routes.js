import DashboardLayout from '@/components/Dashboard/DashboardLayout.vue'

//                       Player Profile                                           //
import PlayerProfileManager from '@/pages/UserProfile/PlayerProfileManager.vue'
import PlayerMaps from '@/pages/UserProfile/PlayerMaps.vue'
import PlayerMarket from '@/pages/UserProfile/PlayerMarket.vue'
import PlayerProfileView from '@/pages/UserProfile/PlayerProfileView.vue'
import UpgradeToPRO from '@/pages/UserProfile/UpgradeToPRO.vue'
//                       END Player Profile                                       //


import AgentProfileManager from '@/pages/AgentProfile/AgentProfileManager.vue'
import Portfolio from '@/pages/AgentProfile/Portfolio.vue'


import HomeView from '@/pages/Home/Home.vue'
import ResultView from '@/pages/Home/Result'
import WelcomeView from '@/pages/Welcome'

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
    props: (route) => ({
        player: route.query.name
    })
  },
  {
    path: '/playerProfile',
    name: 'PlayerProfile',
    component: PlayerProfileView
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'agent',
        name: 'Agent Profile',
        component: AgentProfileManager
      },
      {
        path: 'player',
        name: 'Player Profile',
        component: PlayerProfileManager
      },
      {
        path: 'maps',
        name: 'Maps',
        meta: {
          hideFooter: true
        },
        component: PlayerMaps

      },
      {
        path: 'market',
        name: 'Market',
        meta: {
          hideFooter: true
        },
        component: PlayerMarket

      },
      {
        path: 'portfolio',
        name: 'Portfolio',
        meta: {
          hideFooter: true
        },
        component: Portfolio

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
