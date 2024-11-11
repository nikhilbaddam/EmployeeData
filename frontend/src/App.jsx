import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Register from './components/Register/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import EmployeeList from './pages/EmployeeList'
import Home from './pages/Home'
const App = () => {
  return (
    <>
    <Navbar/>

    <Routes>
     <Route path='/' element={<Home/>}  />
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/employeelist' element={<EmployeeList/>}/>
      
    </Routes>
    </>
  )
}

export default App
