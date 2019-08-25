<template>
  <div class="container pt-4 pb-4">

    <h3 class="pt-4 pb-4"> 
      <Back/> {{mode}} {{userData.name}}
    </h3>

    <form @submit="save">
      <div class="row">

        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Name</label>
            <input v-model="userData.name" type="text" class="form-control" placeholder="Name" required>
          </div>

          <div class="form-group">
            <label>Role</label>
            <input v-model="userData.role" type="text" class="form-control" placeholder="Role" required>
          </div>
        </div>

        <div class="col-md-6 col-sm-6">
          <div class="form-group">
            <label>Email</label>
            <input v-model="userData.email" type="text" class="form-control" placeholder="Email" required>
          </div>

          <div class="form-group">
            <label>Password</label>
            <input v-model="userData.password" type="text" class="form-control" placeholder="Password" required>
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
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
import { 
  Back,
} from '../../layout/index';

export default {
  name: 'User',
  components: { Back },
  methods: {
    save(event) {

      event.preventDefault();
  
      if ( this.userData.name && 
        this.userData.email &&  
        this.userData.role ) {
        
        if (this.id !== 'new') {
          this.userData._id = this.id;
          this.$store
          .dispatch('updateUser', this.userData)
          .finally(response => this.$router.push('/'));  
  
        } else {
          this.$store
          .dispatch('createUser', this.userData)
          .finally(response => this.$router.push('/'));  
        }
  
      } else {
        swal('Required data missing', 'Complete all the required data', 'warning');
      }
    
    },
  },
  created() {
    const id = this.$route.params.id;

    if (id !== 'new') {
      const user = this.$store.getters.getUser(id);

      if (user === undefined) {
        this.$router.push('/');
      } else {
        this.id = id;
        this.mode = 'Editing';
        this.userData = user;
      }
    }
  },
  data: () => ({
    id: 'new',
    mode: 'Creating',
    userData: {
      name: null,
      email: null,
      role: null,
      password: null,
    }
  })
}
</script>