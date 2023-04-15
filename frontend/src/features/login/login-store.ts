import { reqStateDefault, type RequestState } from '@common/utils/request'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginSubmitResponse, LoginVerifyResponse } from './login-types'

export const useLoginStore = defineStore('login', () => {
  const submitReqState = ref(reqStateDefault())
  const verifyReqState = ref(reqStateDefault())

  const submitStateChanged = (state: RequestState<LoginSubmitResponse>) => {
    submitReqState.value = state
  }

  const verifyStateChanged = (state: RequestState<LoginVerifyResponse>) => {
    verifyReqState.value = state
  }

  return { submitReqState, submitStateChanged, verifyReqState, verifyStateChanged }
})
