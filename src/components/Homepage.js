import React from 'react';
import trendCard from './TrendCard';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';

export default function Homepage({setIsHome}) {
    setIsHome(true);
    const styles = {
        blurb: {
            textAlign: "center",
            color: "#7BAFD4",
            marginBottom: "20px",
        },
        boxes: {
        },
        blueWord: {
            color: "#7BAFD4",
            fontWeight: "bold",
        },
        courseCatalog: {
            display: "grid",
            gridTemplateAreas: "'header' 'content'",
            gridTemplateRows: '30px  40px',
            border: "2px solid #7BAFD4",
            width: "480px",
            height: "200px",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
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
            // display: "grid",
            // gridTemplateAreas: "'header' 'content'",
            // gridTemplateRows: '30px calc(10rem - 80px) 70px',
            border: "2px solid #7BAFD4",
            width: "480px",
            height: "180px",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
        },
        trendCards: {
            display: "inline-flex"
        }


    };

   return (
       <div className="outer">
           <div className="blurb" style={styles.blurb}>
           <p>Class reviews by students, for students. Get a glimpse into classes from up to one year ago.</p>
           </div>
           <div className="boxes" style={styles.boxes}>
                <div className="searchBox" style={styles.searchBox}>
                    <label> Search by <span className="blueWord" style={styles.blueWord}>class</span>, <span className="blueWord" style={styles.blueWord}>gen ed</span>, <span className="blueWord" style={styles.blueWord}>department</span>: </label>
                    <input type="text" id="searchBy" style={styles.searchBy} placeholder="e.g. COMP110, WB, ECON"></input>
                </div>
                <div className="trendingClasses" style={styles.trendingClasses}>
                    <p gridArea="header" className="trendTitle">See this week's <span className="blueWord" style={styles.blueWord}>trending classes</span></p>
                    <div className="trendCards">
                        <div className="card">{trendCard()}</div>
                    </div>

                </div>
                <div className="courseCatalog" style={styles.courseCatalog}>
                    <p>Browse <span className="blueWord" style={styles.blueWord}>course catalog</span></p>
                </div>
           </div>
           <div className="pagination" style={styles.pagination}>
               <p> - Viewing <span className="blueWord" style={styles.blueWord}>A</span> to <span className="blueWord" style={styles.blueWord}>B</span> - </p>
           </div>
       </div>
   )
}