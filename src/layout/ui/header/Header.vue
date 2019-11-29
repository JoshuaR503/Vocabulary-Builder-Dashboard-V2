<template>

    <div class="d-flex">
        <div class="mr-auto">
            <h3 >{{authUser}}</h3>
        </div>

        <div @click="change" class="icon">
            <i class="fas fa-moon fa-2x mr-4"></i>
        </div>

        <div @click="logoutAction" class="icon">
            <i class="fas fa-toggle-off fa-2x"></i>
        </div>
    </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  computed: mapGetters(['authUser', 'theme']),
  methods: {
    ...mapActions(['logoutAction', 'changeTheme']),

    change() {

        console.log(this.theme);
        
        this.changeTheme(this.theme);
    }
  }
}

</script>

<style scoped>
.icon {
    cursor:pointer;
}
</style>