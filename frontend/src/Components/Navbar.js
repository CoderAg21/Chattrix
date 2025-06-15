import { Link } from "react-router-dom"
import media from "../media/app_icon.svg"
import config from '../config/env';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { identity } from '../Store/user/userSlice'; 
import {loggedIn} from '../Store/auth/authSlice';
import { useSelector } from 'react-redux';
export default function Navbar() {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  // Fetch user identity from the server  
  useEffect(() => {
    const fetchIdentity = async () => {
    const res = await fetch(`${config.APP_URL}/auth`, {
      method: 'POST',
      credentials: 'include', // send cookies
    });
    if (!res.ok) {
    } else {
      const data = await res.json();
      console.log(data)
      const { email, userId, iat } = data.token;
      console.log(email,userId)
      dispatch(identity({email, userId, iat}));
      dispatch(loggedIn());
    }
  }
  fetchIdentity();
  }, [auth]);
  return (
<nav className="navbar navbar-expand-lg bg-body-rgb(244, 244, 244)}">
  <div className="container-fluid">
 
    <Link className="navbar-brand" to="/">
      <img src={media} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
      Chattrix
    </Link>
    <div>
      
      
      
      
         <button style={{display:auth?"inline":'none'}}  className="btn btn-primary rounded-circle floating-btn me-2">
      <i className="bi bi-plus fs-6"></i>
    </button>
<Link to='/signup'> <button className="btn btn-primary float-right me-2" type="submit"style={{display:auth?"none":''}}>Signup</button></Link>
<Link to={auth?'/logout':"/login"}> <button className="btn btn-outline-primary float-right me-2" type="submit">{auth?"Logout":"Login"}</button></Link>
    </div>
    
    
  </div>
</nav>
  )
}
