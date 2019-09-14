
<template>
    <div class="container">
        <LogsAdmin v-if="logsAdmin.response.length > 0" :logs="logsAdmin.response"/>
        <LogsServer v-if="logsServer.response.length > 0" :logs="logsServer.response"/>

        <Empty v-if="logsServer.response.length === 0 && logsAdmin.response.length === 0"
            title="Nothing new here" 
            message="You might want to relax"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Empty } from '../../layout/index';
import LogsServer from './LogsServer';
import LogsAdmin from './LogsAdmin';

export default {
    name: 'LogTable',
    components: { Empty, LogsServer, LogsAdmin },
    computed: mapGetters(['logsServerLoading', 'logAdminLoading', 'logsAdmin', 'logsServer']),
    methods: mapActions(['loadLogsServer', 'loadLogsAdmin']),
    created() {
        this.loadLogsServer();
        this.loadLogsAdmin();
    }
}
</script>
