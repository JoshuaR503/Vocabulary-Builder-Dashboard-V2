const LIMIT = 8;
const NEXT = 8;
const PREV = -8;

const URL_API = process.env.NODE_ENV 
? 'http://localhost:5200'
: 'https://vocabulary-builder.herokuapp.com';

export {
    NEXT,
    PREV,
    LIMIT,
    URL_API,
};