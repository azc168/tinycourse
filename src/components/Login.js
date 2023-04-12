import React, {Card} from 'react'
import {auth, provider} from '../firebase-config';
import {AuthErrorCodes, signInWithPopup} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import "./login.css";

 export default function Login({setIsAuth}) {
    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        });
    };

    const loginStyle = {
        display: "flex",
        border: "2px solid #7BAFD4",
        margin: "4% 32% 4%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
    };

    const spacing = {
        marginLeft: "3px",
        marginRight: "3px",
    };

    const cardStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

    const button = {
        display: "flex",
        background: "none!important",
        border: "none",
        padding: "0!important",
        /*optional*/
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#7BAFD4",
        textDecoration: "underline",
        cursor: "pointer",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "4px",

      };

    return (
        <div>
            <div className="loginPage" style={loginStyle}>
                <p style={spacing}>Please</p>
                <button className="login-with-google-btn" style={button} onClick={signInWithGoogle}>Sign in with Google</button> 
                <p style={spacing}>to continue</p>
            </div>
            <div className="descriptionCardA" style={cardStyle}>
                <Card 
                    imageUrl="https://thumbs.dreamstime.com/b/magnifying-glass-cartoon-illustration-isolated-white-magnifying-glass-black-117871094.jpg"
                    body="Browse Popular Courses" />
                <Card 
                    imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrLNphYDymieeHaZehas3iettQdmc2LOIAFQ&usqp=CAU" 
                    body = "Read Reviews By Department"/>
                <Card 
                    imageUrl="https://i.postimg.cc/fLVgC5k1/paper-g98bb13122-640.png"
                    body="Write A Review" />
            </div>
            
        </div>

    );
 }