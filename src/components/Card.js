import React from 'react'
import './card.css'
import "./reviews.css";

function Card({title, imageUrl, body}) {
    return (
        <div className="card-container">
            <div className="card-content">
                <div className="card-title">
                    <h3>{title}</h3>
                </div>
                <div className="card-body">
                    <p>{body}</p>
                </div>
            </div>
            <div className="image-container">
                <img src={imageUrl} alt='' />
            </div>
        </div>
    )
}



export default Card;