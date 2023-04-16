<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { useDestinationStore } from '@features/destination/destination-store'
import tripApi from '@features/trip/trip-api'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useMapStore } from './map-store'

const mapStore = useMapStore()
const destinationStore = useDestinationStore()

const router = useRouter()

const map = ref<any | null>(null)

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        mapStore.locationChanged(location)

        map.value?.$mapPromise.then((mapObject: any) => {
          let currentPoint = new google.maps.LatLng(location)
          let destinationPoint = new google.maps.LatLng(destinationStore.destination?.geometry)
          let directionsService = new google.maps.DirectionsService()
          let directionsDisplay = new google.maps.DirectionsRenderer({
            map: mapObject
          })

          directionsService.route(
            {
              origin: currentPoint,
              destination: destinationPoint,
              avoidTolls: false,
              avoidHighways: false,
              travelMode: google.maps.TravelMode.DRIVING
            },
            (result: any, status: any) => {
              if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result)
              } else {
                const toast = useToast()
                toast.error('Could not calculate directions')
              }
            }
          )
        })
      },
      (error) => {
        const toast = useToast()
        toast.error(error.message)
      }
    )
  }
})

const continueHandler = () => {
  if (!destinationStore.destination || !mapStore.location) {
    return
  }

  tripApi
    .create({
      destination_name: destinationStore.destination?.name,
      destination: {
        lat: destinationStore.destination?.geometry.lat.toString(),
        lng: destinationStore.destination?.geometry.lng.toString()
      },
      origin: {
        lat: mapStore.location.lat.toString(),
        lng: mapStore.location.lng.toString()
      }
    })
    .then(() => {
      router.push('/trip')
    })
}
</script>

<template>
  <div class="pt-16">
    <h1 class="mb-4 text-3xl font-semibold">Here's your trip</h1>
    <div class="mx-auto max-w-sm overflow-hidden text-left shadow sm:rounded-md">
      <div class="bg-white px-4 py-5 sm:p-6">
        <GMapMap
          ref="map"
          :center="destinationStore.destination?.geometry"
          :zoom="11"
          style="width: 100%; height: 256px"
        >
          <GMapMarker :position="destinationStore.destination?.geometry" />
        </GMapMap>
        <div class="mt-2">
          <p class="text-xl">
            Going to <strong>{{ destinationStore.destination?.name }}</strong>
          </p>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          @click="continueHandler"
          class="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-white"
        >
          Let's go!
        </button>
      </div>
    </div>
  </div>
</template>
