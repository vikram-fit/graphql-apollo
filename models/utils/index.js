const mongoose = require('mongoose');

const {MONGO_URL} = process.env;

module.exports.connection = async()=>{
   try {
        await mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('DB Connected');
   } catch(err){
       console.log('Error');
       throw error;
   }
}