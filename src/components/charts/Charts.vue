<template>
    <div>

        <div class="d-flex pt-4 pb-4">
          <div class="mr-auto">
            <h3>Category Distribution</h3>
          </div>

          <Reload/>
        </div>

        <div v-if="chartsIsLoading">
          <Spinner/>
        </div>

        <div v-else-if="!chartsIsLoading" class="row pt-4">
            <chartData :chartData="chartData"/>
        </div>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import chartData from './Chart';

import { Spinner, Reload } from '../../layout/index';

import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Charts',
    components: {
        chartData,
        Spinner,
        Reload,
        apexchart: VueApexCharts,
    },
    computed: mapGetters(['chartData', 'chartsIsLoading']),
    methods: {
        ...mapActions(['fetchChartData']),
    },
    created() {
        this.fetchChartData();
    },


}
</script>