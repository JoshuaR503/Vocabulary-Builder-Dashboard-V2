const LIMIT = 10;
const NEXT = 10;
const PREV = -10;

const URL_API = process.env.NODE_ENV 
? 'http://localhost:5200'
: 'https://vocabulary-builder.herokuapp.com';

export {
    NEXT,
    PREV,
    LIMIT,
    URL_API,
};