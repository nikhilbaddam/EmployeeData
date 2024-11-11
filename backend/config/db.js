const mongoose = require('mongoose');
 const connectDB=async()=>{
    await mongoose.connect(process.env.DB_LINK).then(()=>console.log("DB connected"));


}

module.exports = connectDB;