<template>

    <div class="d-flex">
        <div class="mr-auto">
            <h3 >{{authUser}}</h3>
        </div>
      
        <div @click="logoutAction" class="icon">
            <i class="fas fa-times fa-2x"></i>
        </div>
    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  computed: mapGetters(['authUser']),
  methods: mapActions(['logoutAction'])
}

</script>

<style scoped>
.icon {
    cursor:pointer;
}
</style>