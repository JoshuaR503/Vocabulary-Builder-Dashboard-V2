<template>
  <div class="page_content">

    <div v-if="isLoading">
      <Spinner/>
    </div>

    <div v-else-if="words.length > 0" class="content">
      <div class="d-flex pt-4 pb-4">
        <div class="mr-auto">
          <h3>Word Count: {{wordCount}}</h3>
        </div>
      
        <Add component="word" param="new"/>
      </div>
      
      <div class="page_container">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Word</th>
                <th>Translation</th>
                <th>Category</th>
                <th>Status</th>
                <th>Level</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="word in words" :key="word._id">
                <td>{{word.word}}</td>
                <td>{{word.wordTranslation}}</td>

                <td>
                  <label>{{word.EN.categoryEN}}</label>
                </td>

                <td v-if="word.visible">
                  <label class="label label-success">Public</label>
                </td>

                <td v-if="!word.visible">
                  <label class="label label-danger">Needs Revision</label>
                </td>

                <td>
                  <label v-if="word.level === 'easy'" class="label label-custom">Easy</label>
                  <label v-else-if="word.level === 'medium'" class="label label-info">Normal</label>
                  <label v-if="word.level === 'hard'" class="label label-purple">Hard</label>
                </td>

                <td>
                  <Edit component="word" :param="word._id" />
                </td>
                <td>
                  <button @click="deleteWord(word._id)" class="btn btn-danger ml-1">
                    <i class="fas fa-trash"></i>
                  </button> 
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center pagination-lg">
          
          <li  class="page-item" v-bind:class="{ disabled: skip === 0 }" >
            <button class="page-link" @click="prev">Previous</button>
          </li>

          <li class="page-item" v-bind:class="{ disabled: skip >= words.length }">
            <button class="page-link" @click="next">Next</button>
          </li>
        </ul>
      </nav>
    </div>

    <div v-else class="content">
      <Add class="pt-4" component="word" param="new"/>
      <Empty 
       title="Nothing to see here" 
       message="Start by adding new words."/>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { NEXT, PREV, } from '../../lib/config/config';
import {
  Spinner,
  Empty,
  Add,
  Edit
} from '../../layout/index';

export default {
  name: 'WordTable',
  components: { Empty, Spinner, Add, Edit },
  computed: mapGetters(['words', 'wordCount', 'isLoading', 'skip']),
  methods: {
    ...mapActions(['fetchWords', 'deleteWord', 'updateSkip']),

    next() {
      this.updateSkip(NEXT);
      this.fetchWords();
    },

    prev() {
      this.updateSkip(PREV);
      this.fetchWords();
    },
  },
  created() {
    this.fetchWords();
  },
}
</script>

<style scoped>
@import url(../../css/label.css);
</style>
