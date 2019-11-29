<template>
  <transition name="fadeIn" 
    enter-active-class="fadeIn">
    <router-view/>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app',
  computed: mapGetters(['theme']),
  methods: mapActions(['changeTheme']),
  mounted() {
    this.changeTheme(this.theme);
  }
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