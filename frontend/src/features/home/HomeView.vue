<script setup lang="ts">
import { useAuthStore } from '@features/auth/auth-store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()

const router = useRouter()

const logoutHandler = (e: Event) => {
  e.preventDefault()
  authStore.accessTokenRemoved()
  router.push('/login')
}
</script>

<template>
  <button @click="logoutHandler">Logout</button>
</template>
