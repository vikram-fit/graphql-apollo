
const uuid = require('uuid');

const {tasks, users} = require('../constants/index.js');
module.exports = {
    Query: {
        users: () => users,
        user: (_,args) => users.find(user => args.id === user.id) 
    },
    User:{
        tasks : (parent) => {
           // console.log(parent, tasks);
            return tasks.filter(task => parent.id === task.userId)
        }
    }
}