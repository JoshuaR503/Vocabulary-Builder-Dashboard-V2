
<template>
    <div class="container">
        <Spinner v-if="logsLoading"/>

        <LogsAdmin v-if="logsAdmin.length > 0" :logs="logsAdmin"/>
        <LogsServer v-if="logsServer.length > 0" :logs="logsServer"/>

        <Empty v-if="logsServer.length === 0 && logsAdmin.length === 0 && !logsLoading"
            title="Nothing new here" 
            message="You might want to relax"/>
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
    computed: mapGetters(['logsAdmin', 'logsServer', 'logsLoading']),
    methods: mapActions(['loadLogs']),
    created() {
        this.loadLogs();
    }
}
</script>

