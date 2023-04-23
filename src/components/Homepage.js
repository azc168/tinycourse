import React, { useState } from "react";
import CatalogCard from "./CatalogCard";
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

export default function Homepage({ setIsHome }) {
  setIsHome(true);
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
    searchBy: {
      display: "flex",
      width: "170px",
      margin: "auto",
      alignItems: "center",
      justifyContent: "center",
    },
    searchBox: {
      display: "flex",
      border: "2px solid #7BAFD4",
      width: "480px",
      height: "28px",
      margin: "auto",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    },
    trendingClasses: {
      display: "flex",
      border: "2px solid #7BAFD4",
      minHeight: "200px",
      margin: "auto",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
      maxWidth: "820px",
    },
  };

  const [showAllCatalogCards, setShowAllCatalogCards] = useState(false);
  const catalogCards = [
    <CatalogCard letter="A" departments={aArray} />,
    <CatalogCard letter="B" departments={bArray} />,
    <CatalogCard letter="C" departments={cArray} />,
    <CatalogCard letter="D" departments={dArray} />,
    <CatalogCard letter="E" departments={eArray} />,
    <CatalogCard letter="F" departments={fArray} />,
    <CatalogCard letter="G" departments={gArray} />,
    <CatalogCard letter="H" departments={hArray} />,
    <CatalogCard letter="I" departments={iArray} />,
    <CatalogCard letter="J" departments={jArray} />,
    // <CatalogCard letter="K" departments={kArray} />,
    // <CatalogCard letter="L" departments={lArray} />,
    // <CatalogCard letter="M" departments={mArray} />,
    // <CatalogCard letter="N" departments={nArray} />,
    // <CatalogCard letter="P" departments={pArray} />,
    // <CatalogCard letter="R" departments={rArray} />,
    // <CatalogCard letter="S" departments={sArray} />,
    // <CatalogCard letter="T" departments={tArray} />,
    // <CatalogCard letter="W" departments={wArray} />,
  ];

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
          <input
            type="text"
            id="searchBy"
            style={styles.searchBy}
            placeholder="e.g. COMP110, WB, ECON"
          ></input>
        </div>
        <div className="trendingClasses" style={styles.trendingClasses}>
          <p>
            See this week's{" "}
            <span className="blueWord" style={styles.blueWord}>
              trending classes
            </span>
          </p>
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
