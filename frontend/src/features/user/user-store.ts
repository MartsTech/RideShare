import storage from '@app/storage'
import { reqStateDefault, type RequestState } from '@common/utils/request'
import { StorageSerializers, useStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserGetResponse, UserModel } from './user-types'

export const useUserStore = defineStore('user', () => {
  const user = ref<RemovableRef<UserModel | null>>(
    useStorage('user-current', null, storage, {
      serializer: StorageSerializers.object
    })
  )

  const getReqState = ref<RequestState<UserGetResponse>>(reqStateDefault())

  const getReqStateChanged = (state: RequestState<UserGetResponse>) => {
    getReqState.value = state

    if (state.isSuccess) {
      user.value = state.data?.user
    }
  }

  return { user, getReqStateChanged }
})
