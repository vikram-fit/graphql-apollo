const userResolver = require('./user.js');
const taskResolver = require('./task.js');

module.exports = [
    userResolver,
    taskResolver
]