<template>
    <div id="chart">
        <apexchart type=bar height=350 
        :options="chartOptions" 
        :series="[{data: chartData}]"/>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
    name: 'LevelChart',
    props: ['chartData'],

    components: {
        apexchart: VueApexCharts,
    },

    data: () => ({

        chartOptions: {
            plotOptions: {
                bar: {
                  horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [
                    'Hard',
                    'Easy',
                    'Normal', 
                ],
            }
        }
    })
}
</script>