<script setup lang="tsx">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { vMaska } from 'maska'
import { storeToRefs } from 'pinia'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import driverApi from './driver-api'
import { useDriverStore } from './driver-store'

const router = useRouter()

const driverStore = useDriverStore()

const { driver } = storeToRefs(driverStore)

const state = reactive({
  name: driver.value?.user.name || '',
  year: driver.value?.year || '',
  make: driver.value?.make || '',
  model: driver.value?.model || '',
  color: driver.value?.color || '',
  license_plate: driver.value?.license_plate || ''
})

const rules = {
  name: { required },
  year: { required },
  make: { required },
  model: { required },
  color: { required },
  license_plate: { required }
}

const v$ = useVuelidate(rules, state)

const continueDisabled = computed(() => {
  return v$.value.$invalid
})

const continueHandler = () => {
  if (continueDisabled.value) {
    return
  }

  driverApi
    .update({
      name: state.name,
      year: Number(state.year),
      make: state.make,
      model: state.model,
      color: state.color,
      license_plate: state.license_plate
    })
    .then(() => {
      router.push('/standby')
    })
}
</script>

<template>
  <div class="pt-16">
    <h1 class="mb-4 text-3xl font-semibold">Driver and Car Details</h1>
    <form @submit.prevent="continueHandler">
      <div class="mx-auto max-w-sm overflow-hidden text-left shadow sm:rounded-md">
        <div class="bg-white px-4 py-5 sm:p-6">
          <input
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
            v-model="state.name"
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
          />
          <input
            class="mt-3 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
            v-model="state.year"
            type="number"
            name="year"
            id="year"
            placeholder="Car Year"
            v-maska
            data-maska="####"
          />
          <input
            class="mt-3 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
            v-model="state.make"
            type="text"
            name="make"
            id="make"
            placeholder="Make"
          />
          <input
            class="mt-3 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
            v-model="state.model"
            type="text"
            name="model"
            id="model"
            placeholder="Model"
          />
          <input
            class="mt-3 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
            v-model="state.color"
            type="text"
            name="color"
            id="color"
            placeholder="Color"
          />
          <input
            class="mt-3 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none"
            v-model="state.license_plate"
            type="text"
            name="license_plate"
            id="license_plate"
            placeholder="License Plate"
            v-maska
            data-maska="@@####@@"
          />
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            @click.prevent="continueHandler"
            :disabled="continueDisabled"
            type="submit"
            class="inline-flex justify-center rounded-md border border-transparent bg-black px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
