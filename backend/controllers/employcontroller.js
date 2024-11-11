const employeemodel=require('../models/employModel.js');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';
const fs = require('fs');
const path = require('path');
const createToken=(id)=>{
    return jwt.sign({id},SECRET_KEY)

}
const addEmployee=async(req,res)=>{
   
    try {
        
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const { name, email, mobile, designation, course,gender } = req.body;
        const profileimage = `${req.file.filename}`
        
       
       // Check for duplicate email
       const existingEmail = await employeemodel.findOne({ email });
       if (existingEmail) {
           return res.status(400).json({ message: 'Email already exists' });
       }

       // Check for duplicate mobile
       const existingMobile = await employeemodel.findOne({ mobile });
       if (existingMobile) {
           return res.status(400).json({ message: 'Mobile number already exists' });
       }

        // Create a new employee
        const newEmployee = new employeemodel({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            profileimage
           
        });
        
         // Save the employee to the database
         const savedEmployee = await newEmployee.save();

         const token =createToken(savedEmployee._id)
        res.json({success:true,token})
     } catch (error) {
        console.log(error)

         res.status(500).json({ message: 'Server error', error });
     }  
}


//login user 
const loginEmployee=async(req,res)=>
{
    const {name,mobile}=req.body;
    try{
        
        const user=await employeemodel.findOne({mobile});
        if(!user){
            return res.json({success:false,message:"User Doesn't exists"})

        }
        const token=createToken(user._id);
        res.json({success:true,token})
        
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"})

    }
}


const getAllEmployees = async (req, res) => {
    try {
      const employees = await employeemodel.find(); // Fetch all employees
      res.json({ success: true, employees });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  };



  const updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, mobile } = req.body;
  
      // Prepare the fields to be updated (only name, email, and mobile)
      let updatedFields = { name, email, mobile };
  
      // If a new image is uploaded
      if (req.file) {
        // Retrieve the employee's current data
        const employee = await employeemodel.findById(id);
  
        if (!employee) {
          return res.status(404).json({ message: "Employee not found" });
        }
  
        // Delete the old image if it exists
        if (employee.profileimage) {
          const oldImagePath = path.join(__dirname, '..', 'uploads', employee.profileimage);
          fs.unlinkSync(oldImagePath); // Delete the old image file
        }
  
        // Save the new image path
        updatedFields.profileimage = req.file.filename;
      }
  
      // Update the employee in the database
      const updatedEmployee = await employeemodel.findByIdAndUpdate(id, updatedFields, { new: true });
  
      if (!updatedEmployee) {
        return res.status(400).json({ message: "Unable to update employee" });
      }
  
      return res.status(200).json({
        message: "Employee updated successfully",
        employee: updatedEmployee,
      });
  
    } catch (error) {
      console.error("Error updating employee:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  
  
  




module.exports={addEmployee,loginEmployee,getAllEmployees,updateEmployee};