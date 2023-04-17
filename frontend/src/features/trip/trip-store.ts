import storage from '@app/storage'
import { reqStateDefault, type RequestState } from '@common/utils/request'
import { useDrivingStore } from '@features/driving/driving-store'
import { StorageSerializers, useStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  TripAcceptResponse,
  TripCreateResponse,
  TripEndResponse,
  TripLocateResponse,
  TripModel,
  TripStartResponse
} from './trip-types'

export const useTripStore = defineStore('trip', () => {
  const trip = ref<RemovableRef<TripModel | null>>(
    useStorage('trip-current', null, storage, {
      serializer: StorageSerializers.object
    })
  )

  const createReqState = ref<RequestState<TripCreateResponse>>(reqStateDefault())

  const acceptReqState = ref<RequestState<TripAcceptResponse>>(reqStateDefault())

  const locateReqState = ref<RequestState<TripLocateResponse>>(reqStateDefault())

  const startReqState = ref<RequestState<TripStartResponse>>(reqStateDefault())

  const endReqState = ref<RequestState<TripEndResponse>>(reqStateDefault())

  const tripChanged = (state: TripModel | null) => {
    trip.value = state
  }

  const createReqStateChanged = (state: RequestState<TripCreateResponse>) => {
    createReqState.value = state

    if (state.isSuccess) {
      trip.value = state.data?.trip
    }
  }

  const acceptReqStateChanged = (state: RequestState<TripAcceptResponse>) => {
    acceptReqState.value = state

    if (state.isSuccess) {
      const drivingStore = useDrivingStore()
      drivingStore.tripChanged(state.data?.trip ?? null)
    }
  }

  const locateReqStateChanged = (state: RequestState<TripLocateResponse>) => {
    locateReqState.value = state

    if (state.isSuccess) {
      const drivingStore = useDrivingStore()
      drivingStore.tripChanged(state.data?.trip ?? null)
    }
  }

  const startReqStateChanged = (state: RequestState<TripStartResponse>) => {
    startReqState.value = state

    if (state.isSuccess) {
      const drivingStore = useDrivingStore()
      drivingStore.tripChanged(state.data?.trip ?? null)
    }
  }

  const endReqStateChanged = (state: RequestState<TripEndResponse>) => {
    endReqState.value = state

    if (state.isSuccess) {
      const drivingStore = useDrivingStore()
      drivingStore.tripChanged(null)
    }
  }

  return {
    trip,
    createReqState,
    acceptReqState,
    locateReqState,
    startReqState,
    endReqState,
    tripChanged,
    createReqStateChanged,
    acceptReqStateChanged,
    locateReqStateChanged,
    startReqStateChanged,
    endReqStateChanged
  }
})
