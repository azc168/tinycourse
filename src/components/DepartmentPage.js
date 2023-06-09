import React, { useState, useEffect } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { Link, useParams } from "react-router-dom";
import classData from "./classData.json";
import "./departmentPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faBook,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function DepartmentPage() {
  const [sortValue, setSortValue] = useState("low-high-course-num");
  // eslint-disable-next-line no-unused-vars
  const [genValue, setGenValue] = useState("Any");
  const { department } = useParams();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let departmentCourses = [];
  switch (department) {
    case "COMP":
      departmentCourses = classData.Comp;
      break;
    case "BIOL":
      departmentCourses = classData.Biol;
      break;
    case "ECON":
      departmentCourses = classData.Econ;
      break;
    default:
      break;
  }

  useEffect(() => {
    if (sortValue === "high-low-course-num") {
      departmentCourses.sort(function (a, b) {
        return b.Number - a.Number;
      });
    } else if (sortValue === "low-high-course-num") {
      departmentCourses.sort(function (a, b) {
        return a.Number - b.Number;
      });
    } else if (sortValue === "high-low-rating") {
      departmentCourses.sort(function (a, b) {
        return averageRatings[b.Number] - averageRatings[a.Number];
      });
    } else if (sortValue === "low-high-rating") {
      departmentCourses.sort(function (a, b) {
        return averageRatings[a.Number] - averageRatings[b.Number];
      });
    } else if (sortValue === "high-low-workload") {
      departmentCourses.sort(function (a, b) {
        return averageWorkload[b.Number] - averageWorkload[a.Number];
      });
    } else if (sortValue === "low-high-workload") {
      departmentCourses.sort(function (a, b) {
        return averageWorkload[a.Number] - averageWorkload[b.Number];
      });
    } else if (sortValue === "high-low-difficulty") {
      departmentCourses.sort(function (a, b) {
        return averageDiff[b.Number] - averageDiff[a.Number];
      });
    } else if (sortValue === "low-high-difficulty") {
      departmentCourses.sort(function (a, b) {
        return averageDiff[a.Number] - averageDiff[b.Number];
      });
    }
    forceUpdate();

    //console.log(genValue);
    //console.log(departmentCourses.filter((course) => {return course.Tags === 'PX';}));
    //departmentCourses.filter((course) => course.Tags === 'PX');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortValue, genValue]);

  const [avgRating, setAvgRating] = useState([]);
  const [avgDifficulty, setAvgDifficulty] = useState([]);
  const [avgWorkload, setAvgWorkload] = useState([]);
  const [courseNum, setCourseNum] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});
  const [averageWorkload, setAverageWorkload] = useState({});
  const [averageDiff, setAverageDiff] = useState({});

  const getAverages = async (department, courseNum) => {
    const courseRef = collection(db, "reviews");
    const courseQuery = query(
      courseRef,
      where("department", "==", department),
      where("course", "==", courseNum)
    );
    const courseSnapshot = await getDocs(courseQuery);
    let totalRating = 0;
    let totalDifficulty = 0;
    let totalWorkload = 0;
    courseSnapshot.forEach((doc) => {
      totalRating += Number(doc.data().rate);
      totalDifficulty += Number(doc.data().difficulty);
      totalWorkload += Number(doc.data().workload);
    });
    const numDocs = courseSnapshot.size;
    const averageRating = numDocs > 0 ? totalRating / numDocs : null;
    const averageDifficulty = numDocs > 0 ? totalDifficulty / numDocs : null;
    const averageWorkload = numDocs > 0 ? totalWorkload / numDocs : null;
    const courseNumber = courseNum;
    return [averageRating, averageDifficulty, averageWorkload, courseNumber];
  };

  useEffect(() => {
    if (departmentCourses.length > 0) {
      Promise.all(
        departmentCourses.map((course) =>
          getAverages(department, course.Number)
        )
      ).then((averages) => {
        setAvgRating(
          averages.map((avg) => {
            return avg[0];
          })
        );
        setAvgDifficulty(
          averages.map((avg) => {
            return avg[1];
          })
        );
        setAvgWorkload(
          averages.map((avg) => {
            return avg[2];
          })
        );
        setCourseNum(
          averages.map((avg) => {
            return avg[3];
          })
        );
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department, departmentCourses]);

  useEffect(() => {
    const updatedAverageRatings = {};
    for (var i = 0; i < courseNum.length; i++) {
      updatedAverageRatings[courseNum[i]] = avgRating[i];
    }
    setAverageRatings(updatedAverageRatings);
  }, [avgRating, courseNum, department, departmentCourses]);

  useEffect(() => {
    const updatedAverageWorkload = {};
    for (var i = 0; i < courseNum.length; i++) {
      updatedAverageWorkload[courseNum[i]] = avgWorkload[i];
    }
    setAverageWorkload(updatedAverageWorkload);
  }, [avgWorkload, courseNum, department, departmentCourses]);

  useEffect(() => {
    const updatedAverageDiff = {};
    for (var i = 0; i < courseNum.length; i++) {
      updatedAverageDiff[courseNum[i]] = avgDifficulty[i];
    }
    setAverageDiff(updatedAverageDiff);
  }, [avgDifficulty, courseNum, department, departmentCourses]);

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
    <div className="page-body">
      <div className="backBtnContainer">
        <div className="backButton">
          <Link to={`/`}>
            <u id="backToCourses">Back to Course Catalog</u>
          </Link>
        </div>
      </div>
      {departmentCourses.length > 0 ? (
        <div className="sort-bar">
          <label> Sort: </label>
          <select
            className="sorting"
            name="sortOptions"
            onChange={(event) => {
              setSortValue(event.target.value);
            }}
            value={sortValue}
            id="high-low"
          >
            <option value="low-high-course-num">Low-high course number</option>
            <option value="high-low-course-num">High-low course number</option>
            <option value="high-low-rating">High-low rating</option>
            <option value="low-high-rating">Low-high rating</option>
            <option value="high-low-workload">High-low workload</option>
            <option value="low-high-workload">Low-high workload</option>
            <option value="high-low-difficulty">High-low difficulty</option>
            <option value="low-high-difficulty">Low-high difficulty</option>
          </select>
          {/*
          <label id="genId"> Filter by Gen Ed: </label>
          <select
            className="gened"
            name="genedOptions"
            onChange={(event) => {
              setGenValue(event.target.value);
            }}
            value={genValue}
            id="gen-ed"
          >
            <option value="Any">Any</option>
            <option value="CI">CI</option>
            <option value="EE">EE</option>
            <option value="PL">PL</option>
            <option value="PX">PX</option>
            <option value="QR">QR</option>
          </select>
          */}
        </div>
      ) : (
        // eslint-disable-next-line jsx-a11y/heading-has-content
        <h1></h1>
      )}
      <div className="class-card-container">
        {departmentCourses.length > 0 ? (
          departmentCourses.filter((course) => {
            const courseNumber = course.Number;
            return (
              averageRatings[courseNumber] > 0 &&
              averageWorkload[courseNumber] > 0 &&
              averageDiff[courseNumber] > 0
            );
          }).map((course, index) => (
            <div key={index} className="class-card">
              <div className="class-header">
                <div className="class-department">
                  {department} {course.Number}
                </div>
              </div>
              <div className="class-name">{course.Name}</div>
              <div className="class-rating">
                <p className="rating">
                  Rating:&nbsp;&nbsp;
                  {renderStarRating(Math.round(averageRatings[course.Number]))}
                  {Math.round(averageRatings[course.Number])}/5
                </p>
              </div>
              <div className="class-workload">
                <p className="rating">
                  Workload:&nbsp;&nbsp;
                  {renderWorkloadRating(
                    Math.round(averageWorkload[course.Number])
                  )}
                  {Math.round(averageWorkload[course.Number])}/5
                </p>
              </div>
              <div className="class-difficulty">
                <p className="rating">
                  Difficulty:&nbsp;&nbsp;
                  {renderDifficultyRating(
                    Math.round(averageDiff[course.Number])
                  )}
                  {Math.round(averageDiff[course.Number])}/5
                </p>
              </div>
              <div>
                {Array.isArray(course.Tags) && course.Tags.length > 0 && (
                  <div>
                    {course.Tags.map((tag) => (
                      <div key={tag} className="class-gen-ed">
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
                {typeof course.Tags === "string" && course.Tags !== "N/A" && (
                  <div className="class-gen-ed">
                    <p>{course.Tags}</p>
                  </div>
                )}
              </div>
              <div className="class-review-link">
                <Link to={`/department/${department}/${course.Number}/reviews`}>
                  <u>Read reviews</u>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No classes uploaded yet. Please check back at a later time.</div>
        )}
      </div>
    </div>
  );
}
