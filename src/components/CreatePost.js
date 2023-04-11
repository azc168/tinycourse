import React from "react";
import "./createpost.css";

export default function CreatePost() {

  function setRating(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }
  return (
    <div className="createReviewPage">
      <div className="reviewContainer">
        <h1> Create a Review</h1>
      </div>
      <div className="top-container">
        <div className="department">
          <label> Select a Department: </label>
          <select id="department-dropdown">
            <option value="comp">COMP</option>
            <option value="phya">PHYA</option>
            <option value="aaad">AAAD</option>
          </select>
        </div>
        <div className="course">
          <label> Course Number: </label>
          <input placeholder="ex: 110"></input>
        </div>
        <div className="instructor">
          <label> Instructor Name: </label>
          <input placeholder="ex: Kris Jordan"></input>
        </div>
        <div className="attendance">
          <label> Attendance Required: </label>
          <select id="attendance-dropdown">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="Semester">
          <label> Semester Taken: </label>
          <select id="semester-dropdown">
            <option value="Fall">Fall</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
          </select>
        </div>
        <div className="title">
          <label> Title of Review: </label>
          <input placeholder="ex: Best Class Ever!"></input>
        </div>
        <div className="rating">
          <label> Rating: </label>
          <div className="stars">
            <span className="star" onClick={() => setRating(1)}>
              &#9733;
            </span>
            <span className="star" onClick={() => setRating(2)}>
              &#9733;
            </span>
            <span className="star" onClick={() => setRating(3)}>
              &#9733;
            </span>
            <span className="star" onClick={() => setRating(4)}>
              &#9733;
            </span>
            <span className="star" onClick={() => setRating(5)}>
              &#9733;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
