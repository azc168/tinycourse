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


  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login";
    })
  }
  return (
    <Router>
      <nav>
        <Link to="/createpost"> Review a Class </Link>
        {!isAuth ?  <Link to="/login"> Login </Link> : <button onClick={signUserOut}> Log Out</button>}
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
      </Routes>
    </Router>
  );
}

export default App;
