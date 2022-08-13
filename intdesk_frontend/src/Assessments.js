import React, { useEffect, useState } from 'react';
import { Card, Col, Row , Avatar, List} from 'antd';
import { Navigate, Link } from 'react-router-dom';
import axios from "axios";
import Navbar from "./navbar";
import './assess.css';

const { Meta } = Card;





function Assessments() {

   
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

      function commaSeperate(obj, separator) {
          let arr = [];
          // var i; // HERE is where you move the 'var' to the top of the function
          for (let i = 0; i < obj.length; i+=1) {
             // console.log(obj[i].name);
             arr.push(obj[i].name);
          }
          let string = "Roles :".concat( arr.join(separator || ", ") );
          if (obj.length === 0){
            string = "";
          }
          return string;
      }
      

      useEffect(() => {    
        fetchAssessments();
      }, []);


     
    const element =  (
        <List
          itemLayout="horizontal"
          dataSource={assessments}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.image_link} />}
                title={<a href={"/assessments/".concat( item.id )}>{item.skill_name}</a>}
                description= {commaSeperate(item.roles, ", ")} 
              />
            </List.Item>
          )}
        />
    )



    return (
        
        <div>
            <Navbar/>
            <h1 id='title'> All Assessments </h1>
              {element}          
        </div>
    )
  }



export default Assessments;

/* cover={<img alt="example" className = 'photo' src={flashcard.image} />} */
/*
<Link to={`${assess_ind.id}`}>
            <Card className='site-card-wrapper' hoverable style={{ width: 240, height: 300}} cover={<img alt="example" className = 'photo' src={assess_ind.image_link} />} >
                <h2 style={{textAlign: "center"}}>{assess_ind.skill_name}</h2>
                
                <h4>{commaSeperate(assess_ind.roles, ", ")}</h4>
                <h4>{assess_ind.taken_by} took this</h4>
                <Button  type="link" htmlType="submit">Take Assessment Quiz </Button>
            </Card>
            */
                       
