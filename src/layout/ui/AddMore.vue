<template>
    <div class="pt-4 text-right">
        <button @click="addMore" class="btn btn-primary">
          <i class="fas fa-plus"></i>
        </button>
    </div>
</template>

<script>
export default {
    name: 'AddMore',
    props: ['component', 'param'],
    methods: {
        // Redirect to a specified route.
        addMore() {
            this.$router.push({
                name: this.component,
                params: { id: this.param }
            });
        }
    }
}
</script>