<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h1 class="card-title text-center">Vocabulary Builder Dashboard</h1>
            
            <form @submit.prevent="login" class="form-signin">
              <div class="form-label-group">
                <input v-model="email" type="email" class="form-control" placeholder="Email" required autofocus>
              </div>
  
              <div class="form-label-group">
                <input v-model="password"  type="password" class="form-control" placeholder="Password" required>
              </div>
  
              <button @click.prevent="login"  class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Login',
  computer: mapGetters(['get']),
  methods: {
    login() {
      const user = {
        email: this.email,
        password: this.password
      }
      
      this.$store.dispatch('loginAction', user)    
    }
  },
  data: () => ({
    email: '',
    password: ''
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
}

.card-signin .card-title {
  margin-bottom: 3rem;
  font-weight: 300;
  font-size: 2.5rem;
}

.card-signin .card-body {
  padding: 1rem;
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