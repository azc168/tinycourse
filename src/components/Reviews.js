import React, { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

function handleFlag(id) {
  var input = window.prompt(`Please let us know why you flagged this review:`);
  if (input != null) {
    window.alert(`Thanks! This post will be reviewed by an admin.`);
  }
}

export default function Reviews(props) {
  const [reviewLists, setReviewList] = useState([]);
  const { courseDep, courseNum } = props;

  useEffect(() => {
    if(courseNum == null) {
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
      }
    };
    getReviews();
  }, [courseDep,courseNum]);

  return (
    <div className="reviews">
      {reviewLists.map((review) => {
        return (
          <div className="review">
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
      })}
    </div>
  );
}
