<template>
  <div class="container pt-4">
    <h3>Welcome, {{authUser}}</h3>

    <form class="pt-2">
      <div class="form-group">
        <label for="search">Search Antyhing.</label>
        <input type="email" class="form-control" placeholder="Search">
      </div>
    </form>
  </div>
</template>

<script>

import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Dashboard',
  methods: {
    ...mapActions(['fetchWords'])
  },
  computed: mapGetters(['authUser']),
  created() {
    this.fetchWords();
  }
}

</script>
