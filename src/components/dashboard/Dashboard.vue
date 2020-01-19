<template>
  <div class="container pt-4">
    <Header/>
    
    <div class="row">
      <div class="col-md-12 pt-2 pb-2">
        <Search v-if="authPermission === 'UpperPermission'"/>
      </div>

      <div class="col-md-12">
        <ul class="nav nav-tabs flex-column flex-sm-row nav-fill" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="words-tab" data-toggle="tab" href="#words" role="tab" aria-controls="words" aria-selected="true">Words Dashboard
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" id="charts-tab" data-toggle="tab" href="#charts" role="tab" aria-controls="charts">
              Charts Dashboard
            </a>
          </li>

          <li v-if="authPermission === 'UpperPermission'" class="nav-item">
            <a class="nav-link" id="users-tab" data-toggle="tab" href="#users" role="tab" aria-controls="users" aria-selected="false">Users Dashboard</a>
          </li>

          <li v-if="authPermission === 'UpperPermission'" class="nav-item">
            <a class="nav-link" id="logs-tab" data-toggle="tab" href="#logs" role="tab" aria-controls="logs" aria-selected="false">Sentry</a>
          </li>
        </ul>

        <div class="tab-content">
          <div class="tab-pane fade show active" id="words" role="tabpanel" aria-labelledby="words-tab">
            <WordTable/>
          </div>

          <div class="tab-pane fade" id="charts" role="tabpanel" aria-labelledby="charts-tab">
            <Charts/>
          </div>

          <div v-if="authPermission === 'UpperPermission'" class="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
            <UserTable/>
          </div>

          <div v-if="authPermission === 'UpperPermission'" class="tab-pane fade" id="logs" role="tabpanel" aria-labelledby="logs-tab">
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
import Search from '../search/Search';
import Charts from '../charts/Charts';
//import FeedbackTable from '../feedback/FeedbackTable';

import { Header } from '../../layout';

import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  components: {
    WordTable,
    UserTable,
    LogTable,
    Search,
    Header,
    Charts,
  },
  computed: mapGetters(['authUser', 'authPermission']),
}

</script>