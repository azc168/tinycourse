import React from 'react'
import Card from "./Card"
import {auth, provider} from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import './login.css';

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

    return (
        <div>
            <div className="loginPage" style={loginStyle}>
                <p style={spacing}>Please</p>
                <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button> 
                <p style={spacing}>to continue</p>
            </div>
            <div className="message">
                <p>You <u>must</u> be logged in to review a class!</p>
            </div>
            <div className="descriptionCardA" style={cardStyle}>
                <Card 
                    imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpF15zcPP-jGaZYPPgcwwBss0JqaklS27Vqw&usqp=CAU"
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