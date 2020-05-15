const {gql} = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        users: [User!]
        user: User
    }

    input signinInput {
        email: String!
        password: String!
    }

    input signupInput {
        name: String!
        email: String!
        password: String!
    }
    extend type Mutation {
        signup(input: signupInput): User
        signin(input: signinInput): Token

    }

    type Token {
        token: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        tasks: [Task!]
        createdAt: Date
        updatedAt: Date
    }
`;