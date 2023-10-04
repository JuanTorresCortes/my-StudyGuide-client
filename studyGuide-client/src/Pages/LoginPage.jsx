import React from 'react'

const LoginPage = () => {
  return (
    <form action="Onsubmit" className='login-form'>
    <h3>Login</h3>
    <input type='text' placeholder=' Email address'/>
    <input type='password' placeholder=' Create password'/> 
    <button>Login</button>
    </form>
  )
}

export default LoginPage 