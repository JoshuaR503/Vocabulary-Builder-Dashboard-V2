<template>
  <div class="container pt-4">
    
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <div class="text-left">
          <h3>{{authUser}}</h3>
          <h4 v-if="wordCount > 1" class="pt-2 pb-2">Word Count: {{wordCount}}</h4>  
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
    </div>

    <div class="page_content">
      <div v-if="wordCount > 1" class="content">
        <DashboardTable />
      </div>

      <div v-else class="content">
        <Empty 
          title="Nothing to see here" 
          message="Start by adding new words."/>
      </div>
    </div>

  </div>
</template>

<script>

import axios from 'axios';
import DashboardTable from './DashboardTable';
import { mapGetters, mapActions } from 'vuex';
import Empty from '../../layout/empty';

export default {
  name: 'Dashboard',
  components: {
    Empty,
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