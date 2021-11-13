var user = require('./api/user')
const post = require('./api/post')

function setupRoute (app) {
    app.use('/user', user);
    app.use('/post', post);
}

module.exports = setupRoute;