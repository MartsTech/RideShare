import type { DriverModel } from '@features/driver/driver-types'
import type { UserModel } from '@features/user/user-types'

interface TripModel {
  id: number
  user_id: number
  driver_id?: number
  is_started?: boolean
  is_completed?: boolean
  origin: {
    lat: string
    lng: string
  }
  destination: {
    lat: string
    lng: string
  }
  destination_name: string
  driver_location?: {
    lat: string
    lng: string
  }
  created_at: string
  updated_at: string
  user: UserModel
  driver?: DriverModel | null
}

export interface TripCreatedEvent {
  trip: TripModel
}

// ================== Create =====================
interface TripCreateRequest {
  destination_name: string
  destination: {
    lat: string
    lng: string
  }
  origin: {
    lat: string
    lng: string
  }
}

interface TripCreateResponse {
  trip: TripModel
}

// ================== Accept =====================
interface TripAcceptRequest {
  trip_id: number
  driver_location: {
    lat: string
    lng: string
  }
}

interface TripAcceptResponse {
  trip: TripModel
}
