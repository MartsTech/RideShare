<script setup lang="ts">
import { vMaska } from 'maska'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import loginApi from './login-api'
import { useLoginStore } from './login-store'

const loginStore = useLoginStore()

const router = useRouter()

const state = reactive({ phoneNumber: '', authCode: '' })

const isLoading = computed(() => {
  return loginStore.submitReqState.isLoading || loginStore.verifyReqState.isLoading
})

const title = computed(() => {
  return loginStore.submitReqState.isSuccess ? 'Enter your auth code' : 'Enter your phone number'
})

const button = computed(() => {
  return isLoading.value ? 'Loading...' : 'Continue'
})

const submitDisabled = computed(() => {
  return state.phoneNumber.length !== 16 || loginStore.submitReqState.isLoading
})

const verifyDisabled = computed(() => {
  return state.authCode.length !== 6 || loginStore.verifyReqState.isLoading
})

const verifyEnabled = computed(() => {
  return loginStore.submitReqState.isSuccess
})

const submitHandler = (e: Event) => {
  e.preventDefault()

  if (submitDisabled.value || verifyEnabled.value) {
    return
  }

  loginApi.submit({ phone_number: '+' + state.phoneNumber.replace(/\D/g, '') })
}

const verifyHandler = (e: Event) => {
  e.preventDefault()

  if (verifyDisabled.value || !verifyEnabled.value) {
    return
  }

  loginApi
    .verify({
      phone_number: '+' + state.phoneNumber.replace(/\D/g, ''),
      auth_code: state.authCode
    })
    .then(() => {
      router.push('/')
    })
}
</script>

<template>
  <div class="pt-16">
    <h1 class="mb-4 text-3xl font-semibold">{{ title }}</h1>
    <form v-if="!verifyEnabled" @submit="submitHandler">
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
            v-bind:disabled="submitDisabled"
            class="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
          >
            {{ button }}
          </button>
        </div>
      </div>
    </form>
    <form v-else @submit="verifyHandler">
      <div class="mx-auto max-w-sm overflow-hidden text-left shadow sm:rounded-md">
        <div class="bg-white px-4 py-5 sm:p-6">
          <input
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            v-model="state.authCode"
            v-maska
            data-maska="######"
            type="text"
            name="auth_code"
            id="auth_code"
            placeholder="123456"
          />
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            v-bind:disabled="verifyDisabled"
            class="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
          >
            {{ button }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
