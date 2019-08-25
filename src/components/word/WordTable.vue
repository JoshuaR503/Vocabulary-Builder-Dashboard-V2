<template>
  <div class="page_content">

    <div v-if="isLoading">
      <Spinner/>
    </div>

    <div v-else-if="words.length > 0" class="content">
      <div class="page_container">
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
      </div>
    </div>

    <div v-else class="content">
      <Empty 
       title="Nothing to see here" 
       message="Start by adding new words."/>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {
  Spinner,
  Empty
} from '../../layout/index';

export default {
  name: 'WordTable',
  components: { Empty, Spinner },
  computed: mapGetters(['words', 'isLoading']),
  methods: {

    ...mapActions(['fetchWords', 'deleteWord']),
    // Edit a word.

    editWord(id) {
      this.$router.push(`/word/${id}`);
    },
  },
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