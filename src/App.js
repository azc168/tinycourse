import "./App.css";
import Homepage from "./components/Homepage";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import DepartmentPage from "./components/DepartmentPage";
import ClassPage from "./components/ClassPage";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isHome, setIsHome] = useState(true);

  // const button = {
  //   background: "none!important",
  //   border: "none",
  //   padding: "0!important",
  //   /*optional*/
  //   fontFamily:
  //     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  //   fontSize: "16px",
  //   color: "#FFFFFF",
  //   textDecoration: "none",
  //   cursor: "pointer",
  //   backgroundColor: "#7BAFD4",
  // };

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

  const tinyCourseStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const tinyCourseLink = {
    textDecoration: "none",
    color: "#7BAFD4",
    fontSize: "xxx-large",
    fontWeight: "500",
    textShadow: "1px 1px 2px #D3D3D3",
    margin: "0px 10px 0px",
  };

  const imageStyle = {
    width: "70px",
    height: "80px",
  };

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <div className="outer" style={outer}>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="linkBackground" style={linkBackground}>
            {!isHome ? (
              <Link to="/" style={linkStyle} className="linkBackground">
                {" "}
                Back to Home
              </Link>
            ) : (
              <Link to="/createpost" style={linkStyle} className="linkBackground">
                {" "}
                Review a Class{" "}
              </Link>
            )}
          </div>
          <div className="tinyCourse" style={tinyCourseStyle}>
            <Link to="/" style={tinyCourseLink}>
              {" "}
              tinyCourse{" "}
            </Link>
            <img src="https://i.postimg.cc/Gt1nV6WZ/Screen-Shot-2023-04-11-at-11-16-25-PM.png" alt='' style={imageStyle}/>
          </div>
          <div className="linkBackground" style={linkBackground} >
            {!isAuth ? (
              <Link to="/login" style={linkStyle} className="linkBackground">
                {" "}
                Log In{" "}
              </Link>
            ) : (
              <Link onClick={signUserOut} style={linkStyle} className="linkBackground">
                {" "}
                Log Out
              </Link>
            )}
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Homepage setIsHome={setIsHome} />} />
        <Route
          path="/createpost"
          element={
            isAuth ? (
              <CreatePost setIsHome={setIsHome} isAuth={isAuth}/>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route exact path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route exact path="/department/:department" element={<DepartmentPage />} />
        <Route exact path="/department/:department/:courseNum/reviews" element={<ClassPage />} />
      </Routes>
    </Router>
  );
}

export default App;