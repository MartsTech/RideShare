import storage from '@app/storage'
import { StorageSerializers, useStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DestinationModel } from './destination-types'

export const useDestinationStore = defineStore('destination', () => {
  const destination = ref<RemovableRef<DestinationModel | null>>(
    useStorage('destination-current', null, storage, {
      serializer: StorageSerializers.object
    })
  )

  const destinationChanged = (state: DestinationModel | null) => {
    destination.value = state
  }

  return { destination, destinationChanged }
})
