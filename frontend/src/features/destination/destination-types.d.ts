export interface DestinationModel {
  name: string
  address: string
  geometry: {
    lat: string
    long: string
  }
}

export interface DestinationEvent {
  address_components?: AddressComponentsEntity[] | null
  adr_address: string
  business_status: string
  current_opening_hours: CurrentOpeningHours
  formatted_address: string
  formatted_phone_number: string
  geometry: Geometry
  icon: string
  icon_background_color: string
  icon_mask_base_uri: string
  international_phone_number: string
  name: string
  opening_hours: OpeningHours
  photos?: PhotosEntity[] | null
  place_id: string
  plus_code: PlusCode
  price_level: number
  rating: number
  reference: string
  reviews?: ReviewsEntity[] | null
  types?: string[] | null
  url: string
  user_ratings_total: number
  utc_offset: number
  vicinity: string
  website: string
  html_attributions?: null[] | null
  utc_offset_minutes: number
}

export interface AddressComponentsEntity {
  long_name: string
  short_name: string
  types?: string[] | null
}

export interface CurrentOpeningHours {
  open_now: boolean
  periods?: PeriodsEntity[] | null
  special_days?: SpecialDaysEntity[] | null
  weekday_text?: string[] | null
}

export interface PeriodsEntity {
  close: CloseOrOpen
  open: CloseOrOpen
}

export interface CloseOrOpen {
  date: string
  day: number
  time: string
}

export interface SpecialDaysEntity {
  date: string
  exceptional_hours: boolean
}

export interface Geometry {
  location: Location
  viewport: Viewport
}

export interface Location {
  lat: number
  lng: number
}

export interface Viewport {
  south: number
  west: number
  north: number
  east: number
}

export interface OpeningHours {
  open_now: boolean
  periods?: PeriodsEntity1[] | null
  weekday_text?: string[] | null
}

export interface PeriodsEntity1 {
  close: CloseOrOpen1
  open: CloseOrOpen1
}

export interface CloseOrOpen1 {
  day: number
  time: string
  hours: number
  minutes: number
  nextDate: number
}

export interface PhotosEntity {
  height: number
  html_attributions?: string[] | null
  width: number
}

export interface PlusCode {
  compound_code: string
  global_code: string
}

export interface ReviewsEntity {
  author_name: string
  author_url: string
  language: string
  profile_photo_url: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}
