import storage from '@app/storage'
import { reqStateDefault, type RequestState } from '@common/utils/request'
import { StorageSerializers, useStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TripAcceptResponse, TripCreateResponse, TripModel } from './trip-types'

export const useTripStore = defineStore('trip', () => {
  const trip = ref<RemovableRef<TripModel | null>>(
    useStorage('trip-current', null, storage, {
      serializer: StorageSerializers.object
    })
  )

  const createReqState = ref<RequestState<TripCreateResponse>>(reqStateDefault())

  const acceptReqState = ref<RequestState<TripAcceptResponse>>(reqStateDefault())

  const createReqStateChanged = (state: RequestState<TripCreateResponse>) => {
    createReqState.value = state

    if (state.isSuccess) {
      trip.value = state.data?.trip
    }
  }

  const acceptReqStateChanged = (state: RequestState<TripAcceptResponse>) => {
    acceptReqState.value = state

    if (state.isSuccess) {
      trip.value = state.data?.trip
    }
  }

  return { trip, createReqState, acceptReqState, createReqStateChanged, acceptReqStateChanged }
})
