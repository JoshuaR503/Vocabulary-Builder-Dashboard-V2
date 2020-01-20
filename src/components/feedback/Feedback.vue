
<template>
    <div class="container pt-4 pb-4">    
        <h3 class="pt-4 pb-4"> 
          <Back/>
          Sent by: {{feedback.email}}
        </h3>

        <h2>{{feedback.title}}</h2>
        <p>{{feedback.text}}</p>

        <br>

        <div class="row">
            <div class="col-md-6 col-sm-6">
                <h6>Device metadata</h6>
                <code>{{feedback.device_data}}</code>
            </div>

            <div class="col-md-6 col-sm-6">
                <h6>User metadata</h6>
                <code>{{feedback.user_data}}</code>
            </div>
        </div>
    </div>
</template>

<script>
import { URL_API } from '../../lib/config/config';
import { Back } from '../../layout/index';
import axios from 'axios';

export default {
    name: 'Feedback',
    components: {
        Back
    },

    methods: {
        async fetchSingleFeedback() {
             // Fetch word from API and set it to state.
            this.feedback = await axios
            .get(`${URL_API}/v1/feedback/${this.$route.params.id}`)
            .then((response) => response.data.response)
            .catch((error) => this.redirectHome());
        },
    },

    filters: {
      pretty: function(value) {
        return JSON.stringify(JSON.parse(value), null, 2);
      }
    },

    created() {
      this.fetchSingleFeedback();
    },

    

    data: () => ({
      feedback: {
        title: '',
        email: '',
        text: '',
        device_data: {},
        user_data: {}
      }
    })
}   
</script>