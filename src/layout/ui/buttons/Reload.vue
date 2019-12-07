<template>
    <div class="text-right">
        <button @click="fetchChartData" class="btn btn-primary">
          <i class="fas fa-redo-alt"></i>
        </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Reload',
    methods: {
        ...mapActions(['fetchChartData']),
    },
}
</script>