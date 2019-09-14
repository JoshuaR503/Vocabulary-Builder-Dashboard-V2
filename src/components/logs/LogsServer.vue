<template>
    <div class="content">
        <div>
            <h3 class="pt-4 pb-4">#{{logs.length}} Server Project  </h3>

            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Level</th>
                        <th>Sentry</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="log in logs" :key="log.id">
                        <td>{{log.title}}</td>
                        <td><label class="label label-megna">{{log.status}}</label></td>
                        <td><LogLabel :level="log.level"/></td>
                        <td>
                            <a :href="log.permalink" target="_blank"  class="btn btn-warning mr-1">
                                <i class="fas fa-arrow-right"></i>
                            </a>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <Empty v-if="logs.length === 0"
        title="Nothing to see here" 
        message="Start by adding new users."/>

    </div>
</template>

<script>
import LogLabel from './LogLabel';
export default {
    name: 'LogsServer',
    props: ['logs'],
    components: {LogLabel},
}
</script>

<style scoped>
  .fa-arrow-right {
    color: white;
  }
</style>