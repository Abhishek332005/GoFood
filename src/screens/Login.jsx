import React  from 'react'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {


 const [credentials, setcredentials] = useState({
    
    email: "",
    password: "",
    
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", credentials);

    // Extra required field check (optional but useful)
    if ( !credentials.email || !credentials.password ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
       
          email: credentials.email,
          password: credentials.password,
          
        })
      });

      const json = await response.json();
      console.log("Server Response:", json);

      if (json.success) {
        alert("User created successfully!");


localStorage.setItem("userEmail",credentials.email);     
localStorage.setItem("authToken",json.authToken);     
console.log(localStorage.getItem("authToken"))    
navigate("/");


      } else {
        alert("Enter valid Credentials or check backend logs");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong");
    }
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>

 <div className='container'>
      <form onSubmit={handleSubmit} autoComplete='off'>
       

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} autoComplete='off' />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} autoComplete='off' />
        </div>

      

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to='/createuser' className='m-3 btn btn-danger'>I'm a new  user</Link>
      </form>
    </div>

    </>
  )
}
