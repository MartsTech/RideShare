import { useAuthStore } from '@features/auth/auth-store'
import DestinationView from '@features/destination/DestinationView.vue'
import HomeView from '@features/home/HomeView.vue'
import LoginView from '@features/login/LoginView.vue'
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
    }
  ]
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (authStore.accessToken) {
    if (to.path === '/login') {
      return next('/')
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
