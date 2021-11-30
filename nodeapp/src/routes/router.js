const user = require('./api/user');
const post = require('./api/post');
const auth = require('./api/auth/authroute');

function setupRoute (app) {
    app.use('/user', user);
    app.use('/post', post);
    app.use('/auth', auth);
}

module.exports = setupRoute;