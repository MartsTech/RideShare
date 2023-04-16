import api from '@app/api'
import { reqStateFailure, reqStateLoading, reqStateSuccess } from '@common/utils/request'
import { useTripStore } from './trip-store'
import type { TripCreateRequest, TripCreateResponse } from './trip-types'

export default {
  create: async (request: TripCreateRequest) => {
    const tripStore = useTripStore()

    tripStore.createReqStateChanged(reqStateLoading())

    await api
      .post<TripCreateResponse>('/trip', request)
      .then((response) => {
        tripStore.createReqStateChanged(reqStateSuccess(response.data))
      })
      .catch(() => {
        tripStore.createReqStateChanged(reqStateFailure(new Error('Unexpected error')))
      })
  }
}
