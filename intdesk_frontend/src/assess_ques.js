import { Button, Radio, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState , useRef} from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from "react-router-dom";


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




function AssessQues(props) {

  const params = useParams();
  const assessmentID = params.id;
  
  // const { current: assessmentID } = useRef(params.id);


  const [QuesId, setQuesId ] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [quesLength, setQuesLength] = useState(0);

  const {initialMinute = 0,initialSeconds = 50} = props;
  const [ minutes, setMinutes ] = useState(initialMinute);
  const [seconds, setSeconds ] =  useState(initialSeconds);

  const [value, setValue] = useState();
  const [points, setpoints] = useState(0);

  // useEffect(()=>{
  // let myInterval = setInterval(() => {
  //         if (seconds > 0) {
  //             setSeconds(seconds - 1);
  //         }
  //         if (seconds === 0) {
  //             if (minutes === 0) {
  //                 clearInterval(myInterval)
  //             } else {
  //                 setMinutes(minutes - 1);
  //                 setSeconds(59);
  //             }
  //         } 
  //     }, 1000)
  //     return ()=> {
  //         clearInterval(myInterval);
  //       };
  // });
    
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

    const fetchQuestions = async () => {
      await axios.get("http://localhost:8000/assessments/assessment/".concat(assessmentID).concat("/questions/"))
        .then(res => {
          const ara = res.data;
          // console.log(window.$log = ara);
          // setQuestions((questions) => ara);
          setQuestions(ara);
          // setQuesId(ara[0].id);
          
          // console.log(questions[0].description);
          
          
          // console.log(ara);
          
        })
        .catch(err => {
          console.log(err);
        })
    };

    useEffect(() => {   
      
      fetchQuestions();  
      setQuesLength(questions.length);
      // console.log("Questions");
      console.log(questions);   
      // console.log("Questions 2");
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

   

    const submittedQuestion =  async () => {
      if (value === "option1"){
        // const total_point = {points} + 10;
        
        setpoints(points + 1);
        console.log(points);

        // setQuesId(QuesId + 1);
      }
      // setQuesId(QuesId + 1);
      // console.log(QuesId);
    };
  

    return (
        
        <div className="">
                <Navbar/>
                {/* <h1 id='title'>   Single Question </h1> */}
                  <div >

                
                    <h1 style={{textAlign: "center"}}>Python Assessment Test</h1> 
                  </div>
                  <br/>
                  <div id='qih'>
                    <h3 style={{textAlign: "center"}}>Question </h3>
                  </div>
                  <br/>
                  {questions[0].description}
                 
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
                        
                      <Button type="primary" id='next' onClick={submittedQuestion}  style={{ marginLeft: "auto" }}>Next</Button>
                    </div>
                  </div>
                  <br/>
            </div>
    )
  }



export default AssessQues;

/* <div style={{ display: "flex" }}>
{ minutes === 0 && seconds === 0
      ? loadAnotherQues
      : <h3 id='element3' style={{textAlign: "center"}}> Time Left: {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h3> 
  }
</div> */