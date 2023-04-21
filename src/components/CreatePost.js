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
  const [rate, setRate] = useState("4/5");
  const [workload, setWorkload] = useState("3/5");
  const [difficulty, setDifficulty] = useState("5/5");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("yes");

  const reviewsCollectionRef = collection(db, "reviews");
  let navigate = useNavigate();

  const createPost = async () => {
    const requiredFields = [
      course,
      instructor,
      title,
      rate,
      workload,
      difficulty,
      description,
    ];
    const isValid = requiredFields.every((field) => field !== "");
    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }
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

  const backHome = () => {
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
          <label> Select a Department<span style={{ color: "red", marginRight: "15px" }}> *</span></label>
          <select
            id="department-dropdown"
            onChange={(event) => {
              setDepartment(event.target.value);
            }}
          >
            <option value="COMP">COMP</option>
            <option value="BIOL">BIOL</option>
            <option value="ECON">ECON</option>
          </select>
        </div>
        <div className="course">
          <label> Course Number<span style={{ color: "red", marginRight: "15px" }}> *</span></label>
          <input
            placeholder="ex: 110"
            onChange={(event) => {
              setCourse(event.target.value);
            }}
          ></input>
        </div>
        <div className="instructor">
          <label> Instructor Name<span style={{ color: "red", marginRight: "15px" }}> *</span></label>
          <input
            placeholder="ex: Kris Jordan"
            onChange={(event) => {
              setInstructor(event.target.value);
            }}
          ></input>
        </div>
        <div className="attendance">
          <label> Attendance Required<span style={{ color: "red", marginRight: "15px" }}> *</span></label>
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
          <label> Semester Taken<span style={{ color: "red", marginRight: "15px" }}> *</span></label>
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
          <label> Title of Review<span style={{ color: "red", marginRight: "15px" }}> *</span></label>
          <input
            placeholder="ex: Best Class Ever!"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></input>
        </div>
        <div className="rating">
          <label> Rating<span style={{ color: "red", marginRight: "15px" }}> *</span></label>
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
          <label> Workload<span style={{ color: "red" }}> *</span></label>
          <ul class="squares">
            <li class="workload-item">
              <div class="square" onClick={() => rateProduct(1 / 5)}></div>
            </li>
            <li class="workload-item">
              <div class="square" onClick={() => rateProduct(2 / 5)}></div>
            </li>
            <li class="workload-item">
              <div class="square" onClick={() => rateProduct(3 / 5)}></div>
            </li>
            <li class="workload-item">
              <div class="square" onClick={() => rateProduct(4 / 5)}></div>
            </li>
            <li class="workload-item">
              <div class="square" onClick={() => rateProduct(5 / 5)}></div>
            </li>
          </ul>
        </div>
        <div className="difficulty">
          <label>Difficulty<span style={{ color: "red", marginRight: "15px" }}> *</span></label>
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
        <label>Description<span style={{ color: "red", marginRight: "15px" }}> *</span></label>
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
        <label>Display my name on this review<span style={{ color: "red", marginRight: "15px" }}> *</span></label>
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
      <div className="submitOrSave">
        <button id="submit" onClick={createPost}>
          Publish
        </button>
        <button id="save" onClick={backHome}>
          Save
        </button>
      </div>
    </div>
  );
}
