import type { StorageLike } from '@vueuse/core'
import { EncryptStorage } from 'encrypt-storage'

export default new EncryptStorage(import.meta.env.VITE_STORAGE_KEY) as StorageLike
