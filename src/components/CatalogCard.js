import React from "react";
import { Link } from "react-router-dom";
import "./catalogCard.css";

export default function CatalogCard({ letter, departments }) {
  return (
    <div className="card">
      <header>{letter}</header>
      <br />
      <div className="department-list">
        {departments.map((department, index) => (
          <div key={index}>
            <Link to={`/department/${department}`} className="department-link">
              {department}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
