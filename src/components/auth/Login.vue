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

export default {
    name: 'Login',
    methods: {
        async login(e) {

            // Show alert if data is missing.
            if (!this.email || !this.password) {
                swal('Data Missing!', 'Please fill all the fields', 'warning');
            }

            try {
                // Make HTTP request to the server.
                axios
                .post('http://localhost:5000/v2/auth', {
                    email: this.email,
                    password: this.password
                })
                .then(response => console.log(response))
                .catch(error => {
                    // Response from the server.
                    const serverResponse = error.response.data.message;
                    
                    // Show error to the user.
                    this.displayError(
                        serverResponse 
                        ? serverResponse 
                        : 'Please try again later.'
                    );
                });
            } catch (error) {
                // Show error to the user.
                this.displayError('Sorry for the inconvenience.');
                // TODO: Report error.
                console.error(error);
            }
            
            e.preventDefault();
        },

        displayError(message) {
            swal('Something went wrong', message, 'error');
        }
    },
    data: () => ({
        email: null,
        password: null
    }),
}
</script>

<style scoped>

</style>