<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h1 class="card-title text-center">Password Update</h1>
            
            <form @submit.prevent="login" class="form-signin">
              <div class="form-label-group">
                <input v-model="email" type="email" class="form-control" placeholder="Email" required autofocus>
              </div>
  
              <div class="form-label-group">
                <input v-model="oldPassword"  type="password" class="form-control" placeholder="Current Password" required>
              </div>

              <div class="form-label-group">
                <input v-model="newPassword"  type="password" class="form-control" placeholder="New Password" required>
              </div>

              <div class="form-label-group">
                <input v-model="newPassword2"  type="password" class="form-control" placeholder="Confirm new Password" required>
              </div>
  
              <button @click.prevent="login"  class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                Change password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { URL_API } from '../../lib/config/config';
import { reportExeption } from '../../lib/helpers';

export default {
  name: 'PasswordUpdate', 
  methods: {
    async login() {

      const oldPassword = this.oldPassword;
      const newPassword = this.newPassword;

      if (newPassword !== this.newPassword2) {
        swal('Passwords do not match', 'Make sure passwords match', 'warning');
      } else {

        const user = {
          email: this.email,
          oldPassword,
          newPassword,
        };

        await axios
        .post(`${URL_API}/v2/password-reset`, user)
        .then((response) => this.$router.push('/login'))
        .catch((error) => reportExeption(error));
      }
    }
  },
  data: () => ({
    email: '',
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
  }), 
}
</script>

<style scoped> 
body {
  background: #007bff;
  background: linear-gradient(to right, #0062E6, #33AEFF);
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 #a3a3a31a;
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.8rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin .btn {
  font-size: 95%;
  border-radius: 2rem;
  padding: 0.8rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: 55px;
  border-radius: 1.8rem;
  padding: 1.4rem;

}
</style>