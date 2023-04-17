<!-- eslint-disable no-undef -->
<script setup lang="tsx">
import Loader from '@app/components/Loader.vue'
import { driverTripCreatedListener } from '@features/driver/driver-listeners'
import { useDrivingStore } from '@features/driving/driving-store'
import tripApi from '@features/trip/trip-api'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useStandbyStore } from './standby-store'

const standbyStore = useStandbyStore()
const drivingStore = useDrivingStore()

const router = useRouter()

const map = ref<any | null>(null)

const title = computed(() => {
  return standbyStore.trip ? 'Ride Request:' : 'Waiting for ride request'
})

onMounted(() => {
  routeHandler()

  driverTripCreatedListener((e) => {
    standbyStore.tripChanged(e.trip)
  })
})

watch(
  () => standbyStore.trip,
  () => {
    setTimeout(() => {
      routeHandler()
    }, 1000)
  }
)

const routeHandler = () => {
  if (!standbyStore.trip) {
    return
  }

  map.value?.$mapPromise.then((mapObject: any) => {
    let originPoint = new google.maps.LatLng({
      lat: Number(standbyStore.trip?.origin.lat),
      lng: Number(standbyStore.trip?.origin.lng)
    })
    let destinationPoint = new google.maps.LatLng({
      lat: Number(standbyStore.trip?.destination.lat),
      lng: Number(standbyStore.trip?.destination.lng)
    })
    let directionsService = new google.maps.DirectionsService()
    let directionsDisplay = new google.maps.DirectionsRenderer({
      map: mapObject
    })

    directionsService.route(
      {
        origin: originPoint,
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
}

const acceptHandler = () => {
  if (!navigator.geolocation) {
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      if (!standbyStore.trip) {
        return
      }

      tripApi.accept({
        trip_id: standbyStore.trip.id,
        driver_location: {
          lat: location.lat.toString(),
          lng: location.lng.toString()
        }
      })

      drivingStore.tripChanged(standbyStore.trip)
      standbyStore.tripChanged(null)
      router.push('/driving')
    },
    (error) => {
      const toast = useToast()
      toast.error(error.message)
    }
  )
}

const declineHandler = () => {
  standbyStore.tripChanged(null)
}
</script>

<template>
  <div class="pt-16">
    <h1 class="mb-4 text-3xl font-semibold">{{ title }}</h1>
    <div v-if="!standbyStore.trip" class="mt-8 flex justify-center">
      <Loader />
    </div>
    <div v-else class="mx-auto max-w-sm overflow-hidden text-left shadow sm:rounded-md">
      <div class="bg-white px-4 py-5 sm:p-6">
        <GMapMap
          ref="map"
          :center="{
            lat: Number(standbyStore.trip.destination.lat),
            lng: Number(standbyStore.trip.destination.lng)
          }"
          :zoom="14"
          style="width: 100%; height: 256px"
        >
          <GMapMarker
            :position="{
              lat: Number(standbyStore.trip.destination.lat),
              lng: Number(standbyStore.trip.destination.lng)
            }"
          />
        </GMapMap>
        <div class="mt-2">
          <p class="text-xl">
            Going to <strong>{{ standbyStore.trip.destination_name }}</strong>
          </p>
        </div>
      </div>
      <div class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          @click.prevent="declineHandler"
          class="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none"
        >
          Decline
        </button>
        <button
          @click.prevent="acceptHandler"
          class="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none"
        >
          Accept
        </button>
      </div>
    </div>
  </div>
</template>
