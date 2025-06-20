import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/env";
import {useDispatch} from 'react-redux'
import { loggedIn } from "../Store/auth/authSlice";
import Spinner from "./Spinner";
import { showSpinner } from "../Store/spinner/spinnerSlice";
import { Helmet } from "react-helmet";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message,setMessage] = useState('')

  
  const [form, setForm] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    dispatch(showSpinner("flex"))
    e.preventDefault();
    try {
      const res = await fetch(`${config.APP_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(form),
      });
      dispatch(showSpinner('none'))
      if (!res.ok) {
        setMessage("Login failed. Please try again later")
        navigate("/login");
        throw new Error("Login failed");
      } else {
        // const result = await res.json();
        dispatch(loggedIn())
        navigate("/chat");
      }
      
      // console.log('✅ Login Success:', data);
    } catch (error) {
      setMessage("Login failed. Please try again later")
      console.log(error)
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to chat securely" />
      </Helmet>
   
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-between bg-light text-dark px-4 py-5">
      {/* Login Section */}
      <main className="d-flex flex-column align-items-center justify-content-center text-center">
        <div className="col-12 col-md-6 col-lg-4 p-4 shadow bg-white rounded">
          <h2 className="mb-4 text-primary fw-bold">Login to Chattrix</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label fw-semibold">
                Email address
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-semibold">
              Login
            </button>
          </form>

          <div className="mt-3">
            <small className="text-muted">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary fw-semibold">
                Register
              </Link>
            </small>
          </div>
          <Spinner></Spinner>
      {message && (
          <div className="alert alert-danger mt-4 text-center" role="alert">
            {message}
          </div>
        )}
        </div>
      </main>
    </div>
    </>
  );
}
