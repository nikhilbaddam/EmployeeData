const mongoose=require('mongoose');

const EmployeeSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:Number,required:true},
    designation:{type:String},
    gender:{type:String},
    course:{type:Array},
    profileimage:{type:String},
    createdate:{type:Date,default:Date.now}

})
module.exports=mongoose.model('Employees',EmployeeSchema);