import axios from 'axios';
import store from '../store/index';

export default function setup() {
    axios.interceptors.response.use(undefined, (error) => {

        console.log(error);

        // Return to login if token has expired.
        // TODO: implement better handling.
        if (error.status === 401 ) {
            store.dispatch('logoutAction');
        }
    });
}