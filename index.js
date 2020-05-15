const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');


const { tasks, users } = require('./constants/index.js');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const { connection } = require('./models/utils/index.js');
const { verifyUser } = require('./helpers/context/index.js');
const User = require('./models/user.js');

const app = express();

app.use(cors());
app.use(express.json());

connection();


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context : async({req})=>{
        await verifyUser(req);
        return {
            email: req.email//"test@gmail.com" + Math.random()
        };
    }
    //if the context is used as an object, dynamic values cannot be added.
    // context:{
    //     email: "test@gmail.com" + Math.random() //for every request, the same random value is passed.
    // }   //object or a function, can be accessed in any resolver function
});

apolloServer.applyMiddleware({
    app,
    path: '/graphql'
})

app.get('/test',(req,res,next)=>{
    next();
} ,async(req,res)=>{
            const date1 = new Date();
            let user =  await User.findOne({email: "v@t.com"});
            const date2 = new Date();
            const diffTime = Math.abs(date2 - date1);
            console.log('REST',diffTime);
    return res.send(user);
})

const {PORT} = process.env;

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`);
    console.log(`Graphql endpoint on ${apolloServer.graphqlPath}`);
});