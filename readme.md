# Vocabulary Builder Dashboard 

Contains the source code for the Administration Panel of Vocabulary Builder.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d2a497123da64ae091c1e71d49dc0ae3)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=JoshuaR503/Vocabulary-Builder-Dashboard-V2&amp;utm_campaign=Badge_Grade)

## Error Handling
Currently, the only error handling strategy is located in `src\helpers\httpInterceptor.js`. Any non-http error related will be reported to Sentry.

## Installation Instructions
Simply run `install.sh` or `npm run install`.
When all dependencies have been download `npm run serve`

## Features
Currently, the admin panel is meant to be simple. It only has a few features but it might have new ones in the future. Reusable components can be found in `src/layout`.

### User
- User login
- User creation, read, update and delete
- User Authentication Guards
- User Token storage

### Words
- Word creation, read, update and delete
- Word audio reproduction

### Search
- Global search

### State Management
- State management for users, words, and search

## Future Features
- User logout
- Pagination
- Sentry integration