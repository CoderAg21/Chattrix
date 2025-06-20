import React, { useState } from 'react';
import config from '../config/env';
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet'
import { showSpinner } from '../Store/spinner/spinnerSlice';
import { useDispatch } from 'react-redux';
export default function AddContact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showSpinner("flex"))
    if (!email) {
      setMessage('Please enter a valid email address');
      return;
    }
    try {
      const res = await fetch(`${config.APP_URL}/add-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include', // send cookies
      });
      dispatch(showSpinner("none"))
      // console.log(res);

      if (!res.ok) {
        throw new Error('Failed to add contact');
      }

    
      
      setMessage(`Contact added successfully.`);
      setEmail('');
    } catch (error) {
      setMessage('Error adding contact. Please try again.');
    }

  };

  return (
    <>
      <Helmet>
        <title>Add Contacts</title>
        <meta name="description" content="Add your new contacts." />
      </Helmet>
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="col-12 col-md-6 p-4 rounded shadow bg-white">
        <h2 className="text-primary text-center mb-4">Add New Contact</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold text-secondary">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control rounded-pill px-4 py-2"
              placeholder="Enter contact's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary rounded-pill py-2">
              Add Contact
            </button>
            <Link to ='/chat'><div style={{textAlign:"center",marginTop:"10px"}}>Back to chat.</div></Link>
          </div>
        </form>

        {message && (
          <div className="alert alert-info mt-4 text-center" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
