<template>
    <button @click="redirect" class="btn btn-primary">
      <i class="fas fa-plus"></i>
    </button>
</template>

<script>
export default {
    name: 'Add',
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