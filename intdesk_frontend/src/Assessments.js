import React, { useEffect, useState } from 'react';
import { Card, Col, Row , Button} from 'antd';
import { Navigate, Link } from 'react-router-dom';
import axios from "axios";
import Navbar from "./navbar";
import './assess.css';

const { Meta } = Card;





function Assessments() {

    const flashcards = [
        { id: 1, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 2, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 3, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 4, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 5, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 6, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 7, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 8, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 9, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 10, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 11, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 12, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 13, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 14, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
    ];

    const [assessments, setAssessments] = useState([]);

    // Extracting this method made it accessible for context/prop-drilling
    const fetchAssessments = () => {
          axios.get("http://localhost:8000/assessments/assessment/")
          .then(res => {
            console.log(window.$log = res.data);
            const ara = res.data;
            console.log(window.$log = ara);
            setAssessments(ara);
            })
          .catch(err => {
            console.log(err);
          })
      };

      useEffect(() => {    
        fetchAssessments();
      }, []);

    const element = assessments.map(assess_ind => (
        <Col span={6}>
        <div key={assess_ind.id}>
            <Link to={`assess_ques/${assess_ind.id}`}>
            <Card className='site-card-wrapper' hoverable style={{ width: 240, height: 300}} cover={<img alt="example" className = 'photo' src={assess_ind.image_link} />} >
                <h2 style={{textAlign: "center"}}>{assess_ind.skill_name}</h2>
                <h4>Taken By : {assess_ind.taken_by}</h4>
                <h4>Passed By : {assess_ind.passed_by}</h4>
                <Button  type="link" htmlType="submit">Take Assessment Quiz </Button>
            </Card>
            </Link>
        </div>
        </Col>
    ))



    return (
        
        <div>
            <Navbar/>
            <h1 id='title'> All Assessments </h1>
            <Row gutter={[16, 24]}>
              {element}
              
            </Row>             
        </div>
    )
  }



export default Assessments;

/* cover={<img alt="example" className = 'photo' src={flashcard.image} />} */
                       
