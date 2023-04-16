import api from '@app/api'
import { reqStateFailure, reqStateLoading, reqStateSuccess } from '@common/utils/request'
import { useAuthStore } from '@features/auth/auth-store'
import { useLoginStore } from './login-store'
import type {
  LoginSubmitRequest,
  LoginSubmitResponse,
  LoginVerifyRequest,
  LoginVerifyResponse
} from './login-types'

export default {
  submit: async (request: LoginSubmitRequest) => {
    const loginStore = useLoginStore()

    loginStore.submitStateChanged(reqStateLoading())

    await api
      .post<LoginSubmitResponse>('/login', request)
      .then((response) => {
        loginStore.submitStateChanged(reqStateSuccess(response.data))
      })
      .catch(() => {
        loginStore.submitStateChanged(reqStateFailure(new Error('Unexpected error')))
      })
  },
  verify: async (request: LoginVerifyRequest) => {
    const loginStore = useLoginStore()
    const authStore = useAuthStore()

    loginStore.verifyStateChanged(reqStateLoading())

    await api
      .post<LoginVerifyResponse>('/login/verify', request)
      .then((response) => {
        loginStore.verifyStateChanged(reqStateSuccess(response.data))
        authStore.accessTokenSaved(response.data.access_token)
      })
      .catch(() => {
        loginStore.verifyStateChanged(reqStateFailure(new Error('Unexpected error')))
      })
  }
}
