import axios from 'axios';
import store from '../../store/index';
import router from '../../router';

// HTTP interceptor, error handling.
export default function setup() {
    // Request handler.
    axios.interceptors.request.use(request => httpInterceptorOnRequest(request));

    // Response handler.
    axios.interceptors.response.use(
        response => httpInterceptorOnSuccess(response),
        error => httpInterceptorOnError(error)
    );
}

// Request handing - Just adds an auth header.
const httpInterceptorOnRequest = request => {

    // Add authorization header.
    request.headers['x-authorization-token'] = store.getters['authToken'];

    // Return request.
    return request;
}

// Sucess Hanlder
const httpInterceptorOnSuccess = response => {
    // Display sucess message when created.
    if (response.status === 201 && response.data) {
        displaySuccess('Data Sucessfully Saved', response.data.response.message);
    }

    // Rsolve
    return response;
}
// Error handling.
const httpInterceptorOnError = error => {

    // Display error message if there is no response from the server.
    if (!error.response) {
        displayError('Something unexpected happend', error.message);
    }

    // Dispay error message from the server if authentication failed.
    if (error.response.data.message && error.response.status === 401) {
        // Display error.
        displayError('Authentication failed', error.response.data.message);
    }

    // Display error message if token expired.
    if (error.response.status === 403) {
        // Display error.
        displayError('Session expired', 'Please login again');

        // Dispatch logout action.
        store.dispatch('logoutAction');

        // Redirect to login.
        router.push('/login');
    }

    // Display 500 error.
    if (error.response.status === 500 && error.response.data) {
        // Display error.
        displayError(error.response.statusText, error.response.data.response);
    }

    // Reject.
    return Promise.reject(error);
}

// Display error message to the user.
const displayError = (title, message) => {
    swal(title, message, 'error');
}

// Display success message to the user.
const displaySuccess = (title, message) => {
    swal(title, message, 'success');
}