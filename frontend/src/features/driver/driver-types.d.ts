import type { UserModel } from '@features/user/user-types'

export interface DriverModel {
  id: number
  user_id: number
  year: number
  make: string
  model: string
  color: string
  license_plate: string
  created_at: string
  updated_at: string
  user: UserModel
}
