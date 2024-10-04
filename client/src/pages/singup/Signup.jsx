import React, { useState } from 'react'
import "./Signup.scss"
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient';

const Signup = () => {

  const[name, setName] =   useState("");
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()


  async function handleSubmit(e){
    e.preventDefault();

    try {
      const result = await axiosClient.post("/auth/signup", {
        name,
        email,
        password
      });
      
      console.log("Signup result", result)
      navigate('/login')
    
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
       <div className='signup'>
      <div className="signup-box">
        <h2 className='heading'>Signup</h2>
        <form onSubmit={handleSubmit} >
          <label htmlFor="name">Name</label>
          <input type="name" className='name' id='name' onChange={(e)=> setName(e.target.value) } />

          <label htmlFor="email">Email</label>
          <input type="email" className='email' id='email' onChange={(e)=> setEmail(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input type="password" className='password' id='password' onChange={(e)=> setPassword(e.target.value)} />
          <input type="submit" className='submit'  />
        </form>
        <p className='subheading'>Already have an account? <Link to="/login"  >Login</Link> </p>
      </div>
    </div>
    </div>
  )
}

export default Signup