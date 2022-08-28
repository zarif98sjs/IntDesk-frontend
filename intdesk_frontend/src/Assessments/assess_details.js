import {
  BuildTwoTone,
  CarryOutTwoTone,
  CopyTwoTone, EditOutlined, HourglassTwoTone,
  IdcardTwoTone, PlusOutlined, ProjectFilled
} from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./assessDetails.css";

function AssessDetails() {
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );

  localStorage.setItem("completeAssess", "false");

  const params = useParams();
  const assessmentID = params.id;

  const [assessment, setAssessment] = useState([]);
  const [roles, setRoles] = useState("");
  const [passed, setPassed] = useState(false);
  const [taken, setTaken] = useState(false);
  const [timeDiff, setTimeDiff] = useState(0);

  let isAdmin = false;
  if (JSON.parse(localStorage.getItem("user")) !== null) {
    isAdmin = JSON.parse(localStorage.getItem("user")).is_admin;
  }

  function commaSeperate(obj, separator) {
    console.log(obj);
    let arr = [];
    // var i; // HERE is where you move the 'var' to the top of the function
    for (let i = 0; i < obj.length; i += 1) {
      console.log(obj[i].name);
      arr.push(obj[i].name);
    }
    let string = "Roles :".concat(arr.join(separator || ", "));
    if (obj.length === 0) {
      string = "";
    }
    // return string;
  }

  useEffect(() => {
    const fetchDetails = async () => {
      await axios
        .get(
          "http://localhost:8000/assessments/assessment/"
            .concat(assessmentID)
            .concat("/")
        )
        .then((res) => {
          const ara = res.data;
          console.log((window.$log = ara));
          setAssessment(res.data);

          // console.log(res.data.roles);
          let arr = [];
          for (let i = 0; i < res.data.roles.length; i += 1) {
            // console.log(res.data.roles[i].name);
            arr.push(res.data.roles[i].name);
          }

          let string = "Roles :".concat(arr.join(", "));
          if (res.data.roles.length === 0) {
            string = "";
          }
          console.log(string);
          setRoles(string);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get(
          "http://localhost:8000/assessments/assessment/"
            .concat(assessmentID)
            .concat("/get_user_status/"),
          {
            headers: {
              Authorization: "Token ".concat(authToken.token),
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const ara = res.data;
          console.log((window.$log = ara));
          if (ara === "passed") {
            setPassed(true);
          } else if (ara === "not taken") {
            setTaken(false);
          } else {
            setTaken(true);
            let time = ara.substring(0, 10);
            let given = Moment(time, "YYYY-MM-DD");
            let current = Moment().startOf("day");

            // Difference in number of days
            setTimeDiff(30 - Moment.duration(current.diff(given)).asDays());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // set logged in
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));

    fetchDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentID]);

  const checkTaken = taken ? (
    <h3 id="title">
      {" "}
      {timeDiff} more days before you can retake this assessment{" "}
    </h3>
  ) : (
    <Button type="link" htmlType="submit" href={`${assessmentID}/assess_ques`}>
      Take Assessment Quiz{" "}
    </Button>
  );

  const checkPassed = passed ? (
    <h3 id="title"> You have already passed this assessment </h3>
  ) : (
    checkTaken
  );

  return (
    <div className="">
      <Navbar />
      {/* <h1 id='title'>   Single Question </h1> */}
      <div id="questions">
        <p align="center">
          {/* <h1 id='title'><img src = {assessment.image_link} alt="logo" /> {assessment.skill_name} assessment test</h1>  */}
          <h1>
            <ProjectFilled style={{ fontSize: "50px", color: "#08c" }} />
          </h1>
          <h1 id="title"> {assessment.skill_name} Assessment Test</h1>
          <h3>
            {" "}
            <IdcardTwoTone style={{ fontSize: "18px", color: "#08c" }} />{" "}
            {roles}
          </h3>
          <h3>
            {" "}
            <BuildTwoTone style={{ fontSize: "18px", color: "#08c" }} />{" "}
            {assessment.taken_by} took this
          </h3>
          <h3>
            {" "}
            <CarryOutTwoTone style={{ fontSize: "18px", color: "#08c" }} />{" "}
            {assessment.passed_by} passed this
          </h3>

          <h3>
            {" "}
            <CopyTwoTone style={{ fontSize: "18px", color: "#08c" }} /> Total 15
            questions
          </h3>
          <h3>
            {" "}
            <HourglassTwoTone
              style={{ fontSize: "18px", color: "#08c" }}
            />{" "}
            Individual time for each question
          </h3>

          {isLoggedIn ? (
            checkPassed
          ) : (
            <Link to="/login">Log In to take the assessment quiz </Link>
          )}
        </p>
      </div>
      <div style={{
        paddingTop: "1%",
        width: "70%",
      }}>
        
          {isAdmin && (
          
              <p align="center">
                <Button
                  type="primary"
                  href={"/assessments/"
                    .concat(assessmentID)
                    .concat("/assess_edit")}
                  shape="round"
                  icon={<EditOutlined />}
                  size="large"
                  style={{ float: "right", margin: "0px 10% 0px 0px" }}
                >
                  Edit Assessment
                </Button>
                <Button
                  type="primary"
                  href={"/assessments/"
                    .concat(assessmentID)
                    .concat("/assess_ques_new")}
                  shape="round"
                  icon={<PlusOutlined />}
                  size="large"
                  style={{ float: "right", margin: "0px 2% 0px 0px" }}
                >
                  Add New Questions
                </Button>
              </p>
            
          )}
        
      </div>

      <br />
    </div>
  );
}

export default AssessDetails;
