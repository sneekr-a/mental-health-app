var user = require('./api/user')

function setupRoute (app) {
    app.use('/user', user);
}

module.exports = setupRoute;