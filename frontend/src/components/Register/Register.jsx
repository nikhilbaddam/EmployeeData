import React, { useContext, useState } from 'react';
import './Register.css';
import { StoreContext } from '../../storeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const { url, setToken,setUserName } = useContext(StoreContext);
  
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: null
  });

  // Handle form field changes
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = name === "image" ? event.target.files[0] : event.target.value;

    if (name === "course") {
      setData(prevData => ({
        ...prevData,
        course: event.target.checked
          ? [...prevData.course, value]
          : prevData.course.filter(c => c !== value)
      }));
    } else {
      setData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  // Submit form data
  const onRegister = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
Object.keys(data).forEach((key) => {
  if (key === "course") {
    data.course.forEach((course) => formData.append("course", course));
  } else {
    formData.append(key, data[key]);
  }
});


  
    try {
      const response = await axios.post(`${url}/employees/register`, formData);
      console.log(response.data);
  
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setUserName(data.name);
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert('An error occurred during registration.');
    }
  };
  

  return (
    <body id='register_body'>
      <form onSubmit={onRegister} id='form_data' encType="multipart/form-data">
        <h1 className="text-3xl font-bold mb-3">Register</h1>
        <input name='name' onChange={onChangeHandler} value={data.name} type="text" className='input_data' required placeholder='Name' />
        <input name='email' onChange={onChangeHandler} value={data.email} type="text" className='input_data' required placeholder='Email' />
        <input name='mobile' onChange={onChangeHandler} value={data.mobile} type="tel" className='input_data' required placeholder='Mobile Number' />

        <select name="designation" onChange={onChangeHandler} value={data.designation} className='input_data' required>
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>

        <div className='container'>
          <div className='boxes'>
            <label className='text-xs' style={{ fontSize: "20px", fontWeight: "550" }}>Gender:</label>
            <label className='labels'><input type="radio" name="gender" value="Male" onChange={onChangeHandler} required /> Male</label>
            <label className='labels'><input type="radio" name="gender" value="Female" onChange={onChangeHandler} required /> Female</label>
            <label className='labels'><input type="radio" name="gender" value="Other" onChange={onChangeHandler} required /> Other</label>
          </div>

          <div className='boxes'>
            <label style={{ fontSize: "20px", fontWeight: "550" }}>Course:</label>
            <label className='labels'><input type="checkbox" name="course" value="MCA" onChange={onChangeHandler} /> MCA</label>
            <label className='labels'><input type="checkbox" name="course" value="BCA" onChange={onChangeHandler} /> BCA</label>
            <label className='labels'><input type="checkbox" name="course" value="BSC" onChange={onChangeHandler} /> BSC</label>
          </div>
        </div>

        <input type="file" name="image" onChange={onChangeHandler} className='input_data' required/>

        <button style={{ textAlign: "center" }} type='submit' id='submit_btn_register'>Register</button>
        <p style={{ marginTop: "8px" }}>Already registered? <a href="./Login" className='text-blue-600 underline'>Click here</a></p>
      </form>
    </body>
  );
};

export default Register;
