import { StorageSerializers, useStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import type { MapLocationModel } from './map-types'

export const useMapStore = defineStore('map', () => {
  const location = ref<RemovableRef<MapLocationModel | null>>(
    useStorage('map-location', null, localStorage, {
      serializer: StorageSerializers.object
    })
  )

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          location.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        },
        (error) => {
          const toast = useToast()
          toast.error(error.message)
        }
      )
    }
  }

  return { location, getLocation }
})
