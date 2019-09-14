<template>
    <div class="data">        
        <label v-if="level === 'debug'" class="label label-success">Debug</label>
        <label v-else-if="level === 'info'" class="label label-info">Info</label>
        <label v-else-if="level === 'warning'" class="label label-warning">Warning</label>
        <label v-else-if="level === 'error'" class="label label-orange">Error</label>
        <label v-else-if="level === 'fatal'" class="label label-fatal">Fatal</label>
    </div>
    
</template>

<script>
export default {
    name: 'LogLabel',
    props: ['level']
}
</script>

<style>
@import url(../../css/label.css);
</style>