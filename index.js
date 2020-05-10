const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');


const { tasks, users } = require('./constants/index.js');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const app = express();

app.use(cors());
app.use(express.json());


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

apolloServer.applyMiddleware({
    app,
    path: '/graphql'
})

const {PORT} = process.env;

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
    console.log(`Graphql endpoint on ${apolloServer.graphqlPath}`);
});