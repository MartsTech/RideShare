import { reqStateDefault, type RequestState } from '@common/utils/request'
import { useUserStore } from '@features/user/user-store'
import { StorageSerializers, useStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DriverGetResponse, DriverModel, DriverUpdateResponse } from './driver-types'

export const useDriverStore = defineStore('driver', () => {
  const driver = ref<RemovableRef<DriverModel | null>>(
    useStorage('driver-current', null, localStorage, {
      serializer: StorageSerializers.object
    })
  )

  const getReqState = ref<RequestState<DriverGetResponse>>(reqStateDefault())

  const updateReqState = ref<RequestState<DriverUpdateResponse>>(reqStateDefault())

  const getReqStateChanged = (state: RequestState<DriverGetResponse>) => {
    getReqState.value = state

    if (state.isSuccess) {
      driver.value = state.data?.driver
    }
  }

  const updateReqStateChanged = (state: RequestState<DriverUpdateResponse>) => {
    updateReqState.value = state

    if (state.isSuccess) {
      driver.value = state.data?.driver

      const userStore = useUserStore()

      if (state.data?.driver.user) {
        userStore.user = state.data?.driver.user
      }
    }
  }

  return { driver, getReqStateChanged, updateReqStateChanged }
})
