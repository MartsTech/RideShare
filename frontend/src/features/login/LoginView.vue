<script setup lang="ts">
import { vMaska } from 'maska'
import { computed, reactive } from 'vue'
import loginApi from './login-api'

const state = reactive({ phoneNumber: '' })

const loginDisabled = computed(() => {
  return state.phoneNumber.length !== 16
})

const loginHandler = (e: Event) => {
  e.preventDefault()

  if (loginDisabled.value) {
    return
  }
  const phoneNumber = '+' + state.phoneNumber.replace(/\D/g, '')

  loginApi.submit({ phone_number: phoneNumber })
}
</script>

<template>
  <div class="pt-16">
    <h1 class="mb-4 text-3xl font-semibold">Enter your phone number</h1>
    <form @submit="loginHandler">
      <div class="mx-auto max-w-sm overflow-hidden text-left shadow sm:rounded-md">
        <div class="bg-white px-4 py-5 sm:p-6">
          <input
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            v-model="state.phoneNumber"
            v-maska
            data-maska="+### ### ### ###"
            type="text"
            name="phone"
            id="phone"
            placeholder="+359 987 654 321"
          />
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            v-bind:disabled="loginDisabled"
            class="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
          >
            Continue
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
