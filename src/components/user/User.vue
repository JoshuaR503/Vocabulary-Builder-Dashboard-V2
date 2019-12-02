<template>
  <div class="container pt-4 pb-4">

    <h3 class="pt-4 pb-4"> 
      <Back/> {{user.name}}
    </h3>

    <form @submit.prevent="save">
      <div class="row">

        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Name</label>
            <input v-model="user.name" type="text" class="form-control" placeholder="Name" required>
          </div>

          <div class="form-group">
            <label>Role</label>

            <select v-model="user.role" class="form-control">
              <option value="UpperPermission">Admin</option>
              <option value="LowerPermission">Editor</option>
            </select>
          </div>
        </div>

        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Email</label>
            <input v-model="user.email" type="text" class="form-control" placeholder="Email" required>
          </div>

          <div class="form-group">
            <label>Password</label>
            <input v-if="id !== 'new'" disabled type="text" class="form-control" placeholder="Password">
            <input v-else disabled type="text" class="form-control" placeholder="Random Password" required>
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
import { URL_API } from '../../lib/config/config';
import { Back } from '../../layout/index';
import axios from 'axios';

export default {
  name: 'User',
  components: { Back },
  methods: {
    // User edition handler.
    async editHandler(id) {

      // Fetch word from API and set it to state.
      this.user = await axios
      .get(`${URL_API}/v2/user/${id}`)
      .then((response) => response.data.response)
      .catch((error) => this.redirectHome());

      // Set mode to editing
      this.mode = 'Editing';
    },

    // Redirect to main screen.
    redirectHome() {
      this.$router.push('/')
    },

    // Save Handler
    save() {
      if (this.id !== 'new') {

        this.user._id = this.id;
        this.$store
        .dispatch('updateUser', this.user)
        .finally(() => this.redirectHome());  
      }

      this.user.password = Math.random().toString(36).slice(-8);
      this.$store
      .dispatch('createUser', this.user)
      .finally(() => this.redirectHome());  
    },

  },
  created() {
    // Set id to the router id.
    this._id = this.$route.params.id;

    // If the id is not equal to new, then we edit.
    if (this._id !== 'new') {
      this.editHandler(this._id);
    }

    // If the id is  equal to new, then we create.
    if (this._id === 'new') {
      this.mode = 'Creating'
    }
  },

  data: () => ({
    id: 'new',
    mode: '',

    user: {
      name: '',
      email: '',
      role: 'LowerPermission',
      password: '',
    }
  })
}
</script>