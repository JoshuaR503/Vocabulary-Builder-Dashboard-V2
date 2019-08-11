<template>
    <div class="container">
        <h1 class="text-center pt-4">Vocabulary Builder</h1>

        <form @submit="login">
          <div class="form-group pt-4">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" v-model="email" class="form-control" placeholder="Enter email">
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" v-model="password" class="form-control" placeholder="Password">
          </div>

          <button type="submit" class="btn btn-block btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Login',
    computer: mapGetters(['get']),
    methods: {
        // Authenticate the user.
        async login(e) {

            // Create user.
            const user = {
                email: this.email,
                password: this.password
            }

            // Show alert if data is missing.
            if (!user.email || !user.password) {
                swal('Data Missing!', 'Please fill all the fields', 'warning');
            }

            // Login.
            this.$store.dispatch('loginAction', user)
            .then((response) => this.$router.push('/'))
            .catch(error => {

                // Data to display to the user.
                const serverMessage = error.response.data.message || null;
                const serverResponse = serverMessage 
                ? serverMessage
                : 'Sorry for the inconvenience';

                // Display an error to the user.
                swal('Something went wrong', serverResponse, 'error');
            });
            
            e.preventDefault();
        }
    },
    data: () => ({
        email: 'josshuagarciia310@gmail.com',
        password: 'Alichai510'
    }),
}
</script>

<style scoped>

</style>