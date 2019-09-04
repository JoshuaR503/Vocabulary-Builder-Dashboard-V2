<template>
    <i @click="back" class="fas fa-arrow-left"></i>
</template>

<script>
export default {
  name: 'Back',
  methods: {
    back() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
  i {
    font-size: 20px;
    padding-right: 10px;
  }
</style>