import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "" , cpassword: ""});
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name , email , password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name ,email,password,}),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect
      localStorage.setItem('authToken', json.authToken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("invalid credentials", "danger")
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>          
      <div>
      
      <div className="container my-3">
      <h2 className="my-4">Create your Account for iNotebook App</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
             Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              id="name"
              name="name"
              value={credentials.name}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
             
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              onChange={onChange}
              id="email"
              name="email"
              value={credentials.email}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
             
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={credentials.password}
              name="password"
              onChange={onChange}
              minLength = {5} required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
             Comfirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              value={credentials.cpassword}
              name="cpassword"
              onChange={onChange}
              minLength = {5} required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Signup
