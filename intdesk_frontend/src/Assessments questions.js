import React, { useEffect, useState } from 'react';
import { Card, Button, Radio, Typography, List} from 'antd';
import ReactMarkdown from 'react-markdown';
import { useParams, Navigate, Link } from 'react-router-dom';
import axios from "axios";
import remarkGfm from 'remark-gfm';
import Navbar from "./navbar";
import './assess.css';






function AssessmentsQues(props) {

  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));

  const params = useParams();
  const assessmentID = params.id;
  const [QuesId, setQuesId ] = useState([]); 
  const [question, setQuestion] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [complete, setComplete] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState();
  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const {initialMinute = 0,initialSeconds = 50} = props;
  const [ minutes, setMinutes ] = useState(initialMinute);
  const [seconds, setSeconds ] =  useState(initialSeconds);

  const [countEasy, setCountEasy] = useState(0); 
  const [countMed, setCountMed] = useState(0); 
  const [countHard, setCountHard] = useState(0); 

  const [endAssess, setEndAssess] = useState(false);
  const [pass, setPass] = useState("passed");
  // const [currQues, setCurrQues] = useState();
    // Extracting this method made it accessible for context/prop-drilling
    
    
   

      const onChange = (e) => {
        // console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };

      function getOptions(ques_id) {
        // console.log(ques_id);

        // console.log(questions[QuesId]);
        axios.get("http://localhost:8000/assessments/assessment/".concat(ques_id).concat("/get_ques_options/"))
        .then(res => {
          // console.log(window.$log = res.data);
          const ara = res.data;
          // console.log(window.$log = ara);
          console.log(ara);  
          setOptions(ara);
        })
        .catch(err => {
          console.log(err);
        })
        
       

        // return "hello";
      }

      const fetchQuestions = async () => {

        if(QuesId.length === 15){
          setIsLoaded(false);
          setComplete(true);
          return;
        }

        let postData = {
          'E' : countEasy, 
          'M': countMed,
          'H' : countHard,
          'quesID' : QuesId,
        };
    
        console.log(postData);
            await axios.post("http://localhost:8000/assessments/assessment/".concat(assessmentID).concat("/questions/"), postData ,{headers: {
              // 'Authorization': 'Token '.concat(authToken.token),
              'Content-Type' : 'application/json'
            }})
            .then(res => {
              // console.log(window.$log = res.data);
              const ara = res.data;
              // console.log(window.$log = ara);
              getOptions(ara.id);
              setQuestion(ara);
              setSeconds(ara.time);
              QuesId.push(ara.id);
              setTotalPoints(totalPoints + ara.points);
              // console.log(ara);
              // console.log(ara.difficulty_level);
              if( ara.difficulty_level === "H" ){
                setCountHard(countHard + 1);
              }
              else if(ara.difficulty_level === "M" ){
                setCountMed(countMed + 1);
              }
              else if(ara.difficulty_level === "E"){
                setCountEasy(countEasy + 1);
              }
  
              setIsLoaded(true);
              })
            .catch(err => {
              console.log(err);
            })
        };

      useEffect(() => {   
        // set logged in
        setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
        if( question === undefined ){
          fetchQuestions();
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [assessmentID]);

      useEffect(()=>{
        let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        // clearInterval(myInterval)
                        // setMinutes(minutes - 1);
                        fetchQuestions();
                        setSeconds(question.time);
                    } 
                } 
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };
       });


      const submittedQuestion =  async () => {
        // console.log("Submitted value");
        // console.log(value);
        // console.log(options.values);
        if( value !== undefined ){
          let opt_id = 0;
          // console.log(options);
          for( let i = 0 ; i < options.length ; i+=1){
            // console.log("description of an option");
            // console.log(options.at(i).description);
            if(options.at(i).description === value ){
              // console.log(options.at(i).option_id);
              opt_id = options.at(i).option_id;
              break;
            }
          }
          // console.log(opt_id);

          let postData = {
            'ques_id' : question.id,
            'option_id' : opt_id,
          };
      
          // console.log(postData);
          
          axios.post('http://localhost:8000/assessments/assessment/'.concat(assessmentID).concat('/get_right_answer/'), postData ,{headers: {
              // 'Authorization': 'Token '.concat(authToken.token),
            'Content-Type' : 'application/json'
          }})
          .then(res => {
            console.log(window.$log = res.data);
            if(res.data === true){
              
              setPoints(points + question.points);
            }
          })
          .catch(err => {
            console.log(err);
          })
      
          

        }
        // console.log(question.points);
        console.log("gained points");
        console.log(points);
        fetchQuestions();
        setValue();
      };

      

      function getQuestion(){
        let ques_description = ""
        if(question !== undefined){
          ques_description = question.description;
          // getOptions(question.id);
        }
        // const ques_description = questions[QuesId].description;
        // console.log(ques_description);
        // console.log(ques_description);
        //  console.log(question.description);
        return ques_description;
      }

      function getPassed(){

        if( endAssess === true ){
          return pass; 
        }

        let postData = {
          'points' : points,
          'total_points' : totalPoints,
        };
    
        // console.log(postData);
        
        axios.post('http://localhost:8000/assessments/assessment/'.concat(assessmentID).concat('/assessment_result/'), postData ,{headers: {
          'Authorization': 'Token '.concat(authToken.token),
          'Content-Type' : 'application/json'
        }})
        .then(res => {
          console.log(window.$log = res.data);
          setEndAssess(true);
          
          
        })
        .catch(err => {
          console.log(err);
        })

        return pass;
      }

     

      function showOptions(){
        if( options !== undefined ){
          return (
            <div id='qi'>
          
              <Radio.Group onChange={onChange} value={value} style={{ width: 'auto' }}>
                {options.map((answer, key) => (
                  <div className='col md-4'>
                    <Radio value={answer.description} size='large'> {answer.description}</Radio>
                  </div> 
                  ))}
              </Radio.Group>
              <div style={{ display: "flex" }}>
                  
                <Button type="primary" id='next' onClick={submittedQuestion} style={{ marginLeft: "auto" }}>Next</Button>
              </div>
            </div>
          )
        }
        return <div>NONE</div>;
        
       
        
      }

      
      
    const loadQuestion = (
      <div>
          <div id='qih'>
            <h3 style={{textAlign: "center"}}>Question </h3>
          </div>
          <br/>
          <div style={{ display: "flex" }}>
            <h3 id='element3' style={{textAlign: "center"}}> Time Left: {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h3>   
          </div> 
          <br/> 

        <div id='qi'>
          
          <ReactMarkdown remarkPlugins={[remarkGfm]} >
            {getQuestion()}
          </ReactMarkdown>
        </div>
        <br/>
        {showOptions()}
        
      </div>
    )



    const endAssessment = (
      <div>
        <h1 id= 'title'>{getPassed()} </h1>
        <h2>Total points : {points} / {totalPoints} </h2>
        <Link to = "/assessments" > Go back to Assessments </Link>
        
      </div>
    )
     
    const element =  (
      // console.log(points);
      
      complete ? endAssessment : <div> None </div>  
     
      
    )

    const loadPage = (
      isLoaded ? loadQuestion : element 
    )



    return (
        
        <div>
            <Navbar/>
            <h1 style={{textAlign: "center"}}>Assessment Test</h1> 
            <br/>
            {isLoggedIn ? ( 
              loadPage
            ) : (
              <Link to="/login">Log In to take the assessment quiz </Link>
            )}
             
                  
        </div>
    )
  }



export default AssessmentsQues;


                       
