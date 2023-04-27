import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faStar,
  faStarHalfAlt,
  faBook,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

function handleFlag(id) {
  var input = window.prompt(`Please let us know why you flagged this review:`);
  if (input != null) {
    window.alert(`Thanks! This post will be reviewed by an admin.`);
  }
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

function renderWorkloadRating(workload) {
  const fullStars = Math.floor(workload);
  const hasHalfStar = workload - fullStars >= 0.5;

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
        } else if (index === fullStars && hasHalfStar) {
          // Render a half shaded star
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

export default function Reviews(props) {
  const [reviewLists, setReviewList] = useState([]);
  const [noReviewsFound, setNoReviewsFound] = useState(false);
  const params = useParams();
  const { courseDep, courseNum } = {
    courseDep: params.department.toUpperCase(),
    courseNum: params.courseNum,
  };

  useEffect(() => {
    if (courseNum == null) {
      return;
    }
    const getReviews = async () => {
      const q = query(
        collection(db, "reviews"),
        where("department", "==", courseDep),
        where("course", "==", courseNum)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot && querySnapshot.docs.length > 0) {
        setReviewList(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        console.log(
          "Number of matching documents: ",
          querySnapshot.docs.length
        );
      } else {
        console.log("No matching documents found.");
        setNoReviewsFound(true);
      }
    };
    getReviews();
  }, [courseDep, courseNum]);

  return (
    <div>
      <div className="reviews">
        {reviewLists.map((review) => {
          return (
            <div className="review" key={review.id}>
              <div className="reviewHeader">
                <div className="title">
                  <button
                    className="flagLink"
                    onClick={() => handleFlag(review.id)}
                  >
                    <FontAwesomeIcon icon={faFlag} className="outlineFlag" />
                  </button>
                  <h3>{review.title}</h3>
                  <h5>Posted by: {review.author.name}</h5>
                  <p className="rating-format">
                    Rating:&nbsp;&nbsp;{renderStarRating(review.rate)}
                    {review.rate}/5
                  </p>
                  <p className="rating-format">
                    Workload:&nbsp;&nbsp;{renderWorkloadRating(review.workload)}
                    {review.workload}/5
                  </p>
                  <p className="rating-format">
                    Difficulty:&nbsp;&nbsp;
                    {renderDifficultyRating(review.difficulty)}
                    {review.difficulty}/5
                  </p>
                  <p>Professor: {review.instructor}</p>
                  <p>Semester: {review.semester}</p>
                </div>
              </div>
              <hr></hr>
              <div className="reviewText">
                <h4>Review:</h4>
                <p>{review.description}</p>
              </div>
            </div>
          );
        })}
        {noReviewsFound && (
          <div className="noReviews">
            <h3>
              Unfortunately, {courseDep} {courseNum} has no reviews yet.
            </h3>
            <Link to="/createpost" className="reviewButton">
              Be the first to review!
            </Link>
          </div>
        )}
      </div>
      <div className = "backBtn">
        <Link to={`/department/${courseDep}`}>
          <u id="backToCourses">Back to All {courseDep} Courses</u>
        </Link>
      </div>
    </div> 
  );
}
