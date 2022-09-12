import { Radio, Result } from 'antd';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import remarkGfm from "remark-gfm";
import "./assess.css";

function AssessResult({ wrongQues, wrongOptions, wrongVal,  points, totalPoints }) {
    console.log(AssessResult)
    console.log(wrongQues)
    console.log(points)

    const params = useParams();
    const assessmentID = params.id;
    const [endAssess, setEndAssess] = useState(false);
    const [pass, setPass] = useState(false);

    const [user, setUser] = useState([]);
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    let tempUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const getPassed = async () => {
            // console.log("inside getPassed");
            if (endAssess === true) {
              return pass;
            }
            console.log("Assessment not already checked");
            setEndAssess(true);
           
            let postData = {
              'points': points,
              'total_points': totalPoints,
              'assessment': assessmentID,
            };
        
            console.log(postData);
        
            await axios.post('http://intdesk.herokuapp.com/assessments/assessment/'.concat(assessmentID).concat('/assessment_result/'), postData, {
              headers: {
                'Authorization': 'Token '.concat(authToken.token),
                'Content-Type': 'application/json'
              }
            })
              .then(res => {
                console.log("Assessment result shown")
                console.log(window.$log = res.data);
                if (res.data === 'Passed') {
                  setPass(true);
                  return true;
                }
        
        
                return false;
        
                // setEndAssess(true);   
        
              })
              .catch(err => {
                console.log(err);
              })
        
            // setPass(false);
            return false;
          }

        getPassed();  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const showResult = (
        <div>
    
          <Result
            status={(pass === true) ? 'success' : "error"}
            title={"Total points : ".concat(points).concat(" / ").concat(totalPoints)}
            extra={[
              <Link to="/assessments" > Go back to Assessments </Link>
            ]}
          />
    
          <h1 align='center'>  Wrong Answers </h1>
    
          {wrongQues.map((item, index) => {
            return (
              <div>
                <div id='qi'>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} >
                    {item.description}
                  </ReactMarkdown>
    
                  <Radio.Group defaultValue={wrongVal[index]} style={{ width: 'auto' }}>
                    {wrongOptions[index].map((answer, key) => (
                      <div className="col md-4">
                        <Radio value={answer.description} size="large" disabled>
                          {" "}
                          {answer.description}
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
                <br /> <br />
              </div>
            );
          })}
    
        </div>
    
      )

    return (
        <div>
            {showResult}
        </div>
    );
}

export default AssessResult;
