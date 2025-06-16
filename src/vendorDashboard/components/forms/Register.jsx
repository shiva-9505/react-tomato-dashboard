import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';


const Register = ({showLoginHandler}) => {
  const [username, setUsername]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [error, setError]=useState("");
  const [loading, setLoading]=useState(true);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const respose= await fetch(`${API_URL}/vendor/register`,{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({username,email,password})
    })
    const data=await respose.json();
    if(respose.ok){
       console.log(data)
       setUsername("");
       setEmail("");
       setPassword("");
       alert("Vendor registered successfully");
       showLoginHandler();
    }
    else{
      setError(data.error)
    }

    } catch (error) {
      console.log("registration failed", error);
      alert("Registation Failed")
    }
  }

  return (
    <div className="registerSection">
       <form action="" className='authForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        <label>Username</label>
        <input type='text' name='username' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter Your username'/><br/>
        <label>Email</label>
        <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email'/><br/>
        <label>Password</label>
        <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password'/><br/>
        <div className="btnSubmit">
            <button type='submit'>Submit</button>
        </div>
    </form>
    </div>
  )
}

export default Register
