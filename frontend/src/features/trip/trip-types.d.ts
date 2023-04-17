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

// ================== Events =====================
export interface TripCreatedEvent {
  trip: TripModel
}

export interface TripAcceptedEvent {
  trip: TripModel
}

export interface TripStartedEvent {
  trip: TripModel
}

export interface TripLocatedEvent {
  trip: TripModel
}

export interface TripEndedEvent {
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

// ================== Locate =====================
interface TripLocateRequest {
  trip_id: number
  driver_location: {
    lat: string
    lng: string
  }
}

interface TripLocateResponse {
  trip: TripModel
}

// ================== Start =====================
interface TripStartRequest {
  trip_id: number
}

interface TripStartResponse {
  trip: TripModel
}

// ================== End =====================
interface TripEndRequest {
  trip_id: number
}

interface TripEndResponse {
  trip: TripModel
}
