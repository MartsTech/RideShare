<script setup lang="ts"></script>

<template>
  <div class="pt-16">
    <h1 class="mb-4 text-3xl font-semibold">RideShare</h1>
    <div class="mx-auto max-w-sm overflow-hidden text-left shadow sm:rounded-md">
      <div class="bg-white px-4 py-5 sm:p-6">
        <div class="flex justify-between">
          <button
            class="w-32 rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white"
          >
            Start Driving
          </button>
          <RouterLink
            to="/destination"
            class="w-32 rounded-md border border-transparent bg-black px-4 py-2 text-center text-sm font-medium text-white"
          >
            Find A Ride
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
