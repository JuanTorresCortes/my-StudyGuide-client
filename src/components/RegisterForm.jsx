import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {registerUser} from '../Api/api'

const RegisterForm = () => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [varPassword, setVarPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let tempErrors = [];

    if (!firstName.trim()) {
      tempErrors.push("First name is required");
    }

    if (!lastName.trim()) {
      tempErrors.push("Last name is required");
    }

    if (!email.trim()) {
      tempErrors.push("Email is required");
    }

    if (!password.trim()) {
      tempErrors.push("Password is required");
    }

    if (password !== varPassword) {
      tempErrors.push("Passwords do not match");
    }

    setErrors(tempErrors);

    const userData = {
      firstName,
      lastName,
      email,
      password
    }

      const response = await registerUser(userData);

      console.log(response); 

      if(response.error){
        tempErrors.push(response.error)
      }
console.log(tempErrors)
      if(tempErrors.length === 0){
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        navigate('/login')
      }
    }

  return (
    <form onSubmit={handleOnSubmit} className='register-form'>
      <h3>Sign up for a free account</h3>
      <div>
        <input 
          type="text" 
          placeholder='First name' 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder='Last name' 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <input 
        type='text' 
        placeholder='Email address'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type='password' 
        placeholder='Create password' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input 
        type='password' 
        placeholder='Verify password'
        value={varPassword}
        onChange={(e) => setVarPassword(e.target.value)}
      />
      <button type="submit">Register</button>

      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
      )}
    </form>
  )
}

export default RegisterForm;
