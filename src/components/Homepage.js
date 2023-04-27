import React, { useState } from "react";
import CatalogCard from "./CatalogCard";
import Searchbar from "./Searchbar";
import "./homepage.css";
import { aArray } from "./DataArrays";
import { bArray } from "./DataArrays";
import { cArray } from "./DataArrays";
import { dArray } from "./DataArrays";
import { eArray } from "./DataArrays";
import { fArray } from "./DataArrays";
import { gArray } from "./DataArrays";
import { hArray } from "./DataArrays";
import { iArray } from "./DataArrays";
import { jArray } from "./DataArrays";
import TrendCard from "./TrendCard";
import classData from "./catalogData.json";

export default function Homepage() {
  const styles = {
    blurb: {
      textAlign: "center",
      color: "#7BAFD4",
      marginBottom: "20px",
    },
    boxes: {},
    blueWord: {
      color: "#7BAFD4",
      fontWeight: "bold",
    },
    courseCatalog: {
      border: "2px solid #7BAFD4",
      minHeight: "200px", // set a minimum height instead of a fixed height
      maxWidth: "820px",
      margin: "auto",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
      paddingBottom: "20px",
    },
    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    searchBox: {
      display: "flex",
      border: "2px solid #7BAFD4",
      width: "820px",
      height: "50px",
      margin: "auto",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    },
    trendingClasses: {
      border: "2px solid #7BAFD4",
      height: "250px",
      maxWidth: "820px",
      margin: "auto",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
      paddingBottom: "20px",
    },
    trendingContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      marginTop: "1rem"
    }
  };

  const [showAllCatalogCards, setShowAllCatalogCards] = useState(false);
  const catalogCards = [
    <CatalogCard key="A" letter="A" departments={aArray} />,
    <CatalogCard key="B" letter="B" departments={bArray} />,
    <CatalogCard key="C" letter="C" departments={cArray} />,
    <CatalogCard key="D" letter="D" departments={dArray} />,
    <CatalogCard key="E" letter="E" departments={eArray} />,
    <CatalogCard key="F" letter="F" departments={fArray} />,
    <CatalogCard key="G" letter="G" departments={gArray} />,
    <CatalogCard key="H" letter="H" departments={hArray} />,
    <CatalogCard key="I" letter="I" departments={iArray} />,
    <CatalogCard key="J" letter="J" departments={jArray} />,
  ];

  const trendCards = [
    <TrendCard dep="COMP" num="110" department="Computer Science" />,
    <TrendCard dep="COMP" num= "590" department="Computer Science" />,
    <TrendCard dep="BIOL" num="101" department="Biology" />,
  ]

  const topCatalogCards = catalogCards.slice(0, 5);

  const toggleCatalogCards = () => {
    setShowAllCatalogCards(!showAllCatalogCards);
  };

  return (
    <div className="outer">
      <div className="blurb" style={styles.blurb}>
        <p>
          Class reviews by students, for students. Get a glimpse into classes
          from up to one year ago.
        </p>
      </div>
      <div className="boxes" style={styles.boxes}>
        <div className="searchBox" style={styles.searchBox}>
          <label>
            {" "}
            Search by{" "}
            <span className="blueWord" style={styles.blueWord}>
              class
            </span>
            ,{" "}
            <span className="blueWord" style={styles.blueWord}>
              gen ed
            </span>
            ,{" "}
            <span className="blueWord" style={styles.blueWord}>
              department
            </span>
            :{" "}
          </label>
          <Searchbar placeholder={"e.g. COMP110, PH, ECON"} data={classData} />
        </div>
        <div className="trendingClasses" style={styles.trendingClasses}>
          <p>
            See this week's{" "}
            <span className="blueWord" style={styles.blueWord}>
              trending classes
            </span>
            <span className="fireEmoji">&#x1F525;</span>
            <span className="fireEmoji">&#x1F525;</span>
            <span className="fireEmoji">&#x1F525;</span>
          </p>
          <div className="trendingContainer" style={styles.trendingContainer}>
            {trendCards}
          </div>
        </div>
        <div className="courseCatalog" style={styles.courseCatalog}>
          <p>
            Browse{" "}
            <span className="blueWord" style={styles.blueWord}>
              course catalog
            </span>
          </p>
          <div className="catalog-container">
            {showAllCatalogCards ? catalogCards : topCatalogCards}
          </div>
          <button id="toggle-btn" onClick={toggleCatalogCards}>
            {showAllCatalogCards ? "View less" : "View more"}
          </button>
        </div>
      </div>
    </div>
  );
}
