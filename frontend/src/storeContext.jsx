import { createContext, useEffect, useState } from "react";

export const StoreContext=createContext(null)

const StoreContextProvider=(props)=>{
    const [token,setToken]=useState("");
    const [username,setUserName]=useState("");
    const url="https://employeedata-backend.onrender.com";
useEffect(()=>{
    if(localStorage.getItem("token"))
    {
        setToken(localStorage.getItem("token"));
    }
},[])



    const contextValue={
        url,
        token,
        setToken,
        username,
        setUserName

    }
    return(
       <StoreContext.Provider value={contextValue} >
            {props.children}
       </StoreContext.Provider>
    )
}
export default StoreContextProvider;
