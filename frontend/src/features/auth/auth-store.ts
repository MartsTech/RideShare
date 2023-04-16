import { useStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<RemovableRef<string | null>>(useStorage('auth-access-token', null))

  const accessTokenSaved = (token: string) => {
    accessToken.value = token
  }

  const accessTokenRemoved = () => {
    accessToken.value = null
  }

  return { accessToken, accessTokenSaved, accessTokenRemoved }
})
