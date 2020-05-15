
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');

const User = require('../models/user.js');
const Task = require('../models/task.js');
const { isAuthenticated } = require('./middleware/index.js');
const {tasks, users} = require('../constants/index.js');

const { asyncWrapper } = require('../helpers/asyncWrapper.js');

const {SECRET_KEY} = process.env;

module.exports = {
    Query: {
        users: async () => {
            try{
                const result = await User.find();
                return result;
            } catch(err){
                console.log('Error');
            }
        },
        user: combineResolvers(isAuthenticated,asyncWrapper(async(_,__,{email}) => {
            // const date1 = new Date();
            let user =  await User.findOne({email: email});
            // const date2 = new Date();
            // const diffTime = Math.abs(date2 - date1);
            // console.log('GRAPHQL',diffTime);
            if(!user){
                throw new Error("User does not exist!");
            }
            return user;

            //return users.find(user => args.id === user.id)
        }))
    },
    Mutation: {
        signup: async (_,{input}) => {
            try{
                const user = await User.findOne({email: input.email});
                if(user){
                    throw new Error('Email in use')
                }
                const passwordHash = await bcrypt.hash(input.password, 12);
                const newUser = new User({...input, password: passwordHash});
                return await newUser.save();
            } catch(err){
                console.log('Err',err)
                return err;
            }
        },
        signin: async (_,{input}) => {
            try{
                const user = await User.findOne({email: input.email});
                if(!user){
                    throw new Error('Email does not exist');
                }
                const isValid = await bcrypt.compare(input.password, user.password);
                if(!isValid){
                    throw new Error('Incorrect password');
                }
                const token = jwt.sign({email: user.email}, SECRET_KEY,{expiresIn: '1d'});
                return {token};
            } catch(err){
                console.log('Err',err);
                return err;
            }
        }
    },
    User:{
        tasks : async({id}) => {
           // console.log(parent, tasks);
        //    console.log(id);
           const tasks = await Task.find({user: id});
           return tasks
            //return tasks.filter(task => parent.id === task.userId)
        },
        //createdAt: () => '2020-05-10 14:28:03.056Z'
    }
}