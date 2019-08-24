<template>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Word</th>
            <th>Translation</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="word in words" :key="word._id">
            <td>{{word.word}}</td>
            <td>{{word.wordTranslation}}</td>
            <td>{{word.visible ? 'Public' : 'Needs Revision'}}</td>
            <td>
              <button type="button" class="btn btn-warning mr-1">
                <i @click="editWord(word._id)" class="fas fa-pen"></i>
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-danger ml-1">
                <i @click="deleteWord(word._id)" class="fas fa-trash"></i>
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
    computed: mapGetters(['words']),
    methods: {
      ...mapActions(['fetchWords', 'deleteWord']),

      // Edit a word.
      editWord(id) {
        
        const data = {
          mode: 'Editing',
          id: id
        }

        // Set data and redirect.
        this.$store
        .dispatch('setWordMode', data)
        .finally(() => this.$router.push('/create'));
      },
    },
    created() {
      this.fetchWords();
    },
}
</script>

<style scoped>
  i {
    color: white;
  }
</style>