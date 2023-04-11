import React from "react";
import "./createpost.css";

export default function CreatePost({ setIsHome}) {
  setIsHome(false);

  function setRating(rating) {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
  }
  function rateProduct(rating) {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square, index) => {
      if (index < rating) {
        square.classList.add("selected");
      } else {
        square.classList.remove("selected");
      }
    });
  }
  return (
    <div className="createReviewPage">
      <div className="reviewContainer">
        <h2> Create a Review</h2>
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
        <div className="workload">
          <label> Workload: </label>
          <ul class="squares">
            <li class="workload-item">
              <div class="square" onClick={() => rateProduct(1)}></div>
            </li>
            <li class="workload-item">
              <div class="square" onClick={() => rateProduct(2)}></div>
            </li>
            <li class="workload-item">
              <div class="square" onClick={() => rateProduct(3)}></div>
            </li>
            <li class="workload-item">
              <div class="square" onClick={() => rateProduct(4)}></div>
            </li>
            <li class="workload-item">
              <div class="square" onClick={() => rateProduct(5)}></div>
            </li>
          </ul>
        </div>
        <div className="difficulty">
          <label>Difficulty: </label>
          <span class="difficulty-label">1</span>
          <input type="range" id="rating" name="rating" min="1" max="5"></input>
          <span class="difficulty-label">5</span>
        </div>
      </div>
      <div className="description-container">
        <label>Description:</label>
        <br></br>
        <br></br>
        <textarea placeholder="What did you enjoy? Which parts of the class were you not expecting? Was the material interesting? How difficult are the exams? How is the instructor’s grading? Was the class timing difficult? (3 hour lecture, super early or late class, etc.)"></textarea>
      </div>
      <div className="bottom-container">
        <label>Display my name on this review: </label>
        <select id="attendance-dropdown">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <button id="submit">Submit</button>
      <button id="save">Save</button>
    </div>
  );
}
