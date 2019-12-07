<template>
  <div class="container pt-4 pb-4">    
    <h3 class="pt-4 pb-4"> 
      <Back/>
      {{word.EN.word}} - {{word.ES.word}}
    </h3>

    <form @submit.prevent="save">
      <div class="row">

        <!-- English Data Column -->
        <div class="col-md-6 col-sm-6">

          <div class="form-group">
            <label>Level</label>
            <select required v-model="word.level" class="form-control">
              <option value="easy">Beginner</option>
              <option selected value="medium">Normal</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div class="form-group">
            <label>Word</label>
            <input v-model="word.EN.word" type="text" class="form-control" placeholder="Word" required>
          </div>

          <div class="form-group">
            <label>Word Pronunciation</label>
            <input v-model="word.EN.wordPronuntiation" type="text" class="form-control" placeholder="Word">
          </div>
          
          <div class="form-group">
            <label>Gramatical Category</label>
            <input v-model="word.EN.category" type="text" class="form-control" placeholder="Gramatical Category">
          </div>

          <div class="form-group">
            <label>Gif</label>
            <input v-model="word.gif" type="text" class="form-control" placeholder="Gif url">
          </div>

          <p class="pt-1 pb-1">
            <a data-toggle="collapse" href="#ENinfoSection"  aria-expanded="true"  aria-controls="ENinfoSection">Information Section</a>
          </p>

          <div class="collapse multi-collapse" id="ENinfoSection" >
            <div class="form-group">
              <label>Examples</label>
              <textarea v-model="word.EN.examples" type="text" class="form-control" placeholder="Examples"></textarea>
            </div>

            <div class="form-group">
              <label>Definition</label>
              <textarea v-model="word.EN.definition" type="text" class="form-control" placeholder="Definition"></textarea>
            </div>

            <div class="form-group">
              <label>Synonyms</label>
              <input v-model="word.EN.synonyms" type="text" class="form-control" placeholder="Synonyms">
            </div>

            <div class="form-group">
              <label>Antonyms</label>
              <input v-model="word.EN.antonyms" type="text" class="form-control" placeholder="Antonyms">
            </div>

            <div class="form-group">
              <label>Note</label>
              <textarea v-model="word.EN.note" type="text" class="form-control" placeholder="Note"></textarea>
            </div>  
          </div>

          <p class="pt-1 pb-1">
            <a data-toggle="collapse" href="#ENVerbSection"  aria-expanded="false"  aria-controls="ENVerbSection">Verb Section</a>
          </p>

          <div class="collapse multi-collapse" id="ENVerbSection">
            <div class="form-group">
              <label>Fisrt Person</label>
              <input v-model="word.EN.firstPerson" type="text" class="form-control" placeholder="Fisrt Person">
            </div>

            <div class="form-group">
              <label>Second Person</label>
              <input v-model="word.EN.secondPerson" type="text" class="form-control" placeholder="Second Person">
            </div>

            <div class="form-group">
              <label>Third Person</label>
              <input v-model="word.EN.thirdPerson" type="text" class="form-control" placeholder="Third Person">
            </div>

            <br>

            <div class="form-group">
              <label>Fisrt Person Plural</label>
              <input v-model="word.EN.firstPersonPlural" type="text" class="form-control" placeholder="Fisrt Person Plural">
            </div>

            <div class="form-group">
              <label>Second Person Plural</label>
              <input v-model="word.EN.secondPersonPlural" type="text" class="form-control" placeholder="Second Person Plural">
            </div>

            <div class="form-group">
              <label>Third Person Plural</label>
              <input v-model="word.EN.thirdPersonPlural" type="text" class="form-control" placeholder="Third Person Plural">
            </div>

            <br>

            <div class="form-group">
              <label>Past Form</label>
              <input v-model="word.EN.past" type="text" class="form-control" placeholder="Past Form">
            </div>

            <div class="form-group">
              <label>Root Form</label>
              <input v-model="word.EN.root" type="text" class="form-control" placeholder="Root Form">
            </div>

            <div class="form-group">
              <label>Present Form</label>
              <input v-model="word.EN.present" type="text" class="form-control" placeholder="Present Form">
            </div>
          </div>

        </div>

        <!-- Spanish Data Column -->
        <div class="col-md-6 col-sm-6">

          <div class="form-group">
            <label>Target</label>
            <select required v-model="word.target" class="form-control">
              <option selected value="all">All</option>
              <option value="es">Spanish Speakers</option>
              <option value="en">English Speakers</option>
            </select>
          </div>

          <div class="form-group">
            <label>Word in Spanish</label>
            <input v-model="word.ES.word" type="text" class="form-control" placeholder="Word in Spanish" required>
          </div>

          <div class="form-group">
            <label>Word Pronunciation</label>
            <input v-model="word.ES.wordPronuntiation" type="text" class="form-control" placeholder="Word">
          </div>
          
          <div class="form-group">
            <label>Gramatical Category in Spanish</label>
            <input v-model="word.ES.category" type="text" class="form-control" placeholder="Gramatical Category in Spanish">
          </div>

          <div class="form-group">
            <label>Field left blank intentionally</label>
            <input disabled type="text" class="form-control" placeholder="Field left blank intentionally">
          </div>

          <p class="pt-1 pb-1">
            <a data-toggle="collapse" href="#ESinfoSection" aria-expanded="true" aria-controls="ESinfoSection">Information Section</a>  
          </p>

          <div class="collapse multi-collapse" id="ESinfoSection">
            <div class="form-group">
              <label>Examples in Spanish</label>
              <textarea v-model="word.ES.examples" type="text" class="form-control" placeholder="Examples in Spanish"></textarea>
            </div>

            <div class="form-group">
              <label>Definition in Spanish</label>
              <textarea v-model="word.ES.definition" type="text" class="form-control" placeholder="Definition in Spanish"></textarea>
            </div>

            <div class="form-group">
              <label>Synonyms in Spanish</label>
              <input v-model="word.ES.synonyms" type="text" class="form-control" placeholder="Synonyms in Spanish">
            </div>

            <div class="form-group">
              <label>Antonyms in Spanish</label>
              <input v-model="word.ES.antonyms" type="text" class="form-control" placeholder="Antonyms in Spanish">
            </div>

            <div class="form-group">
              <label>Note in Spanish</label>
              <textarea v-model="word.ES.note" type="text" class="form-control" placeholder="Note in Spanish"></textarea>
            </div>  
          </div>

          <p class="pt-1 pb-1">
            <a data-toggle="collapse" href="#ESVerbSection" aria-expanded="false" aria-controls="ESVerbSection">Verb Section</a>  
          </p>

          <div class="collapse multi-collapse" id="ESVerbSection">
            <div class="form-group">
              <label>Fisrt Person in Spanish</label>
              <input v-model="word.ES.firstPerson" type="text" class="form-control" placeholder="Fisrt Person in Spanish">
            </div>

            <div class="form-group">
              <label>Second Person in Spanish</label>
              <input v-model="word.ES.secondPerson" type="text" class="form-control" placeholder="Second Person in Spanish">
            </div>

            <div class="form-group">
              <label>Third Person in Spanish</label>
              <input v-model="word.ES.thirdPerson" type="text" class="form-control" placeholder="Third Person in Spanish">
            </div>

            <br>

            <div class="form-group">
              <label>Fisrt Person Plural in Spanish</label>
              <input v-model="word.ES.firstPersonPlural" type="text" class="form-control" placeholder="Fisrt Person Plural">
            </div>

            <div class="form-group">
              <label>Second Person Plural in Spanish</label>
              <input v-model="word.ES.secondPersonPlural" type="text" class="form-control" placeholder="Second Person Plural">
            </div>

            <div class="form-group">
              <label>Third Person Plural in Spanish</label>
              <input v-model="word.ES.thirdPersonPlural" type="text" class="form-control" placeholder="Third Person Plural">
            </div>

            <br>

            <div class="form-group">
              <label>Past Form in Spanish</label>
              <input v-model="word.ES.past" type="text" class="form-control" placeholder="Past Form in Spanish">
            </div>

            <div class="form-group">
              <label>Root Form in Spanish</label>
              <input v-model="word.ES.root" type="text" class="form-control" placeholder="Root Form in Spanish">
            </div>

            <div class="form-group">
              <label>Present Form in Spanish</label>
              <input v-model="word.ES.present" type="text" class="form-control" placeholder="Present Form in Spanish">
            </div>
          </div>
        </div>

        <!-- Audio player -->
        <div class="col-md-6 text-left">
          <audio class=" mt-2" controls>
            <source type="audio/mp3" v-bind:src="word.EN.wordPronuntiation">
            Your browser does not support the audio tag.
          </audio>

          <audio class=" mt-2 mb-2" controls>
            <source type="audio/mp3" v-bind:src="word.ES.wordPronuntiation" >
            Your browser does not support the audio tag.
          </audio>
        </div>

        <!-- Save button -->
        <div class="col-md-6 mt-2">

          <div class="form-check mb-4">
            <input class="form-check-input" type="checkbox" v-model="word.visible">
            <label class="form-check-label"> Display to public</label>
          </div>

          <div class="form-check mb-4">
            <input class="form-check-input" type="checkbox" v-model="updateAudio">
            <label class="form-check-label">Update Audio</label>
          </div>

          <button class="btn btn-block btn-primary">Save</button>
        </div>

      </div>
    </form>

  </div>
</template>

<script>
import { Back } from '../../layout/index';
import { URL_API } from '../../lib/config/config';
import axios from 'axios';

export default {
  name: 'Word',
  components: { Back },
  methods: {
    // Redirect to main screen.
    redirectHome() {
      this.$router.push('/')
    },

    // Save word
    save() {
      const isNotNew = this._id !== 'new';
      const action = isNotNew ? 'updateWord' : 'createWord';
    
      if (isNotNew) {
        this.word._id = this._id;
      }

      if (isNotNew && this.updateAudio) {
        this.$store
        .dispatch('updateAudioWord', this.word)
        .finally(() => this.redirectHome());
      }
      
      this.$store
      .dispatch(action, this.word)
      .finally(() => this.redirectHome());   
    }
  },
  async created() {
    // Set id to the router id.
    this._id = this.$route.params.id;

    // If the id is not equal to new, then we edit.
    if (this._id !== 'new') {
      
      // Fetch word from API and set it to state.
      this.word = await axios
      .get(`${URL_API}/v2/word/${this._id}`)
      .then((response) => response.data.response)
      .catch((error) => this.redirectHome());

      // Set mode to editing
      this.mode = 'Editing';
    }

    // If the id is  equal to new, then we create.
    if (this._id === 'new') {
      this.mode = 'Creating'
    }
  },

  data: () => ({
    _id: 'new',
    mode: '',

    updateAudio: false,
    word: {
      EN: {},
      ES: {},
      gif: '',
      target: '',
      visible: '',
      writter: '',
    }
  })

}
</script>