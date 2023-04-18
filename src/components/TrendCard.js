import React from 'react'
import './card.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';


function trendCard() {

    return (
        <Container>
            <Row>
            <CardGroup className="d-flex" style={{justifyContent: 'center'}}>
                <Card  style={{margin: "2px", display: 'inline-flex', width: '8rem', backgroundColor: '#7BAFD4', padding: '3px',borderRadius: '5px',
                    fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                    color: 'white'
                    }}>
                    <Card.Body>
                        <Card.Title>Comp 110</Card.Title>
                        <Card.Text>
                            Take this class its fun
                            like
                        </Card.Text>
                        <Button variant="primary">See Reviews</Button>
                    </Card.Body>
                </Card>

                <Card  style={{margin: "2px", display: 'inline-flex', width: '8rem', backgroundColor: '#7BAFD4', padding: '3px',borderRadius: '5px',
                    fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                    color: 'white'
                    }}>
                    <Card.Body>
                        <Card.Title>Comp 110</Card.Title>
                        <Card.Text>
                            Take this class its fun
                        </Card.Text>
                        <Button variant="primary">See Reviews</Button>
                    </Card.Body>
                </Card>

                <Card  style={{margin: "2px", display: 'inline-flex', width: '8rem', backgroundColor: '#7BAFD4', padding: '3px',borderRadius: '5px',
                    fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                    color: 'white'
                    }}>
                    <Card.Body>
                        <Card.Title>Comp 110</Card.Title>
                        <Card.Text>
                            Take this class its fun
                        </Card.Text>
                        <Button variant="primary">See Reviews</Button>
                    </Card.Body>
                </Card>
                
            </CardGroup>

            </Row>
        </Container>
        
        
    )
}



export default trendCard;