import { Button, Radio, Result } from 'antd';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import remarkGfm from "remark-gfm";
import Navbar from "../Navbar/Navbar";
import "./assess.css";

function AssessmentsQues(props) {
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );

  const params = useParams();
  const assessmentID = params.id;
  const [QuesId, setQuesId] = useState([]);
  const [question, setQuestion] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [complete, setComplete] = useState(JSON.parse(localStorage.getItem("completeAssess")));
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState();
  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const [wrongQues, setWrongQues] = useState([]);
  const [wrongOptions, setWrongOptions] = useState([]);
  const [wrongVal, setWrongVal] = useState([]);

  const { initialMinute = 0, initialSeconds = 50 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  const [countEasy, setCountEasy] = useState(0);
  const [countMed, setCountMed] = useState(0);
  const [countHard, setCountHard] = useState(0);

  const [endAssess, setEndAssess] = useState(false);
  const [pass, setPass] = useState(false);
  // const [currQues, setCurrQues] = useState();
  // Extracting this method made it accessible for context/prop-drilling

 


  const onChange = (e) => {
    // console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  function getOptions(ques_id) {
    // console.log(ques_id);

    // console.log(questions[QuesId]);
    axios.get("http://intdesk.herokuapp.com/assessments/assessment/".concat(ques_id).concat("/get_ques_options/"))
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

  const fetchQuestions = async () => {
    // console.log("Complete ", complete)
    if (QuesId.length === 15) {
      setIsLoaded(false);
      console.log("QuesId Length : ", QuesId.length);
      setComplete(true);
      JSON.parse(localStorage.setItem("completeAssess", true))
      // window.sessionStorage.setItem("complete", complete);
      return;
    }

    let postData = {
      'E': countEasy,
      'M': countMed,
      'H': countHard,
      'quesID': QuesId,
    };

    console.log(postData);
    await axios.post("http://intdesk.herokuapp.com/assessments/assessment/".concat(assessmentID).concat("/questions/"), postData, {
      headers: {
        // 'Authorization': 'Token '.concat(authToken.token),
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        // console.log(window.$log = res.data);
        const ara = res.data;
        console.log("question got");
        console.log(window.$log = ara);
        getOptions(ara.id);
        setQuestion(ara);
        setSeconds(ara.time);
        QuesId.push(ara.id);
        setTotalPoints(totalPoints + ara.points);
        // console.log(ara);
        // console.log(ara.difficulty_level);
        if (ara.difficulty_level === "H") {
          setCountHard(countHard + 1);
        }
        else if (ara.difficulty_level === "M") {
          setCountMed(countMed + 1);
        }
        else if (ara.difficulty_level === "E") {
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
    console.log("Complete ", complete)
    // console.log("endAssess : ", endAssess)
    if(complete === true && QuesId.length === 0){
      window.location.href = "/assessments";
    }

    else if (complete === true) {
      getPassed();
    }
    else if (question === undefined) {
      fetchQuestions();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentID, complete]);




  const submittedQuestion = async () => {
    // console.log("Submitted value");
    // console.log(value);
    // console.log(options.values);
    // let wrong = 1;
    if (complete === true) {
      return;
    }
    if (value !== undefined) {
      let opt_id = 0;
      // console.log(options);
      for (let i = 0; i < options.length; i += 1) {
        // console.log("description of an option");
        // console.log(options.at(i).description);
        if (options.at(i).description === value) {
          // console.log(options.at(i).option_id);
          opt_id = options.at(i).option_id;
          break;
        }
      }
      // console.log(opt_id);

      let postData = {
        'ques_id': question.id,
        'option_id': opt_id,
      };

      // console.log(postData);

      axios.post('http://intdesk.herokuapp.com/assessments/assessment/'.concat(assessmentID).concat('/get_right_answer/'), postData, {
        headers: {
          // 'Authorization': 'Token '.concat(authToken.token),
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log(window.$log = res.data);
          if (res.data === true) {
            // wrong = 0;
            setPoints(points + question.points);
          }
          else {
            let tempWrongQues = wrongQues;
            let tempWrongOptions = wrongOptions;
            let tempWrongValues = wrongVal;

            tempWrongQues.push(question);
            tempWrongOptions.push(options);
            tempWrongValues.push(value);

            console.log("Wrong Questions");
            console.log(tempWrongQues);
            console.log(tempWrongOptions);
            console.log(tempWrongValues);

            setWrongQues(tempWrongQues);
            setWrongOptions(tempWrongOptions);
            setWrongVal(tempWrongValues);

          }
        })
        .catch(err => {
          console.log(err);
        })

    }
    else {
      let tempWrongQues = wrongQues;
      let tempWrongOptions = wrongOptions;
      let tempWrongValues = wrongVal;

      tempWrongQues.push(question);
      tempWrongOptions.push(options);
      tempWrongValues.push(value);

      console.log("Wrong Questions");
      console.log(tempWrongQues);
      console.log(tempWrongOptions);
      console.log(tempWrongValues);

      setWrongQues(tempWrongQues);
      setWrongOptions(tempWrongOptions);
      setWrongVal(tempWrongValues);



    }



    // console.log(question.points);
    console.log("gained points");
    console.log(points);
    fetchQuestions();
    setValue();
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          // clearInterval(myInterval)
          // setMinutes(minutes - 1);
          submittedQuestion();
          setSeconds(question.time);
        }
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });



  function getQuestion() {
    let ques_description = ""
    if (question !== undefined) {
      ques_description = question.description;
      // getOptions(question.id);
    }
    // const ques_description = questions[QuesId].description;
    // console.log(ques_description);
    // console.log(ques_description);
    //  console.log(question.description);
    return ques_description;
  }





  function showOptions() {
    if (options !== undefined) {
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
    return <div>--</div>;



  }



  const loadQuestion = (
    <div style={{padding:'20px'}}>
      <div id='qih_asses'>
        <h3 style={{ textAlign: "center" }}>Question </h3>
      </div>
      <br />
      <div style={{ display: "flex" }}>
        <h3 id='element3' style={{ textAlign: "center" }}> Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
      </div>
      <br />

      <div id='qi'>

        <ReactMarkdown remarkPlugins={[remarkGfm]} >
          {getQuestion()}
        </ReactMarkdown>
      </div>
      <br />
      {showOptions()}

    </div>
  )

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

  const endAssessment = (
    endAssess ? showResult : <br />
    // endAssess ? <AssessResult  wrongQues={wrongQues} wrongOptions={wrongOptions} wrongVal={wrongVal} points={points} totalPoints={totalPoints} /> : <br />
    // endAssess ? <Navigate to= {"/assessments/".concat(assessmentID).concat("/assess_result")} state={{ wrongQues:{wrongQues}, wrongOptions:{wrongOptions}, wrongVal:{wrongVal}, points:{points}, totalPoints:{totalPoints} }}/> : <br/>
  )

  // const element =  (
  //   // console.log(points);

  //   complete ? endAssessment : <div> None </div>  


  // )

  const loadPage = (
    isLoaded ? loadQuestion : endAssessment
  )



  return (

    <div>
      <Navbar />

      <div style={{
        paddingTop: '2%',
      }}>

        <h1 style={{ textAlign: "center" }}>Assessment Test</h1>
        <br />
        {isLoggedIn ? (
          loadPage
        ) : (
          <Link to="/login">Log In to take the assessment quiz </Link>
        )}


      </div>

    </div>


  )
}



export default AssessmentsQues;



