const express=require('express')
const cors=require('cors');
const connectDB=require('./config/db.js');
require('dotenv').config();
//app config
const app=express()
const port=4000


// middleware
app.use(express.json())
app.use(cors())


// db connection 
connectDB();


//routes api endpoints

app.use("/images",express.static('uploads'))
app.use('/employees',require('./routes/employeeroute.js'));

app.get("/",(req,res)=>{
    res.send("API working")
})


app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})