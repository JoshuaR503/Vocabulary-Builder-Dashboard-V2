<template>
    <div class="content">
            
        <div class="d-flex pt-3 pb-4">
            <div class="mr-auto">
              <h4>Dashboard Project: {{logs.length}}</h4>
            </div>

            <!-- Refresh buttons -->
            <a target="_blank" class="text-right btn btn-primary"
                href='https://sentry.io/organizations/vocabulary-builder/issues/?project=1550804'>

              <i class="fas fa-external-link-alt"></i>
            </a>
            <!-- End: Refresh buttons -->
        </div>
        
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Level</th>
                        <th>Sentry</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="log in logs" :key="log.id">
                        <td>{{log.title}}</td>
                        <td><label class="label label-megna">{{log.status}}</label></td>
                        <td><LogLabel :level="log.level"/></td>
                        <td>
                            <a :href="log.permalink" target="_blank" class="btn btn-warning mr-1">
                                <i class="fas fa-arrow-right"></i>
                            </a>
                        </td>
                        <td>
                            <!-- Refresh buttons -->
                            <button @click="deleteIssue(log.id)" class="btn btn-danger ml-1">
                                <i class="fas fa-trash"></i>
                            </button>
                            <!-- End: Refresh buttons -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import LogLabel from './LogLabel';
export default {
    name: 'LogsAdmin',
    props: ['logs'],
    components: { LogLabel },
    methods: mapActions(['deleteIssue']),
}
</script>

<style scoped>
  .fa-arrow-right {
    color: white;
  }
</style>