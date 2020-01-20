
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
      <input disabled v-model="query" @keyup="searchFeedback(query)" class="form-control"  placeholder="Feedback Search (future)">
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
              <tr v-for="singleFeedback in feedback" :key="singleFeedback._id">
                <td>{{singleFeedback.title}}</td>
                <td>{{singleFeedback.text}}</td>

                <td>
                  <button @click="redirect(singleFeedback._id)" class="btn btn-warning mr-1">
                    <i class="fas fa-eye"></i>
                  </button>
                </td>

                <td>
                  <button @click="deleteFeedback(singleFeedback._id)" class="btn btn-danger ml-1">
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

    redirect(id) {
      this.$router.push({
        name: 'feedback',
        params: { id: id }
      });
    }
  },
  created() {
    this.fetchFeedback();
  },
  
  data: () => ({
    query: '',
    NEXT: NEXT,
  })
}
</script>

<style scoped>
@import url(../../css/label.css);
</style>

<style scoped>
  i {
    color: white;
  }
</style>