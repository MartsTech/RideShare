<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDestinationStore } from './destination-store'
import type { DestinationEvent } from './destination-types'

const destinationStore = useDestinationStore()

const router = useRouter()

const findRideDisabled = computed(() => {
  return !destinationStore.destination
})

const placeChangeHandler = (model: DestinationEvent) => {
  destinationStore.destinationChanged({
    name: model.name,
    address: model.formatted_address,
    geometry: {
      lat: model.geometry.location.lat.toString(),
      long: model.geometry.location.lng.toString()
    }
  })
}

const findRideHandler = () => {
  router.push('/map')
}
</script>

<template>
  <div class="pt-16">
    <h1 class="mb-4 text-3xl font-semibold">Where are we going?</h1>
    <form @submit.prevent="findRideHandler">
      <div class="mx-auto max-w-sm overflow-hidden text-left shadow sm:rounded-md">
        <div class="bg-white px-4 py-5 sm:p-6">
          <GMapAutocomplete
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            placeholder="My destination"
            @place_changed="placeChangeHandler"
          />
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            @click.prevent="findRideHandler"
            :disabled="findRideDisabled"
            type="button"
            class="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            Find A Ride
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
