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

  const [isHome, setIsHome] = useState(true);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login";
    })
  }
  return (
    <Router>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {!isHome ? <Link to="/"> Go Home</Link> : <Link to="/createpost"> Review a Class </Link>}
        <div className='logo'>
          <h1>tinyCourse</h1>
        </div>
        {!isAuth ?  <Link to="/login"> Login </Link> : <button onClick={signUserOut}> Log Out</button>}
      </nav>
      <Routes>
        <Route path="/" element={<Homepage setIsHome={setIsHome}/>} />
        <Route path="/createpost" element={<CreatePost setIsHome = {setIsHome}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
      </Routes>
    </Router>
  );
}

export default App;
