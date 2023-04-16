import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import type { MapLocationModel } from './map-types'

export const useMapStore = defineStore('map', () => {
  const location = ref<MapLocationModel | null>(null)

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
