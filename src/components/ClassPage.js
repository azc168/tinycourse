import React from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";
export default function ClassPage() {
  const { courseDep, courseNum } = useParams();

  return (
    <div>
      <Reviews courseDep={courseDep} courseNum={courseNum} />
    </div>
  );
}
