import api from '@app/api'
import { reqStateFailure, reqStateLoading, reqStateSuccess } from '@common/utils/request'
import { useTripStore } from './trip-store'
import type {
  TripAcceptRequest,
  TripAcceptResponse,
  TripCreateRequest,
  TripCreateResponse,
  TripEndRequest,
  TripEndResponse,
  TripLocateRequest,
  TripLocateResponse,
  TripStartRequest,
  TripStartResponse
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
  },
  locate: async (request: TripLocateRequest) => {
    const tripStore = useTripStore()

    tripStore.locateReqStateChanged(reqStateLoading())

    await api
      .post<TripLocateResponse>(`/trip/${request.trip_id}/locate`, request)
      .then((response) => {
        tripStore.locateReqStateChanged(reqStateSuccess(response.data))
      })
      .catch(() => {
        tripStore.locateReqStateChanged(reqStateFailure(new Error('Unexpected error')))
      })
  },
  start: async (request: TripStartRequest) => {
    const tripStore = useTripStore()

    tripStore.startReqStateChanged(reqStateLoading())

    await api
      .post<TripStartResponse>(`/trip/${request.trip_id}/start`, request)
      .then((response) => {
        tripStore.startReqStateChanged(reqStateSuccess(response.data))
      })
      .catch(() => {
        tripStore.startReqStateChanged(reqStateFailure(new Error('Unexpected error')))
      })
  },
  end: async (request: TripEndRequest) => {
    const tripStore = useTripStore()

    tripStore.endReqStateChanged(reqStateLoading())

    await api
      .post<TripEndResponse>(`/trip/${request.trip_id}/end`, request)
      .then((response) => {
        tripStore.endReqStateChanged(reqStateSuccess(response.data))
      })
      .catch(() => {
        tripStore.endReqStateChanged(reqStateFailure(new Error('Unexpected error')))
      })
  }
}
