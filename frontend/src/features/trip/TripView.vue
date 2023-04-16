<script setup lang="ts"></script>

<template>
  <div class="pt-16">
    <h1 class="mb-4 text-3xl font-semibold">Waiting on a driver...</h1>
    <div class="mx-auto max-w-sm overflow-hidden text-left shadow sm:rounded-md">
      <div class="bg-white px-4 py-5 sm:p-6">
        <GMapMap :zoom="14" style="width: 100%; height: 256px" />
      </div>
      <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <span>When a driver accepts the trip, their info will appear here.</span>
      </div>
    </div>
  </div>
</template>
