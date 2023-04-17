<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <span class="loader relative box-border block h-8 w-32 overflow-hidden"></span>
</template>

<style>
.loader {
  background: linear-gradient(#000 4px, transparent 0) no-repeat;
  background-position: 0 16px;
}

.loader:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  border: 6px solid #000;
  box-sizing: border-box;
  animation: ballbns 1.5s linear infinite;
}

@keyframes ballbns {
  0% {
    left: 0;
    transform: translateX(-100%);
  }

  100% {
    left: 100%;
    transform: translateX(0);
  }
}
</style>
