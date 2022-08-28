import { Button, InputNumber, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-textarea-markdown";
import Navbar from "../Navbar/Navbar";
import "./AssessNew.css";

const { Option } = Select;

function AssessQuesForm() {
  // const authToken = JSON.parse(localStorage.getItem("authToken"));
  // const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));
  const params = useParams();
  const assessmentID = params.id;

  const [Description, setDescription] = useState("");
  const [Difficulty, setDifficulty] = useState("E");
  const [time, setTime] = useState(10);
  // const [Points, setPoints] = useState(0);
  const [Option1, setOption1] = useState("");
  const [Option2, setOption2] = useState("");
  const [Option3, setOption3] = useState("");
  const [Option4, setOption4] = useState("");
  const [RightOption, setRightOption] = useState(1);

  useEffect(() => {
    console.log("inside use effect : ");
    // setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, []);

  const timeChange = (event) => {
    setTime(event);
  };

  // const pointChange = event => {
  //   setPoints(event);
  // };

  const handleTextChange = (event) => {
    // console.log(event);
    setDescription(event);
  };

  const handleOption1Change = (event) => {
    // console.log(event);
    setOption1(event);
  };

  const handleOption2Change = (event) => {
    // console.log(event);
    setOption2(event);
  };

  const handleOption3Change = (event) => {
    // console.log(event);
    setOption3(event);
  };

  const handleOption4Change = (event) => {
    // console.log(event);
    setOption4(event);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event);
    console.log(event);
  };

  const handleRightOptionChange = (event) => {
    setRightOption(event);
    // console.log(event);
  };

  // arrow function to prevent the page from refreshing
  const submitFunc = async () => {
    // POST
    let postData = {
      assessment: assessmentID,
      time: time,
      description: Description,
      difficulty: Difficulty,
      // 'points' : Points,
    };

    console.log(postData);

    // navigate to create questions page
    // window.location.href = "/assessments/".concat(assessmentID).concat("/assess_newques");

    await axios
      .post(
        "http://localhost:8000/assessments/assessment/"
          .concat(assessmentID)
          .concat("/question/"),
        postData,
        {
          headers: {
            // 'Authorization': 'Token '.concat(authToken.token),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log((window.$log = res.data));

        const quesID = res.data.id;

        console.log("QuesID");
        console.log(quesID);

        let Options = [Option1, Option2, Option3, Option4];
        for (let i = 1; i <= 4; i += 1) {
          // console.log(Options[i-1]);
          // console.log(RightOption);
          let correct = false;
          if (i === parseInt(RightOption, 10)) {
            // console.log(i);
            correct = true;
          }
          // if( i === int( RightOption ) ){
          //   console.log("yes");
          // }
          // console.log(type(RightOption));
          let postOptionData = {
            ques: quesID,
            option_description: Options[i - 1],
            correct: correct,
          };

          axios
            .post(
              "http://localhost:8000/assessments/assessment/"
                .concat(assessmentID)
                .concat("/options/"),
              postOptionData,
              {
                headers: {
                  // 'Authorization': 'Token '.concat(authToken.token),
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              console.log((window.$log = res.data));
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.href = "/assessments/"
      .concat(assessmentID)
      .concat("/assess_ques_new");
  };

  const End = async () => {
    // POST
    let postData = {
      assessment: assessmentID,
      time: time,
      description: Description,
      difficulty: Difficulty,
      // 'points' : Points,
    };

    console.log(postData);

    await axios
      .post(
        "http://localhost:8000/assessments/assessment/"
          .concat(assessmentID)
          .concat("/question/"),
        postData,
        {
          headers: {
            // 'Authorization': 'Token '.concat(authToken.token),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log((window.$log = res.data));

        const quesID = res.data.id;

        console.log(quesID);

        let Options = [Option1, Option2, Option3, Option4];
        for (let i = 1; i <= 4; i += 1) {
          // console.log(Options[i-1]);
          // console.log(RightOption);
          let correct = false;
          if (i === parseInt(RightOption, 10)) {
            // console.log(i);
            correct = true;
          }
          // if( i === int( RightOption ) ){
          //   console.log("yes");
          // }
          // console.log(type(RightOption));
          let postOptionData = {
            ques: quesID,
            option_description: Options[i - 1],
            correct: correct,
          };

          axios
            .post(
              "http://localhost:8000/assessments/assessment/"
                .concat(assessmentID)
                .concat("/options/"),
              postOptionData,
              {
                headers: {
                  // 'Authorization': 'Token '.concat(authToken.token),
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              console.log((window.$log = res.data));
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // navigate to create questions page
    window.location.href = "/assessments/";
  };

  return (
    <div className="">
      <div>
        <Navbar />
        <h1 id="title"> Add a Question </h1>
        <div id="input_num">
          <h3>Difficulty level : </h3>
          <Select defaultValue="E" onSelect={handleDifficultyChange}>
            <Option value="E">Easy</Option>
            <Option value="M">Medium</Option>
            <Option value="H">Hard</Option>
          </Select>
        </div>
        <br />
        <div id="input_num">
          <h3>Time : </h3>
          <InputNumber defaultValue={0} onChange={timeChange} />
        </div>
        <br />
        <h2 id="title"> Question Description </h2>
        <div style={{ height: "200px", overflow: "auto" }}>
          <Markdown
            id="text_area"
            callback={handleTextChange}
            textarea={true}
            customWidth={[50, 50]}
          />
        </div>

        <h2 id="title"> Option1 : </h2>
        <div style={{ height: "120px", overflow: "auto" }}>
          <Markdown
            id="text_area"
            callback={handleOption1Change}
            textarea={true}
            customWidth={[50, 50]}
          />
        </div>

        <br />
        <h2 id="title"> Option2 : </h2>
        <div style={{ height: "120px", overflow: "auto" }}>
          <Markdown
            id="text_area"
            callback={handleOption2Change}
            textarea={true}
            customWidth={[50, 50]}
          />
        </div>

        <br />
        <h2 id="title"> Option3 : </h2>
        <div style={{ height: "120px", overflow: "auto" }}>
          <Markdown
            id="text_area"
            callback={handleOption3Change}
            textarea={true}
            customWidth={[50, 50]}
            customHeight={[25, 25]}
          />
        </div>

        <br />
        <h2 id="title"> Option4 : </h2>
        <div style={{ height: "120px", overflow: "auto" }}>
          <Markdown
            id="text_area"
            callback={handleOption4Change}
            textarea={true}
            customWidth={[50, 50]}
          />
        </div>

        <br />
        <div id="input_num">
          <h3>Select the right Option : </h3>
          <Select defaultValue="1" onSelect={handleRightOptionChange}>
            <Option value="1">Option1</Option>
            <Option value="2">Option2</Option>
            <Option value="3">Option3</Option>
            <Option value="4">Option4</Option>
          </Select>
        </div>
        <br />
        <p align="center">
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ margin: "10px 10px 10px 10px", width:'15%' }}
            onClick={submitFunc}
          >
            Add another Question
          </Button>
          <br/>
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ margin: "10px 10px 10px 10px" , width:'15%' }}
            onClick={End}
          >
            End
          </Button>
        </p>
      </div>
    </div>
  );
}

export default AssessQuesForm;
