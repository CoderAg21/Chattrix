import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import config from '../config/env';
export default function Register() {
  const navigate = useNavigate()
  const [form,setForm] = useState('')
  const handleChange = (e) =>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
      try {
          const res = await fetch(`${config.APP_URL}/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
          });
          if (!res.ok) {
            throw new Error('Signup failed');
            
          }
          else{
            const result = await res.json()
            navigate('/login');
          }

        } catch (error) {
          console.log(error)
        }
  }
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-between bg-light text-dark px-4 py-5">

      {/* Signup Section */}
      <main className="d-flex flex-column align-items-center justify-content-center text-center">
        <div className="col-12 col-md-6 col-lg-5 p-4 shadow bg-white rounded">
          <h2 className="mb-4 text-primary fw-bold">Create Your Chattrix Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label onChange={handleChange} htmlFor="name" className="form-label fw-semibold">Full Names <span className='fst-italic text-muted'>(It will be shown to your contacts)</span></label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label onChange={handleChange} htmlFor="email" className="form-label fw-semibold">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label onChange={handleChange} htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
                required
              />
            </div>

            <div className="mb-4 text-start">
              <label onChange={handleChange} htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control"
                placeholder="Re-enter password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-semibold">Sign Up</button>
          </form>

          <div className="mt-3">
            <small className="text-muted">Already have an account? <Link tp="/login" className="text-primary fw-semibold">Login</Link></small>
          </div>
        </div>
      </main>

    
    </div>
  );
}
