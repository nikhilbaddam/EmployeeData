import React, { useContext,useState } from 'react'

import { StoreContext } from '../storeContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Login = () => {
  
  const {url,setToken,setUserName}=useContext(StoreContext);
  const navigate=useNavigate();
 
  const [data,setData]=useState({
    
    name:"",
    mobile:""
  })
  const onChangeHandler=(event)=>{

    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))

  }
  const onLogin=async(event)=>{
    event.preventDefault()
   const response =await axios.post(`${url}/employees/login`,data);
   if(response.data.success){
    setToken(response.data.token);
    setUserName(data.name);
    localStorage.setItem("token",response.data.token);
    navigate('/')
    
  }
  else{
    alert(response.data.message)
   
  }
  }


  return (
    <body id='register_body' >
      <div>
      <form onSubmit={onLogin} id='form_data' >
        <h1 className="text-3xl font-bold mb-4 ">Login</h1>
        
        <input name='name' onChange={onChangeHandler} value={data.name} type="text" className='input_data' required placeholder='Name' />
        <input name='mobile' onChange={onChangeHandler} value={data.mobile} type="tel" className='input_data' required placeholder='Mobile Number' />
        <button id='submit_btn_register'>Login</button>
        
        <p id='login_reg' className='mt-4 flex' >Dont have an account <a href="./register" className='text-blue-600 underline'> Register</a></p>
       
    
  

        
      </form>
      


    </div>
    </body>
  )
}

export default Login