<template>
  <div class="container pt-4">
    <h3>Welcome, {{authUser}}</h3>
    <h4 class="pt-2 pb-2">Word Count: {{wordCount}}</h4>

    <form class="pt-2">
      <div class="form-group">
        <label for="search">Search Antyhing.</label>
        <input type="email" class="form-control" placeholder="Search">
      </div>
    </form>

  
    <div class="table-responsive">
      <table class="table table-hover text-center">

        <thead>
          <tr>
            <th>Word</th>
            <th>Translation</th>
            <th>Status</th>
            <th>Writter</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="word in words" :key="word.id">
            <td>{{word.word}}</td>
            <td>{{word.wordTranslation}}</td>
            <td>{{word.visible ? 'Public' : 'Needs Revision'}}</td>
            <td>@{{word.writter.name}}</td>
            <td>
              <button type="button" class="btn btn-warning mr-1">
                <i class="fas fa-pen"></i>
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-danger ml-1">
                <i class="fas fa-trash"></i>
              </button>  
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>

import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Dashboard',
  methods: mapActions(['fetchWords']),
  computed: mapGetters(['authUser', 'wordCount', 'words']),
  created() {
    this.fetchWords();
  }
}

</script>


<style scoped>
  i {
    color: white;
  }
</style>