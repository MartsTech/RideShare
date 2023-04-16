import api from '@app/api'
import { reqStateFailure, reqStateLoading, reqStateSuccess } from '@common/utils/request'
import { useUserStore } from './user-store'
import type { UserGetResponse } from './user-types'

export default {
  get: async () => {
    const userStore = useUserStore()

    userStore.getReqStateChanged(reqStateLoading())

    await api
      .get<UserGetResponse>('/user')
      .then((response) => {
        userStore.getReqStateChanged(reqStateSuccess(response.data))
      })
      .catch(() => {
        userStore.getReqStateChanged(reqStateFailure(new Error('Unexpected error')))
      })
  }
}
