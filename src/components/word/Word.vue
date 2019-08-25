<template>
  <div class="container pt-4 pb-4">
    <h3 class="pt-4 pb-4"> 
      <Back/>
      {{mode}} {{wordData.word}}
    </h3>

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

          <p class="pt-1 pb-1">
            <a data-toggle="collapse" href="#ENinfoSection"  aria-expanded="false"  aria-controls="ENinfoSection">Information Section</a>
          </p>

          <div class="collapse multi-collapse" id="ENinfoSection">
            <div class="form-group">
              <label>Examples</label>
              <input v-model="wordData.EN.examplesEN" type="text" class="form-control" placeholder="Examples">
            </div>

            <div class="form-group">
              <label>Definition</label>
              <input v-model="wordData.EN.definitionEN" type="text" class="form-control" placeholder="Definition">
            </div>

            <div class="form-group">
              <label>Synonyms</label>
              <input v-model="wordData.EN.synonymsEN" type="text" class="form-control" placeholder="Synonyms">
            </div>

            <div class="form-group">
              <label>Antonyms</label>
              <input v-model="wordData.EN.antonymsEN" type="text" class="form-control" placeholder="Antonyms">
            </div>

            <div class="form-group">
              <label>Note</label>
              <input v-model="wordData.EN.noteEN" type="text" class="form-control" placeholder="Note">
            </div>  
          </div>

          <p class="pt-1 pb-1">
            <a data-toggle="collapse" href="#ENVerbSection"  aria-expanded="false"  aria-controls="ENVerbSection">Verb Section</a>
          </p>

          <div class="collapse multi-collapse" id="ENVerbSection">
            <div class="form-group">
              <label>Fisrt Person</label>
              <input v-model="wordData.EN.firstPersonEN" type="text" class="form-control" placeholder="Fisrt Person">
            </div>

            <div class="form-group">
              <label>Second Person</label>
              <input v-model="wordData.EN.secondPersonEN" type="text" class="form-control" placeholder="Second Person">
            </div>

            <div class="form-group">
              <label>Third Person</label>
              <input v-model="wordData.EN.thirdPersonEN" type="text" class="form-control" placeholder="Third Person">
            </div>

            <div class="form-group">
              <label>Past Form</label>
              <input v-model="wordData.EN.pastEN" type="text" class="form-control" placeholder="Past Form">
            </div>

            <div class="form-group">
              <label>Root Form</label>
              <input v-model="wordData.EN.rootEN" type="text" class="form-control" placeholder="Root Form">
            </div>

            <div class="form-group">
              <label>Present Form</label>
              <input v-model="wordData.EN.presentEN" type="text" class="form-control" placeholder="Present Form">
            </div>
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

          <p class="pt-1 pb-1">
            <a data-toggle="collapse" href="#ESinfoSection"  aria-expanded="false" aria-controls="ESinfoSection">Information Section</a>  
          </p>

          <div class="collapse multi-collapse" id="ESinfoSection">
            <div class="form-group">
              <label>Examples in Spanish</label>
              <input v-model="wordData.ES.examplesES" type="text" class="form-control" placeholder="Examples in Spanish">
            </div>

            <div class="form-group">
              <label>Definition in Spanish</label>
              <input v-model="wordData.ES.definitionES" type="text" class="form-control" placeholder="Definition in Spanish">
            </div>

            <div class="form-group">
              <label>Synonyms in Spanish</label>
              <input v-model="wordData.ES.synonymsES" type="text" class="form-control" placeholder="Synonyms in Spanish">
            </div>

            <div class="form-group">
              <label>Antonyms in Spanish</label>
              <input v-model="wordData.ES.antonymsES" type="text" class="form-control" placeholder="Antonyms in Spanish">
            </div>

            <div class="form-group">
              <label>Note in Spanish</label>
              <input v-model="wordData.ES.noteES" type="text" class="form-control" placeholder="Note in Spanish">
            </div>  
          </div>

          <p class="pt-1 pb-1">
            <a data-toggle="collapse" href="#ESVerbSection"  aria-expanded="false" aria-controls="ESVerbSection">Verb Section</a>  
          </p>

          <div class="collapse multi-collapse" id="ESVerbSection">
            <div class="form-group">
              <label>Fisrt Person in Spanish</label>
              <input v-model="wordData.ES.firstPersonES" type="text" class="form-control" placeholder="Fisrt Person in Spanish">
            </div>

            <div class="form-group">
              <label>Second Person in Spanish</label>
              <input v-model="wordData.ES.secondPersonES" type="text" class="form-control" placeholder="Second Person in Spanish">
            </div>

            <div class="form-group">
              <label>Third Person in Spanish</label>
              <input v-model="wordData.ES.thirdPersonES" type="text" class="form-control" placeholder="Third Person in Spanish">
            </div>

            <div class="form-group">
              <label>Past Form in Spanish</label>
              <input v-model="wordData.ES.pastES" type="text" class="form-control" placeholder="Past Form in Spanish">
            </div>

            <div class="form-group">
              <label>Root Form in Spanish</label>
              <input v-model="wordData.ES.rootES" type="text" class="form-control" placeholder="Root Form in Spanish">
            </div>

            <div class="form-group">
              <label>Present Form in Spanish</label>
              <input v-model="wordData.ES.presentES" type="text" class="form-control" placeholder="Present Form in Spanish">
            </div>
          </div>
        </div>

        <!-- Save button -->
        <div class="col-md-6">
          <button @click="save" type="button" class="btn btn-block btn-primary">Save</button>
        </div>
      </div>

    </form>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Back from '../../layout/Back';

import axios from 'axios';
export default {
  name: 'Word',
  components: { Back },
  methods: {
    save(e) {

      if (this.wordData.word && this.wordData.wordTranslation ) {

        if (this.id !== 'new') {

          console.log(this.wordData);
          // Update.
          this.wordData._id = this.id;
          this.$store
          .dispatch('updateWord', this.wordData)
          .finally(response => this.$router.push('/'));  
        } else {
          // Create a new word.
          this.$store
          .dispatch('createWord', this.wordData)
          .finally(response => this.$router.push('/'));  
        }
        
      } else {
        // Display warning message.
        swal('Required data missing', 'Complete all the required data', 'warning');
      }

      e.preventDefault();
    },
  },
  created() {
    const id = this.$route.params.id;
    
    if (id !== 'new') {
      // Load a single word.
      const word = this.$store.getters.getWord(id);
      console.log(word);

      if (word === undefined) {
        this.$router.push('/');
      } else {
        this.id = id;
        this.mode = 'Editing';
        this.wordData = {
          word: word.word,
          wordTranslation: word.wordTranslation,
          wordPronuntiation: word.wordPronuntiation,
          wordPronuntiationTranslation: word.wordPronuntiationTranslation,
          EN: word.EN,
          ES: word.ES,
          createdAt: word.createdAt,
          updatedAt: word.updatedAt,
          visible: word.visible,
          writter: word.writter,
        }
      }
    }
  },
  data: () => ({
    id: 'new',
    mode: 'Creating',
    wordData: {
      word: '',
      wordTranslation: '',
      wordPronuntiation: '',
      wordPronuntiationTranslation: '',
      EN: {},
      ES: {},
      visible: '',
      writter: '',
    }
  })
}
</script>