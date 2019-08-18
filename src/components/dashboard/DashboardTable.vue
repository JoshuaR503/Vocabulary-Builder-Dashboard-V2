<template>
    <div class="table-responsive">
      <table class="table table-hover text-center">
        <thead>
          <tr>
            <th>Word</th>
            <th>Translation</th>
            <th>Status</th>
            <th>Writter</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="word in words" :key="word.id">
            <td>{{word.word}}</td>
            <td>{{word.wordTranslation}}</td>
            <td>{{word.visible ? 'Public' : 'Needs Revision'}}</td>
            <td>@{{word.writter.name}}</td>
            <td>
              <button type="button" class="btn btn-warning mr-1">
                <i class="fas fa-pen"></i>
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-danger ml-1">
                <i class="fas fa-trash"></i>
              </button>  
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'DashboardTable',
    methods: mapActions(['fetchWords']),
    computed: mapGetters(['words']),
    created() {
      this.fetchWords();
    }
}
</script>

<style scoped>
    i {
        color: white;
    }
</style>