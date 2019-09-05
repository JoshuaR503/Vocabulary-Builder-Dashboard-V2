<template>
    <button @click="redirect" class="btn btn-warning mr-1">
        <i class="fas fa-pen"></i>
    </button>
</template>

<script>
export default {
    name: 'Edit',
    props: ['component', 'param'],
    methods: {
        // Redirect to a specified route.
        redirect() {
            this.$router.push({
                name: this.component,
                params: { id: this.param }
            });
        }
    }
}
</script>

<style scoped>
  i {
    color: white;
  }
</style>
