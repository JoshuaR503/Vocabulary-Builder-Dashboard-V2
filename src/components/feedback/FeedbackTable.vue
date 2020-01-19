
<template>
  <div class="page_content">

    <div class="d-flex pt-4 pb-4">
      <div class="mr-auto">
        <h3>Total Comments {{feedbackCount}}</h3>
      </div>

      <button @click="fetchFeedback()" class="ml-2 btn btn-primary">
        <i class="fas fa-redo-alt"></i>
      </button>
      <!-- End: Add more and refresh buttons -->
    </div>

    <div class="form-group">
      <input v-model="query" @keyup="searchFeedback(query)" class="form-control" placeholder="Word Search">
    </div>
    
    <div v-if="isFeedbackLoading">
      <Spinner/>
    </div>

    <div v-else-if="feedback.length > 0" class="fadeIn content">
      <div class="page_container">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Text</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="opionion in feedback" :key="opionion._id">
                <td>{{opionion.title}}</td>
                <td>{{opionion.text}}</td>

                <td>
                  <Edit component="feedback" :param="feedback._id" />
                </td>

                <td>
                  <button @click="deleteFeedback(opionion._id)" class="btn btn-danger ml-1">
                    <i class="fas fa-trash"></i>
                  </button> 
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <nav v-if="!query" aria-label="Page navigation example pt-2">
        <ul class="pagination justify-content-center">
          
          <li  class="page-item" v-bind:class="{ disabled: feedbackSkip === 0 }" >
            <button class="page-link" @click="prev">Previous</button>
          </li>

          <li class="page-item" v-bind:class="{ disabled: feedbackCount < feedbackSkip + NEXT }">
            <button class="page-link" @click="next">Next</button>
          </li>
        </ul>
      </nav>
    </div>

    <div v-else-if="query && !isFeedbackLoading" class="fadeIn content">
      <Empty 
        title="Could not find any results" 
        message="Try using different keywords."/>
    </div>

    <div v-else-if="query.length === 0" class="fadeIn content">
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
  name: 'FeedbackTable',
  components: { Empty, Spinner, Edit },
  computed: mapGetters(['feedback', 'feedbackCount', 'isFeedbackLoading', 'feedbackSkip']),
  methods: {
    ...mapActions(['fetchFeedback', 'searchFeedback', 'deleteFeedback', 'updateSkip']),

    next() {
      this.updateSkip(NEXT);
      this.fetchFeedback();
    },

    prev() {
      this.updateSkip(PREV);
      this.fetchFeedback();
    },
  },
  created() {
    this.fetchFeedback();
  },
  
  data: () => ({
    query: '',
    NEXT: NEXT
  })
}
</script>

<style scoped>
@import url(../../css/label.css);
</style>
