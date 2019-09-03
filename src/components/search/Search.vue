<template>
  <form @submit.prevent="searchHandler" class="pt-2">
    <div class="form-group">
      <label for="search">Search Antyhing</label>
      <input v-model="query" type="text" class="form-control" placeholder="Search">
    </div>
  </form>
</template>

<script>
export default {
  name: 'Search',
  methods: {
    searchHandler() {
      if (this.query) {
        const query = this.query.toLowerCase();

        this.$store
        .dispatch('search', query)
        .finally(() => this.$router.push(`/search/${query}`));  
      } else {
        this.$router.push('/');
      }
    }
  },
  data: () => ({
    query: null
  })
}
</script>