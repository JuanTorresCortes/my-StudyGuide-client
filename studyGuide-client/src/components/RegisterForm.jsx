import React from 'react'

const RegisterForm = () => {
  return (
    
    <form action="Onsubmit" className='register-form'>
    <h3>Sign up for a free account</h3>
    <div>
    <input type="text" placeholder=' First name' />
    <input type="text" placeholder=' Last name' />
    </div>
    <input type='text' placeholder=' Email address'/>
    <input type='password' placeholder=' Create password'/> 
    <input type='password' placeholder=' Verify password'/>
    <button>Register</button>
    </form>
    
  )
}

export default RegisterForm 