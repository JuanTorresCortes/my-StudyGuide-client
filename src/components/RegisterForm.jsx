import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {registerUser} from '../Api/api'

const RegisterForm = () => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [password, setPassword] = useState("");
  const [varPassword, setVarPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let errorArray = [];

    if (!firstName.trim()) {
      errorArray.push("First name is required");
    }

    if (!lastName.trim()) {
      errorArray.push("Last name is required");
    }

    if (!email.trim()) {
      errorArray.push("Email is required");
    }

    if (!gradeLevel.trim()) {
      errorArray.push("GradLevel is required");
    }

    if (!password.trim()) {
      errorArray.push("Password is required");
    }

    if (password !== varPassword) {
      errorArray.push("Passwords do not match");
    }

    const userData = {
      firstName,
      lastName,
      gradeLevel,
      email,
      password
    }

      const response = await registerUser(userData);

      if (response.success === false) {
        const err = response.error;
        console.log(err)
        for (const item in err) {
            errorArray.push(err[item]);
        }
    }
    

    setErrors(errorArray);

          
      if(errorArray.length === 0){
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
     
      {errors.length > 0 && (
        <ul className='error-ul'>
          {errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
      )}
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
      <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)}>
      <option value="" disabled selected>Select Grade Level</option>
        <option value="5th">5th grade</option>
        <option value="6th">6th grade</option>
        <option value="7th">7th grade</option>
        <option value="8th">8th grade</option>
        <option value="9th">9th grade</option>
        <option value="10th">10th grade</option>
        <option value="11th">11th grade</option>
        <option value="12th">12th grade</option>
      </select>
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
    </form>
  )
}

export default RegisterForm;


//   _id: { type: String, default: uuid },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: {
//     type: String,
//     required: true,
//     lowercase: true,
//     trim: true,
//     unique: true,
//   },
//   gradeLevel: {
//     type: String,
//     enum: ["5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"],
//     required: true,
//   },
//   passwordHash: { type: String, required: true },
//   testRecord: [completedTestSchema],
