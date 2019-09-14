
const URL_API = process.env.NODE_ENV 
? 'http://localhost:5200'
: 'https://vocabulary-builder.herokuapp.com';

export {
    URL_API
};