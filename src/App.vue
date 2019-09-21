<template>
  <transition name="fadeIn" 
    enter-active-class="fadeIn">
    <router-view/>
  </transition>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-fill-mode: both;
}
</style>