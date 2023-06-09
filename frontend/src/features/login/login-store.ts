import { reqStateDefault, type RequestState } from '@common/utils/request'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginSubmitResponse, LoginVerifyResponse } from './login-types'

export const useLoginStore = defineStore('login', () => {
  const submitReqState = ref(reqStateDefault<LoginSubmitResponse>())
  const verifyReqState = ref(reqStateDefault<LoginVerifyResponse>())

  const submitStateChanged = (state: RequestState<LoginSubmitResponse>) => {
    submitReqState.value = state
  }

  const verifyStateChanged = (state: RequestState<LoginVerifyResponse>) => {
    verifyReqState.value = state
  }

  return { submitReqState, verifyReqState, submitStateChanged, verifyStateChanged }
})
