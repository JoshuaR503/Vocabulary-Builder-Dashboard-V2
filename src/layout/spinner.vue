<template>
    <div class="d-flex justify-content-center pt-4 pb-4">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Spinner',
}
</script>

<style scoped>
    .spinner-border {
        margin: 64px;
        width: 64px; 
        height: 64px;
    }
</style>