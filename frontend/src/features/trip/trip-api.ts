import api from '@app/api'
import { reqStateFailure, reqStateLoading, reqStateSuccess } from '@common/utils/request'
import { useTripStore } from './trip-store'
import type {
  TripAcceptRequest,
  TripAcceptResponse,
  TripCreateRequest,
  TripCreateResponse
} from './trip-types'

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
  },
  accept: async (request: TripAcceptRequest) => {
    const tripStore = useTripStore()

    tripStore.acceptReqStateChanged(reqStateLoading())

    await api
      .post<TripAcceptResponse>(`/trip/${request.trip_id}/accept`, request)
      .then((response) => {
        tripStore.acceptReqStateChanged(reqStateSuccess(response.data))
      })
      .catch(() => {
        tripStore.acceptReqStateChanged(reqStateFailure(new Error('Unexpected error')))
      })
  }
}
