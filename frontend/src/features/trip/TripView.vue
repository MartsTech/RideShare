<!-- eslint-disable no-undef -->
<script setup lang="ts">
import router from '@app/router'
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import {
  tripAcceptedListener,
  tripEndedListener,
  tripLocatedListener,
  tripStartedListener
} from './trip-listeners'
import { useTripStore } from './trip-store'

const tripStore = useTripStore()

const title = computed(() => {
  return tripStore.trip?.is_completed
    ? "You've arrived!"
    : tripStore.trip?.is_started
    ? "You're on your way!"
    : tripStore.trip?.driver
    ? 'A driver is on the way!'
    : 'Waiting on a driver...'
})

const message = computed(() => {
  return tripStore.trip?.is_completed
    ? `Hope you enjoyed your ride with ${tripStore.trip.driver?.user.name}`
    : tripStore.trip?.is_started
    ? `You are headed to ${tripStore.trip.destination_name}`
    : tripStore.trip?.driver
    ? `${tripStore.trip?.driver.user.name} is coming in a ${tripStore.trip?.driver.year} ${tripStore.trip?.driver.color} ${tripStore.trip?.driver.make} ${tripStore.trip?.driver.model} with a license plate #${tripStore.trip?.driver.license_plate}`
    : 'When a driver accepts the trip, their info will appear here.'
})

const map = ref<any | null>(null)
const mapObject = ref<any | null>(null)

const location = ref<{ lat: number; lng: number }>({
  lat: 0,
  lng: 0
})

onMounted(() => {
  map.value.$mapPromise.then((object: any) => {
    mapObject.value = object
  })

  navigator.geolocation.getCurrentPosition(
    async (position) => {
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

  tripAcceptedListener((e) => {
    tripStore.tripChanged(e.trip)
  })

  tripStartedListener((e) => {
    tripStore.tripChanged(e.trip)
  })

  tripLocatedListener((e) => {
    tripStore.tripChanged(e.trip)
    setTimeout(() => {
      updateMap()
    }, 1000)
  })

  tripEndedListener((e) => {
    tripStore.tripChanged(e.trip)

    setTimeout(() => {
      tripStore.tripChanged(null)
      router.push('/')
    }, 5000)
  })
})

const updateMap = () => {
  const originPoint = new google.maps.LatLng(location.value)
  const driverPoint = new google.maps.LatLng({
    lat: Number(tripStore.trip?.driver_location?.lat),
    lng: Number(tripStore.trip?.driver_location?.lng)
  })
  const latLngBounds = new google.maps.LatLngBounds()

  latLngBounds.extend(originPoint)
  latLngBounds.extend(driverPoint)

  mapObject.value.fitBounds(latLngBounds)
}
</script>

<template>
  <div class="pt-16">
    <h1 class="mb-4 text-3xl font-semibold">{{ title }}</h1>
    <div class="mx-auto max-w-sm overflow-hidden text-left shadow sm:rounded-md">
      <div class="bg-white px-4 py-5 sm:p-6">
        <GMapMap ref="map" :zoom="14" :center="location" style="width: 100%; height: 256px">
          <GMapMarker
            v-if="location.lat && location.lng"
            :position="location"
            :icon="{
              url: './icons/destination.svg',
              scaledSize: { width: 24, height: 24 }
            }"
          />
          <GMapMarker
            v-if="tripStore.trip?.driver_location"
            :position="{
              lat: Number(tripStore.trip?.driver_location.lat),
              lng: Number(tripStore.trip?.driver_location.lng)
            }"
            :icon="{
              url: './icons/origin.svg',
              scaledSize: { width: 24, height: 24 }
            }"
          />
        </GMapMap>
      </div>
      <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <span>{{ message }}</span>
      </div>
    </div>
  </div>
</template>
