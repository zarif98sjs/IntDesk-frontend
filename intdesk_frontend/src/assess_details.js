import { Typography , Button, Radio} from 'antd';
import ReactMarkdown from 'react-markdown';
import React, { useState, Component, useEffect } from 'react';
import {  Navigate, useParams } from "react-router-dom";
import axios from 'axios';

import Navbar from './navbar';
import "./questionIndividual.css";




function AssessDetails() {

  const params = useParams();
  const assessmentID = params.id;

  const [assessment, setAssessment] = useState([]);
  const [roles, setRoles] = useState('');

  function commaSeperate(obj, separator) {
    console.log(obj);
    let arr = [];
    // var i; // HERE is where you move the 'var' to the top of the function
    for (let i = 0; i < obj.length; i+=1) {
       console.log(obj[i].name);
       arr.push(obj[i].name);
    }
    let string = "Roles :".concat( arr.join(separator || ", ") );
    if (obj.length === 0){
      string = "";
    }
    // return string;
};

    useEffect(() => {   
      
      const fetchDetails = async () => {
        await axios.get("http://localhost:8000/assessments/assessment/".concat(assessmentID).concat("/"))
          .then(res => {
            const ara = res.data;
            console.log(window.$log = ara);
            setAssessment(res.data);

            // console.log(res.data.roles);
            let arr = [];
            for (let i = 0; i < res.data.roles.length; i+=1) {
                // console.log(res.data.roles[i].name);
                arr.push(res.data.roles[i].name);
             }

            let string = "Roles :".concat( arr.join(", ") );
            if (res.data.roles.length === 0){
                string = "";
            }
            console.log(string);
            setRoles(string);
          })
          .catch(err => {
            console.log(err);
          })
      };

      

      
      fetchDetails();
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assessmentID]);

    


    
  

    return (
        
        <div className="">
                <Navbar/>
                {/* <h1 id='title'>   Single Question </h1> */}
                  <div >
                    <h1 id='title'>{assessment.skill_name} assessment test</h1> 
                    <h4> {assessment.taken_by} took this</h4>
                    <h4> {assessment.passed_by} passed this</h4>
                    <h4>{roles}</h4>
                    <Button  type="link" htmlType="submit" href={`${assessmentID}/assess_ques`}>Take Assessment Quiz </Button>
                  </div>
                  <br/>
                  
           
                  
            </div>
    )
  }



export default AssessDetails;

