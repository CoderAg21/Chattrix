import './App.css';
import React, { Suspense, lazy } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Welcome from './Components/Welcome';
import Footer from './Components/Footer';
import Spinner from './Components/Spinner';
const Login = lazy(() => import('./Components/Login'));
const Signup = lazy(() => import('./Components/Signup'));
const ChatLayout = lazy(() => import('./Components/ChatLayout'));
const AddContact = lazy(() => import('./Components/AddContact'));
const ProtectedRoute = lazy(() => import('./Components/ProtectedRoute'));
const Logout = lazy(() => import('./Components/Logout'));
// import Login from './Components/Login';
// import Signup from './Components/Signup'
// import ChatLayout from './Components/ChatLayout';
// import AddContact from './Components/AddContact';
// import ProtectedRoute from './Components/ProtectedRoute';
// import Logout from './Components/Logout';



function App() {
  return (
   <>
   <Router>
    <Navbar></Navbar>
    <Suspense fallback={<Spinner/>}>
    <Routes>
      <Route exact path = "/" element={<Welcome/>}></Route>
      <Route exact path = "/login" element={<Login/>}></Route>
      <Route exact path = "/signup" element={<Signup/>}></Route>
      <Route exact path = "/chat" element={<ProtectedRoute><ChatLayout/></ProtectedRoute>}></Route>
      <Route exact path = "/logout" element={<Logout/>}></Route>
      <Route path="/add-contact" element={<ProtectedRoute><AddContact /></ProtectedRoute>} />
      {/* <Route path="/add-group" element={<AddGroup />} /> */}
      {/* <Route path="/profile" element={<Profile/>} /> */}
    </Routes>
    </Suspense>
    <Footer></Footer>
   </Router>
   </>
  );
}

export default App;
