import React, { useState, useEffect } from "react";
import "./createpost.css";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBook } from "@fortawesome/free-solid-svg-icons";

export default function CreatePost({isAuth }) {
  const [department, setDepartment] = useState("COMP");
  const [course, setCourse] = useState("");
  const [instructor, setInstructor] = useState("");
  const [attendance, setAttendance] = useState("Yes");
  const [semester, setSemester] = useState("Fall");
  const [title, setTitle] = useState("");
  const [rate, setRating] = useState("");
  const [rhover, setRHover] = useState(null);
  const [whover, setWHover] = useState(null);
  const [workload, setWorkload] = useState("");
  const [difficulty, setDifficulty] = useState("");
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

  return (
    <div className="createReviewPage">
      <div className="reviewContainer">
        <h2> Create a Review</h2>
      </div>
      <div className="top-container">
        <div className="left-box">
          <div className="department">
            <label>
              {" "}
              Select a Department
              <span style={{ color: "red", marginRight: "15px" }}> *</span>
            </label>
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
            <label>
              {" "}
              Course Number
              <span style={{ color: "red", marginRight: "15px" }}> *</span>
            </label>
            <input
              placeholder="ex: 110"
              onChange={(event) => {
                setCourse(event.target.value);
              }}
            ></input>
          </div>
          <div className="instructor">
            <label>
              {" "}
              Instructor Name
              <span style={{ color: "red", marginRight: "15px" }}> *</span>
            </label>
            <input
              placeholder="ex: Kris Jordan"
              onChange={(event) => {
                setInstructor(event.target.value);
              }}
            ></input>
          </div>
          <div className="attendance">
            <label>
              {" "}
              Attendance Required
              <span style={{ color: "red", marginRight: "15px" }}> *</span>
            </label>
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
            <label>
              {" "}
              Semester Taken
              <span style={{ color: "red", marginRight: "15px" }}> *</span>
            </label>
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
            <label>
              {" "}
              Title of Review
              <span style={{ color: "red", marginRight: "15px" }}> *</span>
            </label>
            <input
              placeholder="ex: Best Class Ever!"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="right-box">
          <div className="rating">
            <label>
              {" "}
              Overall Rating<span style={{ color: "red" }}> *</span>
            </label>
            <ul class="ratings">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />
                    <FontAwesomeIcon
                      icon={faStar}
                      className="rate"
                      color={
                        ratingValue <= (rhover || rate) ? "#ffc107" : "#e4e5e9"
                      }
                      onMouseEnter={() => setRHover(ratingValue)}
                      onMouseLeave={() => setRHover(null)}
                    />
                  </label>
                );
              })}
            </ul>
          </div>
          <div className="workload">
            <label>
              {" "}
              Workload<span style={{ color: "red" }}> *</span>
            </label>
            <ul class="books">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label>
                    <input
                      type="radio"
                      name="workload"
                      value={ratingValue}
                      onClick={() => setWorkload(ratingValue)}
                    />
                    <FontAwesomeIcon
                      icon={faBook}
                      className="book"
                      color={
                        ratingValue <= (whover || workload)
                          ? "#5c8da0"
                          : "#e4e5e9"
                      }
                      onMouseEnter={() => setWHover(ratingValue)}
                      onMouseLeave={() => setWHover(null)}
                    />
                  </label>
                );
              })}
            </ul>
          </div>
          <div className="difficulty">
            <label>
              Difficulty
              <span style={{ color: "red", marginRight: "15px" }}> *</span>
            </label>
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
      </div>

      <div className="description-container">
        <label>
          Description
          <span style={{ color: "red", marginRight: "15px" }}> *</span>
        </label>
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
        <label>
          Display my name on this review
          <span style={{ color: "red", marginRight: "15px" }}> *</span>
        </label>
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
        <button id="save" onClick={backHome}>
          Go Back
        </button>
        <button id="submit" onClick={createPost}>
          Publish
        </button>
      </div>
    </div>
  );
}
