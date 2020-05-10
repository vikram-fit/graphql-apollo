const uuid = require('uuid');

const {tasks, users} = require('../constants/index.js');

module.exports = {
    Query: {
        tasks: ()=> tasks,
        task: (_,args) => {
            //console.log(args,tasks);
            return tasks.find(task => args.id === task.id)
        },
    },
    Mutation: {
        createTask: (_,args)=>{
            console.log(args)
              const task = { ...args.input, id: uuid.v4()};
              tasks.push(task);
              return task;
        }
    },
    Task: {
        user: (parent) => users.find(user => user.id === parent.userId),
        // name : () => "tester"  //Higher precendence over the query resolver tasks, i.e tasks.name is replaced by this name
    }
}