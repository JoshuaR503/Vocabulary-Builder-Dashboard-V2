
<template>
    <div class="container">
        <div class="admin">
            <LogsAdmin v-if="logsAdmin.response.length > 0" :logs="logsAdmin.response"/>
            <Empty  v-if="logsAdmin.response.length === 0"
                title="No logs found on Dasboard Project" 
                message="You may relax."/>
        </div>

        <div class="server">
            <LogsServer v-if="logsServer.response.length > 0" :logs="logsServer.response"/>
            <Empty v-if="logsServer.response.length === 0"
                title="No logs found on Server Project" 
                message="You may relax."/>
        </div>
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
