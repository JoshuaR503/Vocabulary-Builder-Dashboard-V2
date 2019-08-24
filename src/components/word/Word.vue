<template>
  <div class="container pt-4 pb-4">
    <h3 class="pt-4 pb-4">{{mode}}</h3>

    <form @submit="save">
      <div class="row">

        <!-- English Data Column -->
        <div class="col-md-6 col-sm-6">

          <div class="form-group">
            <label>Word</label>
            <input v-model="wordData.word" type="text" class="form-control" placeholder="Word" required>
          </div>
          
          <div class="form-group">
            <label>Gramatical Category</label>
            <input v-model="wordData.EN.categoryEN" type="text" class="form-control" placeholder="Gramatical Category">
          </div>   

        </div>

        <!-- Spanish Data Column -->
        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Word in Spanish</label>
            <input v-model="wordData.wordTranslation" type="text" class="form-control" placeholder="Word in Spanish" required>
          </div>
          
          <div class="form-group">
            <label>Gramatical Category in Spanish</label>
            <input v-model="wordData.ES.categoryES" type="text" class="form-control" placeholder="Gramatical Category in Spanish">
          </div>
        </div>
      </div>

      <button @click="save" type="button" class="btn btn-block btn-primary">Save</button>
    </form>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
export default {
  name: 'Word',
  methods: {
    save(e) {

      if (this.wordData.word) {
        console.log(this.wordData);
        // Add data and redirect to main page.

        this.$store
        .dispatch('createWord', this.wordData)
        .finally(response => this.$router.push('/'));
      } else {
        // Display warning message.
        swal('Required data missing', 'Complete all the required data', 'warning');
      }

      e.preventDefault();
    },
  },
  computed: mapGetters(['wordMode']),
  created() {
    const id = this.$route.params.id;

    // See if id is set.
    if (id !== 'new') {
      // Load a single word.
      const word = this.$store.getters.getWord(id);

      // Set data.
      this.mode = 'Editing';
      this.wordData = {
        word: word.word,
        wordTranslation: word.wordTranslation,
        wordPronuntiation: word.wordPronuntiation,
        wordPronuntiationTranslation: word.wordPronuntiationTranslation,
        EN: word.EN,
        ES: word.EN,
        createdAt: word.createdAt,
        updatedAt: word.updatedAt,
        visible: word.visible,
        writter: word.writter,
      }
    } else {
      this.mode = 'Creating',
      this.wordData = {
        word: '',
        wordTranslation: '',
        wordPronuntiation: '',
        wordPronuntiationTranslation: '',
        EN: {},
        ES: {},
        createdAt: '',
        updatedAt: '',
        visible: '',
        writter: '',
      }
    }
  },
  data: () => ({
    id: null,
    mode: null,
    wordData: null
  })
}
</script>