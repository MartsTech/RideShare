import storage from '@app/storage'
import type { TripModel } from '@features/trip/trip-types'
import { StorageSerializers, useStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrivingStore = defineStore('driving', () => {
  const trip = ref<RemovableRef<TripModel | null>>(
    useStorage('driving-trip', null, storage, {
      serializer: StorageSerializers.object
    })
  )

  const tripChanged = (state: TripModel | null) => {
    trip.value = state
  }

  return { trip, tripChanged }
})
