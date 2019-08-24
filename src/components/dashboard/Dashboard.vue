<template>
  <div class="container pt-4">
    
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <div class="text-left">
          <h3>{{authUser}}</h3>
          <h4 class="pt-2 pb-2">Word Count: {{wordCount}}</h4>  
        </div>
      </div>

      <div class="col-sm-12 col-md-6">
        <div class="text-right">
          <button @click="addWord" type="button" class="btn btn-primary">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>

      <div class="col-md-12">
        <form class="pt-2">
          <div class="form-group">
            <label for="search">Search Antyhing.</label>
            <input type="email" class="form-control" placeholder="Search">
          </div>
        </form>
      </div>

      <div class="col-md-12">
        <DashboardTable />  
      </div>
    </div>

  </div>
</template>

<script>

import DashboardTable from './DashboardTable';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Dashboard',
  components: {
    DashboardTable
  },
  computed: mapGetters(['wordCount', 'authUser']),
  methods: {
    addWord() {
      this.$router.push('/word/new')
    }
  }
  
}

</script>