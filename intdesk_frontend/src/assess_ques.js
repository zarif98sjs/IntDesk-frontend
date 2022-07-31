import { Typography , Button, Radio} from 'antd';
import ReactMarkdown from 'react-markdown';
import React, { useState, Component, useEffect } from 'react';
import {  Navigate, useParams } from "react-router-dom";
import axios from 'axios';


import remarkGfm from 'remark-gfm';
import Navbar from './navbar';
import "./questionIndividual.css";

const { Title, Paragraph, Text, Link } = Typography;

const markdown = `

What is the output of the following?
~~~js
try:
    if '1' != 1:
        raise "someError"
    else:
        print("someError has not occured")
except "someError":
    print ("someError has occured")
~~~
`




function AssessQues(props:any) {

  const params = useParams();
  const assessmentID = params.id;

  const [QuesId, setQuesId ] = useState(0);

  const {initialMinute = 0,initialSeconds = 5} = props;
  const [ minutes, setMinutes ] = useState(initialMinute);
  const [seconds, setSeconds ] =  useState(initialSeconds);
  useEffect(()=>{
  let myInterval = setInterval(() => {
          if (seconds > 0) {
              setSeconds(seconds - 1);
          }
          if (seconds === 0) {
              if (minutes === 0) {
                  clearInterval(myInterval)
              } else {
                  setMinutes(minutes - 1);
                  setSeconds(59);
              }
          } 
      }, 1000)
      return ()=> {
          clearInterval(myInterval);
        };
  });
    
    const data = [
        {
          id: 0,
          question_title: {markdown},
          Question_answer: [
            {
              answer_option: "option1",
              is_correct: false,
            },
            {
              answer_option: "option2",
              is_correct: false,
            },
            {
              answer_option: "option3",
              is_correct: false,
            },
            {
              answer_option: "option4",
              is_correct: true,
            },
          ],
        },
        {
          id: 1,
          question_title: {markdown},
          Question_answer: [
            {
              answer_option: "option1",
              is_correct: false,
            },
            {
              answer_option: "option2",
              is_correct: false,
            },
            {
              answer_option: "option3",
              is_correct: false,
            },
            {
              answer_option: "option4",
              is_correct: true,
            },
          ],
        }
    ];

    useEffect(() => {   
      

      const fetchComments = async () => {
        await axios.get("http://localhost:8000/assessments/assessment/".concat(assessmentID).concat("/question/"))
          .then(res => {
            const ara = res.data;
            console.log(window.$log = ara);
  
            // const hashmap = new Map();
  
            // for (let i = 0; i < ara.length; i+=1) {
  
            //   if (ara[i].hash != null && ara[i].user !==null && ara[i].parent == null) {
  
            //     const obj = {
            //         'userId' : ara[i].user.id,
            //         'comId' : ara[i].hash,
            //         'fullName' : ara[i].user.username,
            //         'text' : ara[i].comment,
            //         'userProfile' : 'https://www.linkedin.com/in/',
            //         'avatarUrl' : 'https://ui-avatars.com/api/name=Lily&background=random',
            //         'replies' : []
            //     }
  
            //     hashmap.set(obj.comId, obj);
            //   }
            // }
  
            // for (let i = 0; i < ara.length; i+=1) {
  
            //   if (ara[i].hash != null && ara[i].user != null && ara[i].parent != null){
            //     // push into replies of hashmap
            //     const obj = {
            //       'userId' : ara[i].user.id,
            //       'comId' : ara[i].hash,
            //       'fullName' : ara[i].user.username,
            //       'text' : ara[i].comment,
            //       'userProfile' : 'https://www.linkedin.com/in/',
            //       'avatarUrl' : 'https://ui-avatars.com/api/name=Lily&background=random',
            //       'replies' : []
            //     }
                
            //     hashmap.get(ara[i].parent).replies.push(obj);
            //   }
            // }
  
            // let values = [...hashmap.values()]
            // setComments(values);
          })
          .catch(err => {
            console.log(err);
          })
      };

 
          
      // // set logged in
      // setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
      
      fetchComments();
      // fetchUser();
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assessmentID]);

    const [value, setValue] = useState(1);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const loadAnotherQues = (
     
      // ( QuesId < 1 ) ? setQuesId(QuesId + 1) : console.log(QuesId)
        
      <Navigate to ='/profile'/>
    );
  

    return (
        
        <div className="">
                <Navbar/>
                {/* <h1 id='title'>   Single Question </h1> */}
                  <div >

                
                    <h1 style={{textAlign: "center"}}>Python Assessment Test</h1> 
                  </div>
                  <br/>
                  <div id='qih'>
                    <h3 style={{textAlign: "center"}}>Question {data[QuesId].id}</h3>
                  </div>
                  <br/>
                  <div style={{ display: "flex" }}>
                  { minutes === 0 && seconds === 0
                        ? loadAnotherQues
                        : <h3 id='element3' style={{textAlign: "center"}}> Time Left: {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h3> 
                    }
                  </div>
                  
                  <br/>
                  <div id='qi'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} >
                      {markdown}
                    </ReactMarkdown>
                  </div>
                  <br/>

                  <div id='qi'>
                    <Radio.Group onChange={onChange} value={value} style={{ width: 'auto' }}>
                      {data[QuesId].Question_answer.map((answer, key) => (
                        <div className='col md-4'>
                          <Radio value={answer.answer_option} size='large'> {answer.answer_option}</Radio>
                        </div> 
                        ))}
                    </Radio.Group>
                    <div style={{ display: "flex" }}>
                        
                      <Button type="primary" id='next' href="/profile"  style={{ marginLeft: "auto" }}>Next</Button>
                    </div>
                  </div>
                  <br/>
            </div>
    )
  }



export default AssessQues;

