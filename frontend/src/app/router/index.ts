import { useAuthStore } from '@features/auth/auth-store'
import DestinationView from '@features/destination/DestinationView.vue'
import { useDestinationStore } from '@features/destination/destination-store'
import HomeView from '@features/home/HomeView.vue'
import LoginView from '@features/login/LoginView.vue'
import MapView from '@features/map/MapView.vue'
import TripView from '@features/trip/TripView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/destination',
      name: 'Destination',
      component: DestinationView
    },
    {
      path: '/map',
      name: 'Map',
      component: MapView
    },
    {
      path: '/trip',
      name: 'Trip',
      component: TripView
    }
  ]
})

router.beforeEach((to, _from, next) => {
  const destinationStore = useDestinationStore()

  const authStore = useAuthStore()

  if (authStore.accessToken) {
    if (to.path === '/login') {
      return next('/')
    }
    if (to.path === '/map') {
      if (!destinationStore.destination) {
        return next('/')
      }
    }
    return next()
  } else {
    if (to.path === '/login') {
      return next()
    }
    return next('/login')
  }
})

export default router
