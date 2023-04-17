import echo from '@app/echo'
import type {
  TripAcceptedEvent,
  TripCreatedEvent,
  TripEndedEvent,
  TripLocatedEvent,
  TripStartedEvent
} from '@features/trip/trip-types'
import { useUserStore } from '@features/user/user-store'

export const tripCreatedListener = (callback: (e: TripCreatedEvent) => void) => {
  const client = echo()

  client.channel('drivers').listen('TripCreated', (e: TripCreatedEvent) => {
    callback(e)
  })
}

export const tripAcceptedListener = (callback: (e: TripCreatedEvent) => void) => {
  const client = echo()
  const userStore = useUserStore()

  if (!userStore.user) {
    return
  }

  client.channel(`users_${userStore.user.id}`).listen('TripAccepted', (e: TripAcceptedEvent) => {
    callback(e)
  })
}

export const tripStartedListener = (callback: (e: TripStartedEvent) => void) => {
  const client = echo()
  const userStore = useUserStore()

  if (!userStore.user) {
    return
  }

  client.channel(`users_${userStore.user.id}`).listen('TripStarted', (e: TripStartedEvent) => {
    callback(e)
  })
}

export const tripLocatedListener = (callback: (e: TripLocatedEvent) => void) => {
  const client = echo()
  const userStore = useUserStore()

  if (!userStore.user) {
    return
  }

  client.channel(`users_${userStore.user.id}`).listen('TripLocated', (e: TripLocatedEvent) => {
    callback(e)
  })
}

export const tripEndedListener = (callback: (e: TripEndedEvent) => void) => {
  const client = echo()
  const userStore = useUserStore()

  if (!userStore.user) {
    return
  }

  client.channel(`users_${userStore.user.id}`).listen('TripEnded', (e: TripEndedEvent) => {
    callback(e)
  })
}
