import React, { useState, useEffect } from "react";
import "./trendCard.css";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faBook,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function TrendCard({ dep, num, department }) {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    async function fetchCourseData() {
      const courseRef = collection(db, "reviews");
      const courseQuery = query(
        courseRef,
        where("department", "==", dep),
        where("course", "==", num)
      );
      const courseSnapshot = await getDocs(courseQuery);
      const courseData = courseSnapshot.docs.map((doc) => doc.data())[0];
      setCourseData(courseData);
    }

    fetchCourseData();
  }, [dep, num]);

  function renderWorkloadRating(workload) {
    const fullStars = Math.floor(workload);

    return (
      <div className="workloadRating">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            // Render a shaded star
            return (
              <FontAwesomeIcon
                key={index}
                icon={faBook}
                className="checkedBook"
              />
            );
          } else {
            // Render an empty star
            return (
              <FontAwesomeIcon
                key={index}
                icon={faBook}
                className="uncheckedBook"
              />
            );
          }
        })}
      </div>
    );
  }

  function renderStarRating(rate) {
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate - fullStars >= 0.5;

    return (
      <div className="starRating">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            // Render a shaded star
            return (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className="checkedStar"
              />
            );
          } else if (index === fullStars && hasHalfStar) {
            // Render a half shaded star
            return (
              <FontAwesomeIcon
                key={index}
                icon={faStarHalfAlt}
                className="checkedStar"
              />
            );
          } else {
            // Render an empty star
            return (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className="uncheckedStar"
              />
            );
          }
        })}
      </div>
    );
  }

  function renderDifficultyRating(difficulty) {
    const fullStars = Math.floor(difficulty);

    return (
      <div className="difficultyRating">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            // Render a shaded star
            return (
              <FontAwesomeIcon
                key={index}
                icon={faSquare}
                className="checkedSquare"
              />
            );
          } else {
            // Render an empty star
            return (
              <FontAwesomeIcon
                key={index}
                icon={faSquare}
                className="uncheckedSquare"
              />
            );
          }
        })}
      </div>
    );
  }
  return (
    <div className="trendCard">
      <header>
        {dep} {num}
      </header>
      <div className="department-name">
        <h4>{department}</h4>
      </div>
      {courseData && (
        <div className="class-ratings">
          <p className="rating">Rating:&nbsp;&nbsp;{renderStarRating(courseData.rate)}</p>
          <p className="rating">Workload:&nbsp;&nbsp;{renderWorkloadRating(courseData.workload)}</p>
          <p className="rating">Difficulty:&nbsp;&nbsp;{renderDifficultyRating(courseData.difficulty)}</p>
        </div>
      )}
      <Link className="class-button" to={`/department/${dep}/${num}/reviews`}>
        <p>Go to Class</p>
      </Link>
    </div>
  );
}
