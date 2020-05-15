const {GraphQLDateTime} = require('graphql-iso-date');
const userResolver = require('./user.js');
const taskResolver = require('./task.js');


const customDateScalarResolver = {
    Date: GraphQLDateTime
}
module.exports = [
    userResolver,
    taskResolver,
    customDateScalarResolver
]