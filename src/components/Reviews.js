import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

function handleFlag(id) {
  window.alert(`Post ${id} has been reported.`);
}

export default function Reviews() {
  const [reviewLists, setReviewList] = useState([]);
  const reviewsCollectionRef = collection(db, "reviews");

  useEffect(() => {
    const getReviews = async () => {
      const data = await getDocs(reviewsCollectionRef);
      setReviewList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getReviews();
  });
  return (
    <div className="reviews">
      {reviewLists.map((review) => {
        return (
          <div className="review">
            <div className="reviewHeader">
              <div className="title">
                <h3>{review.title}</h3>
                <a className="flagLink" onClick={() => handleFlag(review.id)}>
                  <FontAwesomeIcon icon={faFlag} />
                </a>
                <h5>Posted by: {review.author.name}</h5>
                <p>Rating: {review.rate}</p>
                <p>Workload: {review.workload}</p>
                <p>Difficulty: {review.difficulty}</p>
                <p>Professor: {review.instructor}</p>
                <p>Semester: {review.semester}</p>
              </div>
            </div>
            <hr></hr>
            <div className="reviewText">
              <h4>Description:</h4>
              <p>{review.description}</p>
            </div>
          </div>
        );
      })}{" "}
    </div>
  );
}
