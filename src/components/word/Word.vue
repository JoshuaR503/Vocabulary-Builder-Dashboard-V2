<template>
  <div class="container pt-4 pb-4">    
    <h3 class="pt-4 pb-4"> 
      <Back/>
      {{mode}} {{wordData.EN.word}}
    </h3>

    <form @submit.prevent="save">
      <div class="row">

        <!-- English Data Column -->
        <div class="col-md-6 col-sm-6">

          <div class="form-group">
            <label>Level</label>
            <select v-model="wordData.level" class="form-control">
              <option value="easy">Beginner</option>
              <option value="medium">Normal</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div class="form-group">
            <label>Word</label>
            <input v-model="wordData.EN.word" type="text" class="form-control" placeholder="Word" required>
          </div>
          
          <div class="form-group">
            <label>Gramatical Category</label>
            <input v-model="wordData.EN.category" type="text" class="form-control" placeholder="Gramatical Category">
          </div>

          <p class="pt-1 pb-1">
            <a data-toggle="collapse" href="#ENinfoSection"  aria-expanded="true"  aria-controls="ENinfoSection">Information Section</a>
          </p>

          <div class="collapse multi-collapse" id="ENinfoSection" >
            <div class="form-group">
              <label>Examples</label>
              <textarea v-model="wordData.EN.examples" type="text" class="form-control" placeholder="Examples"></textarea>
            </div>

            <div class="form-group">
              <label>Definition</label>
              <textarea v-model="wordData.EN.definition" type="text" class="form-control" placeholder="Definition"></textarea>
            </div>

            <div class="form-group">
              <label>Synonyms</label>
              <input v-model="wordData.EN.synonyms" type="text" class="form-control" placeholder="Synonyms">
            </div>

            <div class="form-group">
              <label>Antonyms</label>
              <input v-model="wordData.EN.antonyms" type="text" class="form-control" placeholder="Antonyms">
            </div>

            <div class="form-group">
              <label>Note</label>
              <input v-model="wordData.EN.note" type="text" class="form-control" placeholder="Note">
            </div>  
          </div>

          <p class="pt-1 pb-1">
            <a data-toggle="collapse" href="#ENVerbSection"  aria-expanded="false"  aria-controls="ENVerbSection">Verb Section</a>
          </p>

          <div class="collapse multi-collapse" id="ENVerbSection">
            <div class="form-group">
              <label>Fisrt Person</label>
              <input v-model="wordData.EN.firstPerson" type="text" class="form-control" placeholder="Fisrt Person">
            </div>

            <div class="form-group">
              <label>Second Person</label>
              <input v-model="wordData.EN.secondPerson" type="text" class="form-control" placeholder="Second Person">
            </div>

            <div class="form-group">
              <label>Third Person</label>
              <input v-model="wordData.EN.thirdPerson" type="text" class="form-control" placeholder="Third Person">
            </div>

            <div class="form-group">
              <label>Past Form</label>
              <input v-model="wordData.EN.past" type="text" class="form-control" placeholder="Past Form">
            </div>

            <div class="form-group">
              <label>Root Form</label>
              <input v-model="wordData.EN.root" type="text" class="form-control" placeholder="Root Form">
            </div>

            <div class="form-group">
              <label>Present Form</label>
              <input v-model="wordData.EN.present" type="text" class="form-control" placeholder="Present Form">
            </div>
          </div>

        </div>

        <!-- Spanish Data Column -->
        <div class="col-md-6 col-sm-6">

          <div class="form-group">
            <label>Left blank intentionally</label>
            <input disabled type="text" class="form-control" placeholder="Left blank intentionally" required>
          </div>

          <div class="form-group">
            <label>Word in Spanish</label>
            <input v-model="wordData.ES.word" type="text" class="form-control" placeholder="Word in Spanish" required>
          </div>
          
          <div class="form-group">
            <label>Gramatical Category in Spanish</label>
            <input v-model="wordData.ES.category" type="text" class="form-control" placeholder="Gramatical Category in Spanish">
          </div>

          <p class="pt-1 pb-1">
            <a data-toggle="collapse" href="#ESinfoSection" aria-expanded="true" aria-controls="ESinfoSection">Information Section</a>  
          </p>

          <div class="collapse multi-collapse" id="ESinfoSection">
            <div class="form-group">
              <label>Examples in Spanish</label>
              <textarea v-model="wordData.ES.examples" type="text" class="form-control" placeholder="Examples in Spanish"></textarea>
            </div>

            <div class="form-group">
              <label>Definition in Spanish</label>
              <textarea v-model="wordData.ES.definition" type="text" class="form-control" placeholder="Definition in Spanish"></textarea>
            </div>

            <div class="form-group">
              <label>Synonyms in Spanish</label>
              <input v-model="wordData.ES.synonyms" type="text" class="form-control" placeholder="Synonyms in Spanish">
            </div>

            <div class="form-group">
              <label>Antonyms in Spanish</label>
              <input v-model="wordData.ES.antonyms" type="text" class="form-control" placeholder="Antonyms in Spanish">
            </div>

            <div class="form-group">
              <label>Note in Spanish</label>
              <input v-model="wordData.ES.note" type="text" class="form-control" placeholder="Note in Spanish">
            </div>  
          </div>

          <p class="pt-1 pb-1">
            <a data-toggle="collapse" href="#ESVerbSection" aria-expanded="false" aria-controls="ESVerbSection">Verb Section</a>  
          </p>

          <div class="collapse multi-collapse" id="ESVerbSection">
            <div class="form-group">
              <label>Fisrt Person in Spanish</label>
              <input v-model="wordData.ES.firstPerson" type="text" class="form-control" placeholder="Fisrt Person in Spanish">
            </div>

            <div class="form-group">
              <label>Second Person in Spanish</label>
              <input v-model="wordData.ES.secondPerson" type="text" class="form-control" placeholder="Second Person in Spanish">
            </div>

            <div class="form-group">
              <label>Third Person in Spanish</label>
              <input v-model="wordData.ES.thirdPerson" type="text" class="form-control" placeholder="Third Person in Spanish">
            </div>

            <div class="form-group">
              <label>Past Form in Spanish</label>
              <input v-model="wordData.ES.past" type="text" class="form-control" placeholder="Past Form in Spanish">
            </div>

            <div class="form-group">
              <label>Root Form in Spanish</label>
              <input v-model="wordData.ES.root" type="text" class="form-control" placeholder="Root Form in Spanish">
            </div>

            <div class="form-group">
              <label>Present Form in Spanish</label>
              <input v-model="wordData.ES.present" type="text" class="form-control" placeholder="Present Form in Spanish">
            </div>
          </div>
        </div>

        <!-- Audio player -->
        <div class="col-md-6 text-left">
          <audio class=" mt-2" controls>
            <source v-bind:src="wordData.EN.wordPronuntiation" type="audio/mp3">
            Your browser does not support the audio tag.
          </audio>

          <audio class=" mt-2 mb-2" controls>
            <source v-bind:src="wordData.ES.wordPronuntiation" type="audio/mp3">
            Your browser does not support the audio tag.
          </audio>
        </div>

        <!-- Save button -->
        <div class="col-md-6 mt-2">

          <div class="form-check mb-4">
            <input class="form-check-input" type="checkbox" v-model="wordData.visible">
            <label class="form-check-label"> Display to public</label>
          </div>

          <button @click="save" type="button" class="btn btn-block btn-primary">Save</button>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
import { Back } from '../../layout/index';

export default {
  name: 'Word',
  components: { Back },
  methods: {
    save() {
      const isNotNew = this._id !== 'new';
      const action = isNotNew ? 'updateWord' : 'createWord';
    
      if (isNotNew) {
        this.wordData._id = this._id;
      }

      this.$store
      .dispatch(action, this.wordData)
      .finally(() => this.$router.push('/')); 
    },
  },
  created() {
    this._id = this.$route.params.id;
    this.status = this._id === 'new';
    
    if (!this.status) {
  
      const word = this.$store.getters.getWord(this._id);

      if (word !== undefined) {
        this.mode = 'Editing';
        this.wordData = word;

      } else {
        this.$router.push('/');
      }
    }
  },
  data: () => ({
    _id: 'new',
    status: null,
    mode: 'Creating',
    wordData: {
      EN: {},
      ES: {},
      visible: '',
      writter: '',
    }
  })
}
</script>