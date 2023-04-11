import './App.css';
import Homepage from './components/Homepage';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';
import {signOut} from 'firebase/auth';
import { auth } from './firebase-config';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const linkStyle = {
    color: "#FFFFFF",
    textDecoration: "none",
  };

  const linkBackground = {
    display: "flex",
    backgroundColor: "#7BAFD4",
    width: "120px",
    height: "40px",
    justifyContent: "center",
    alignItems: "center",
  };

  const outer = {
    margin: "2% 5% 2%",
  };

  const tinyCourseLink = {
    textDecoration: "none",
    color: "#7BAFD4",
    fontSize: "xxx-large",
    fontWeight: "500",
    textShadow: "1px 1px 2px #D3D3D3",
  };

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login";
    })
  }

  return (
    <Router>
      <div className="outer" style={outer}>
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="linkBackground" style={linkBackground}>
            <Link to="/createpost" style={linkStyle}> Review a Class </Link>
          </div> 
          <div className='tinyCourse'>
            <Link to="/" style={tinyCourseLink}> tinyCourse </Link>
          </div>
          <div className="linkBackground" style={linkBackground}>
            {!isAuth ?  <Link to="/login" style={linkStyle}> Log In </Link> : <button onClick={signUserOut}> Log Out</button>}
          </div>
          
        </nav>
      </div>
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
      </Routes>
    </Router>
  );
}

export default App;
