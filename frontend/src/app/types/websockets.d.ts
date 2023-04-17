import type Echo from 'laravel-echo'

export {}

declare global {
  interface Window {
    Pusher: any
    Echo: Echo
  }
}
