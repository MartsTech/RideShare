import storage from '@app/storage'
import { StorageSerializers, useStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MapLocationModel } from './map-types'

export const useMapStore = defineStore('map', () => {
  const location = ref<RemovableRef<MapLocationModel | null>>(
    useStorage('map-location', null, storage, {
      serializer: StorageSerializers.object
    })
  )

  const locationChanged = (model: MapLocationModel) => {
    location.value = model
  }

  return { location, locationChanged }
})
