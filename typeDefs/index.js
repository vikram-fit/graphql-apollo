const {gql} = require('apollo-server-express');
const userTypeDefs = require('./user.js');
const taskTypeDefs = require('./task.js');


const typeDefs = gql`
    scalar Date
    
    type Query {
        _: String
    }
    type Mutation {
        _: String
    }
`;

//Placeholder because there cannot be an empty base type

module.exports = [
    typeDefs,
    userTypeDefs,
    taskTypeDefs
]