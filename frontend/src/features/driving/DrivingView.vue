<!-- eslint-disable no-undef -->
<script setup lang="ts">
import tripApi from '@features/trip/trip-api'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useDrivingStore } from './driving-store'

const drivingStore = useDrivingStore()

const router = useRouter()

const title = computed(() => {
  return drivingStore.trip?.is_started ? 'Driving to Destination...' : 'Driving to Passenger...'
})

const action = computed(() => {
  return drivingStore.trip?.is_started ? drivingStore.trip.destination_name : 'pick up passenger'
})

const map = ref<any | null>(null)
const interval = ref<number | null>(null)

const location = ref<{ lat: number; lng: number }>({
  lat: 0,
  lng: 0
})

onMounted(() => {
  map.value.$mapPromise.then(async (mapObject: any) => {
    await updateMap(mapObject)

    interval.value = setInterval(async () => {
      await updateMap(mapObject)
      await updateLocation()
    }, 60000)
  })
})

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
})

const updateMap = async (mapObject: any) => {
  if (!drivingStore.trip) {
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const current = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      location.value = current

      if (!drivingStore.trip) {
        return
      }

      const originPoint = new google.maps.LatLng(current)
      const destinationPoint = new google.maps.LatLng({
        lat: Number(drivingStore.trip.origin.lat),
        lng: Number(drivingStore.trip.origin.lng)
      })
      const latLngBounds = new google.maps.LatLngBounds()

      latLngBounds.extend(originPoint)
      latLngBounds.extend(destinationPoint)

      mapObject.fitBounds(latLngBounds)
    },
    (error) => {
      const toast = useToast()
      toast.error(error.message)
    }
  )
}

const updateLocation = async () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const current = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }

    location.value = current

    if (!drivingStore.trip) {
      return
    }

    await tripApi.locate({
      trip_id: drivingStore.trip.id,
      driver_location: {
        lat: current.lat.toString(),
        lng: current.lng.toString()
      }
    })
  })
}

const pickupHandler = async () => {
  if (!drivingStore.trip) {
    return
  }

  await tripApi.start({
    trip_id: drivingStore.trip.id
  })
}

const complteHandler = async () => {
  if (!drivingStore.trip) {
    return
  }

  await tripApi.end({
    trip_id: drivingStore.trip.id
  })

  router.push('/standby')
}
</script>

<template>
  <div class="pt-16">
    <h1 class="mb-4 text-3xl font-semibold">{{ title }}</h1>
    <div class="mx-auto max-w-sm overflow-hidden text-left shadow sm:rounded-md">
      <div class="bg-white px-4 py-5 sm:p-6">
        <GMapMap
          v-if="drivingStore.trip"
          ref="map"
          :center="location"
          :zoom="14"
          style="width: 100%; height: 256px"
        >
          <GMapMarker
            v-if="location.lat && location.lng"
            :position="location"
            :icon="{
              url: './icons/origin.svg',
              scaledSize: { width: 24, height: 24 }
            }"
          />
          <GMapMarker
            v-if="drivingStore.trip"
            :position="{
              lat: Number(drivingStore.trip.origin.lat),
              lng: Number(drivingStore.trip.origin.lng)
            }"
            :icon="{
              url: './icons/destination.svg',
              scaledSize: { width: 24, height: 24 }
            }"
          />
        </GMapMap>
        <div class="mt-2">
          <p class="text-xl">
            Going to <strong>{{ action }}</strong>
          </p>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          v-if="drivingStore.trip?.is_started && !drivingStore.trip?.is_completed"
          @click.prevent="complteHandler"
          class="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none"
        >
          Complete Trip
        </button>
        <button
          v-if="!drivingStore.trip?.is_started && !drivingStore.trip?.is_completed"
          @click.prevent="pickupHandler"
          class="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none"
        >
          Picked Up
        </button>
      </div>
    </div>
  </div>
</template>
