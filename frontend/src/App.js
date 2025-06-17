import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Welcome from './Components/Welcome';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Signup from './Components/Signup'
import ChatLayout from './Components/ChatLayout';
import AddContact from './Components/AddContact';
import ProtectedRoute from './Components/ProtectedRoute';
import Logout from './Components/Logout';



function App() {
  return (
   <>
   <Router>
    <Navbar></Navbar>
    <Routes>
    

      
      <Route exact path = "/" element={<Welcome/>}></Route>
      <Route exact path = "/login" element={<Login/>}></Route>
      <Route exact path = "/signup" element={<Signup/>}></Route>
      <Route exact path = "/chat" element={<ProtectedRoute><ChatLayout/></ProtectedRoute>}></Route>
      <Route exact path = "/logout" element={<ProtectedRoute><Logout/></ProtectedRoute>}></Route>
      <Route path="/add-contact" element={<ProtectedRoute><AddContact /></ProtectedRoute>} />
      {/* <Route path="/add-group" element={<AddGroup />} /> */}
      {/* <Route path="/profile" element={<Profile/>} /> */}

    </Routes>
    <Footer></Footer>
   </Router>
   </>
  );
}

export default App;
