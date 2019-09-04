<template>
    <div class="container">
        <h1 class="text-center pt-4">Vocabulary Builder</h1>

        <form @submit.prevent="login">
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
import { mapGetters } from 'vuex';
import { reportMessage } from '../../lib/helpers';

export default {
    name: 'Login',
    computer: mapGetters(['get']),
    methods: {
        login() {
            const user = {
                email: this.email,
                password: this.password
            }

            if (!user.email || !user.password) {
                swal('Data Missing!', 'Please fill all the fields', 'warning');
            }

            // Login.
            this.$store
            .dispatch('loginAction', user)
            .then(() => this.$router.push('/'))
            .catch(error => reportMessage(error));
        }
    },
    data: () => ({
        email: 'josshuagarciia310@gmail.com',
        password: 'Alichai510'
    }),
}
</script>