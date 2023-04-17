import { useAuthStore } from '@features/auth/auth-store'
import DestinationView from '@features/destination/DestinationView.vue'
import { useDestinationStore } from '@features/destination/destination-store'
import DriverView from '@features/driver/DriverView.vue'
import { useDriverStore } from '@features/driver/driver-store'
import DrivingView from '@features/driving/DrivingView.vue'
import { useDrivingStore } from '@features/driving/driving-store'
import HomeView from '@features/home/HomeView.vue'
import LoginView from '@features/login/LoginView.vue'
import MapView from '@features/map/MapView.vue'
import StandbyView from '@features/standby/StandbyView.vue'
import TripView from '@features/trip/TripView.vue'
import { useTripStore } from '@features/trip/trip-store'
import userApi from '@features/user/user-api'
import { useUserStore } from '@features/user/user-store'
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
    },
    {
      path: '/standby',
      name: 'Standby',
      component: StandbyView
    },
    {
      path: '/driver',
      name: 'Driver',
      component: DriverView
    },
    {
      path: '/driving',
      name: 'Driving',
      component: DrivingView
    }
  ]
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (!authStore.accessToken) {
    if (to.path === '/login') {
      return next()
    }
    return next('/login')
  }

  const userStore = useUserStore()

  if (!userStore.user) {
    userApi.get()
  }

  if (to.path !== '/driving') {
    const drivingStore = useDrivingStore()

    if (drivingStore.trip) {
      return next('/driving')
    }
  }

  if (to.path === '/login') {
    return next('/')
  }

  if (to.path === '/map') {
    const destinationStore = useDestinationStore()

    if (!destinationStore.destination) {
      return next('/')
    }
  }

  if (to.path === '/trip') {
    const tripStore = useTripStore()

    if (!tripStore.trip) {
      return next('/')
    }
  }

  if (to.path === '/standby') {
    const driverStore = useDriverStore()

    if (!driverStore.driver) {
      return next('/driver')
    }
  }

  if (to.path === '/driving') {
    const drivingStore = useDrivingStore()

    if (!drivingStore.trip) {
      return next('/standby')
    }
  }

  return next()
})

export default router
