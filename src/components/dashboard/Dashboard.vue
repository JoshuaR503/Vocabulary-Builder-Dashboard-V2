<template>
  <div class="container pt-4">
    
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <div class="text-left">
          <h3>{{authUser}}</h3>
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
        
        <ul class="nav nav-tabs flex-column flex-sm-row nav-fill" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="words-tab" data-toggle="tab" href="#words" role="tab" aria-controls="words" aria-selected="true">Words Dashboard</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" id="users-tab" data-toggle="tab" href="#users" role="tab" aria-controls="users" aria-selected="false">Users Dashboard</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" id="logs-tab" data-toggle="tab" href="#logs" role="tab" aria-controls="logs" aria-selected="false">Logs Dashboard</a>
          </li>
        </ul>

        <div class="tab-content">
          <div class="tab-pane fade show active" id="words" role="tabpanel" aria-labelledby="words-tab">
            <WordTable/>
          </div>
          <div class="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
            <UserTable/>
          </div>
          <div class="tab-pane fade" id="logs" role="tabpanel" aria-labelledby="logs-tab">
            <LogTable/>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import WordTable from '../word/WordTable';
import UserTable from '../user/UserTable';
import LogTable from '../logs/LogTable';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Dashboard',
  components: {
    WordTable,
    UserTable,
    LogTable
  },
  computed: mapGetters(['authUser']),
}

</script>