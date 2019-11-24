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
    name: 'ChartSeries',
    props: ['chartData'],

    components: {
        apexchart: VueApexCharts,
    },

    data: () => ({

        chartOptions: {
            plotOptions: {
                bar: {
                  horizontal: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [
                    'Nouns', 
                    'Verbs', 
                    'Idioms',
                    'Adverbs', 
                    'Adjectives', 
                    'Phrasal Verbs',
                ],
            }
        }
    })
}
</script>