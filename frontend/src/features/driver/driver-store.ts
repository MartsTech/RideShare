import { reqStateDefault, type RequestState } from '@common/utils/request'
import { StorageSerializers, useStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DriverGetResponse, DriverModel } from './driver-types'

export const useDriverStore = defineStore('driver', () => {
  const driver = ref<RemovableRef<DriverModel | null>>(
    useStorage('driver-current', null, localStorage, {
      serializer: StorageSerializers.object
    })
  )

  const getReqState = ref<RequestState<DriverGetResponse>>(reqStateDefault())

  const getReqStateChanged = (state: RequestState<DriverGetResponse>) => {
    getReqState.value = state

    if (state.isSuccess) {
      driver.value = state.data?.driver
    }
  }

  return { driver, getReqStateChanged }
})
