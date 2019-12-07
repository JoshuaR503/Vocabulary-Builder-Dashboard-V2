<template>
  <div class="container">

    <div class="d-flex pt-4 pb-4">
      <div class="mr-auto">
        <h3>Sentry Issues: {{totalLogs}}</h3>
      </div>

      <!-- Refresh buttons -->
      <button @click="loadLogs" class="btn btn-primary">
        <i class="fas fa-redo-alt"></i>
      </button>
      <!-- End: Refresh buttons -->
    </div>

    <div class="form-group">
      <input disabled class="form-control" placeholder="Search Issues (future)">
    </div>

    <div v-if="logsLoading">
      <Spinner/>
    </div>
    
    <div v-if="!logsLoading && logsAdmin.length > 0" class="fadeIn content">
      <LogsAdmin :logs="logsAdmin"/>
    </div>

    <div v-if="!logsLoading && logsServer.length > 0" class="fadeIn content">
      <LogsServer :logs="logsServer"/>
    </div>

    <div class="content fadeIn" v-if="logsServer.length === 0 &&  logsAdmin.length === 0 && !logsLoading" >
      <Empty title="Nothing new here" message="No issues found :)"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Empty, Spinner } from '../../layout/index';
import LogsServer from './LogsServer';
import LogsAdmin from './LogsAdmin';

export default {
  name: 'LogTable',
  components: { Empty, Spinner, LogsServer, LogsAdmin },

  computed: mapGetters(['logsAdmin', 'logsServer', 'logsLoading', 'totalLogs']),
  methods: mapActions(['loadLogs']),

  created() {
    this.loadLogs();
  },
}
</script>
