import api from '@app/api'
import { reqStateFailure, reqStateLoading, reqStateSuccess } from '@common/utils/request'
import { useDriverStore } from './driver-store'
import type { DriverGetResponse } from './driver-types'

export default {
  get: async () => {
    const driverStore = useDriverStore()

    driverStore.getReqStateChanged(reqStateLoading())

    await api
      .get<DriverGetResponse>('/driver')
      .then((response) => {
        driverStore.getReqStateChanged(reqStateSuccess(response.data))
      })
      .catch(() => {
        driverStore.getReqStateChanged(reqStateFailure(new Error('Unexpected error')))
      })
  }
}
