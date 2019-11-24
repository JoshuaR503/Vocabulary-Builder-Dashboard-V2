<template>
    <div>
        <div v-if="chartsIsLoading">
          <Spinner/>
        </div>

        <div class="row" v-else-if="!chartsIsLoading">

            <div class="col-md-12 col-lg-6">
                <div class="d-flex pt-4 pb-4">
                    <div class="mr-auto">
                         <h4>Gramatical Category Distribution</h4>
                    </div>

                    <Reload/>
                </div>
                <CategoryChart :chartData="chartData"/>
            </div>

            <div class="col-md-12 col-lg-6"> 
                <div class="d-flex pt-4 pb-4">
                    <div class="mr-auto">
                        <h4>Difficulty Level Distribution</h4>
                    </div>

                    <Reload/>
                </div>
                <LevelChart :chartData="chartLevelData"/>
            </div>

        </div>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import CategoryChart from './CategoryChart';
import LevelChart from './LevelChart';
import { Spinner, Reload } from '../../layout/index';

import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Charts',
    components: {
        CategoryChart,
        Spinner,
        Reload,
        LevelChart,
        apexchart: VueApexCharts,
    },
    computed: mapGetters(['chartData', 'chartLevelData', 'chartsIsLoading']),
    methods: {
        ...mapActions(['fetchChartData', 'fetchChartLevelData']),
    },
    created() {
        this.fetchChartData();
        this.fetchChartLevelData();
    },


}
</script>