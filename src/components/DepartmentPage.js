import React from "react";
import { Link, useParams } from "react-router-dom";
import classData from "./classData.json";
import "./departmentPage.css";

export default function DepartmentPage() {
  const { department } = useParams();
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

  return (
    <div>
      <div className="class-card-container">
        {departmentCourses.length > 0 ? (
          departmentCourses.map((course, index) => (
            <div key={index} className="class-card">
              <div className="class-header">
                <div className="class-department">
                  {department} {course.Number}
                </div>
              </div>
              <div className="class-name">{course.Name}</div>
              <div className="class-rating"> Rating:</div>
              <div className="class-workload"> Workload:</div>
              <div className="class-difficulty"> Difficulty:</div>
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
                  <div className="class-gen-ed">{course.Tags}</div>
                )}
              </div>
              <div className="class-review-link">
                <Link to={`/department/${department}/${course.Number}/reviews`} state={{courseDep:department,courseNum:course.Number}}>
                  <u>Read more reviews</u>
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
