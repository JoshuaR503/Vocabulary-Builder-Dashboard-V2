<template>
  <transition name="moveInUp">
    <router-view/>
  </transition>
</template>

<script>
import { Login } from './components/index';

export default {

  name: 'app',
  components: {
    Login
  }
}

</script>