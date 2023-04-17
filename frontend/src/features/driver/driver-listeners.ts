import echo from '@app/echo'
import type { TripCreatedEvent } from '@features/trip/trip-types'

export const driverTripCreatedListener = (callback: (e: TripCreatedEvent) => void) => {
  const client = echo()

  client.channel('drivers').listen('TripCreated', (e: TripCreatedEvent) => {
    callback(e)
  })
}
