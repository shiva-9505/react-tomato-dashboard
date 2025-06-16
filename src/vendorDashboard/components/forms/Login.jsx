import React, { useEffect, useState } from 'react'
import { API_URL } from '../../data/apiPath'



const Login = ({showWelcomeHandler}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState("");

  const submitHandle=async (e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`${API_URL}/vendor/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({email,password})
      })

      const data=await response.json();

      if(response.ok){
        setEmail("");
        setPassword("");
        alert("Login Success")
        localStorage.setItem('loginToken',data.token)
      const vendorId=data.vendorId;
      const vendorResponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      const vendorData=await vendorResponse.json();

        if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor?.firm?.[0]?.firmName;

        if (vendorFirmId && vendorFirmName) {
          localStorage.setItem('firmId', vendorFirmId);
          localStorage.setItem('firmName', vendorFirmName);
        }
      // if(vendorResponse.ok){
      //   const vendorFirmId= vendorData.vendorFirmId;
      //   console.log(vendorFirmId)
      //   const vendorFirmName = vendorData.vendor.firm[0].firmName;
      //   localStorage.setItem('firmName',vendorFirmName);
      //   localStorage.setItem('firmId',vendorFirmId);
        showWelcomeHandler()
        window.location.reload()
      }else{
        alert("unable to fetch vendor details")
      }
    }else{
      alert(data.error || "Login failed");
    }

    } catch (error) {
       console.log("login failed", error);
       alert("LogIn Failed")
    }
  }
  return (
   <div className="loginSection">
    
    <form action="" className='authForm' onSubmit={submitHandle}>
        <h3>Vendor Login</h3>
        <label>Email</label>
        <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email'/><br/>
        <label>Password</label>
        <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password'/><br/>
        <div className="btnSubmit" >
            <button type='submit'>Submit</button>
        </div>
    </form>
   </div>
  )
}

export default Login
