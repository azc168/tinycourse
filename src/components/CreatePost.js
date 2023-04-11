import React, { useState, useEffect } from "react";
import "./createpost.css";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ setIsHome, isAuth }) {
  setIsHome(false);
  const [department, setDepartment] = useState("COMP");
  const [course, setCourse] = useState("");
  const [instructor, setInstructor] = useState("");
  const [attendance, setAttendance] = useState("Yes");
  const [semester, setSemester] = useState("Fall");
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState("");
  const [workload, setWorkload] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("yes");

  const reviewsCollectionRef = collection(db, "reviews");
  let navigate = useNavigate();
  const createPost = async () => {
    let author;
    if (name === "yes") {
        author = {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        };
      } else {
        author = { name: "anonymous" };
    }
    await addDoc(reviewsCollectionRef, {
      department,
      course,
      instructor,
      attendance,
      semester,
      title,
      rate,
      workload,
      difficulty,
      description,
      author,
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
        navigate("/");
    }
  });

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
          <select
            id="department-dropdown"
            onChange={(event) => {
              setDepartment(event.target.value);
            }}
          >
            <option value="comp">COMP</option>
            <option value="phya">PHYA</option>
            <option value="aaad">AAAD</option>
          </select>
        </div>
        <div className="course">
          <label> Course Number: </label>
          <input
            placeholder="ex: 110"
            onChange={(event) => {
              setCourse(event.target.value);
            }}
          ></input>
        </div>
        <div className="instructor">
          <label> Instructor Name: </label>
          <input
            placeholder="ex: Kris Jordan"
            onChange={(event) => {
              setInstructor(event.target.value);
            }}
          ></input>
        </div>
        <div className="attendance">
          <label> Attendance Required: </label>
          <select
            id="attendance-dropdown"
            onChange={(event) => {
              setAttendance(event.target.value);
            }}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="Semester">
          <label> Semester Taken: </label>
          <select
            id="semester-dropdown"
            onChange={(event) => {
              setSemester(event.target.value);
            }}
          >
            <option value="Fall">Fall</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
          </select>
        </div>
        <div className="title">
          <label> Title of Review: </label>
          <input
            placeholder="ex: Best Class Ever!"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></input>
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
          <input
            type="range"
            id="rating"
            name="rating"
            min="1"
            max="5"
            onChange={(event) => {
              setDifficulty(event.target.value);
            }}
          ></input>
          <span class="difficulty-label">5</span>
        </div>
      </div>
      <div className="description-container">
        <label>Description:</label>
        <br></br>
        <br></br>
        <textarea
          placeholder="What did you enjoy? Which parts of the class were you not expecting? Was the material interesting? How difficult are the exams? How is the instructor’s grading? Was the class timing difficult? (3 hour lecture, super early or late class, etc.)"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></textarea>
      </div>
      <div className="bottom-container">
        <label>Display my name on this review: </label>
        <select
          id="attendance-dropdown"
          onChange={(event) => {
            setName(event.target.value);
          }}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <button id="submit" onClick={createPost}>Publish</button>
      <button id="save">Save</button>
    </div>
  );
}
