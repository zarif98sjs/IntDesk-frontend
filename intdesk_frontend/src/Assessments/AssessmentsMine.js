import { ProjectFilled } from "@ant-design/icons";
import { Avatar, Badge, Empty, Input, List, Select, Space } from "antd";
import axios from "axios";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import "./assess.css";

const { Option } = Select;
const { Search } = Input;

function AssessmentsMine() {
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));

  const [assessments, setAssessments] = useState([]);
  const [takenTimes, setTakenTimes] = useState([]);
  const [passedAssess, setPassedAssess] = useState([]);
  const [recommendedAssess, setRecommendedAssess] = useState([]);
  const [tempRecommendedAssess, setTempRecommendedAssess] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [searchRoleValue, setSearchRoleValue] = useState([]);
  const [roles, setRoles] = useState([]);
  const [recommendRoles, setRecommendRoles] = useState([]);


  const [assessmentsTemp, setAssessmentsTemp] = useState([]);
  const [takenTimesTemp, setTakenTimesTemp] = useState([]);

  const children: React.ReactNode[] = [];


  // Extracting this method made it accessible for context/prop-drilling
  const fetchAssessments = async () => {
    await axios.get("https://intdesk.herokuapp.com/assessments/user_taken_assessments/", {
      headers: {
        'Authorization': 'Token '.concat(authToken.token),
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        // console.log(window.$log = res.data);
        const ara = res.data;
        console.log(window.$log = ara);
        console.log(ara.assessment);
        // setAssessments(ara);
        // setAssessmentsTemp(ara);
        console.log("length");
        console.log(ara.length);
        console.log("length reading done");

        let tempRoles = [];
        let tempAssessments = [];
        let tempPassed = [];
        let tempTakenTime = [];

        // for loop to get the user name
        for (let i = 0; i < ara.length; i += 1) {
          // loop through tags if tags not null
          //   console.log(ara[i].assessment.roles);
          console.log(ara[i].passed);
          if (ara[i].passed === true) {
            tempPassed.push(ara[i].assessment);

          }
          else {
            tempAssessments.push(ara[i].assessment);
            console.log(ara[i].taken_time.substring(0, 10));
            tempTakenTime.push(ara[i].taken_time.substring(0, 10));
            if (ara[i].assessment.roles !== null) {
              for (let j = 0; j < ara[i].assessment.roles.length; j += 1) {
                // if tag not in tempTags
                if (!tempRoles.includes(ara[i].assessment.roles[j].name)) {
                  tempRoles.push(ara[i].assessment.roles[j].name);
                  // children.push(<Option key={ara[i].tags[j]}>{ara[i].tags[j]}</Option>);
                }
              }
            }

          }

        }

        setAssessments(tempAssessments);
        setAssessmentsTemp(tempAssessments);
        setPassedAssess(tempPassed);
        setTakenTimes(tempTakenTime);
        setTakenTimesTemp(tempTakenTime);
        // console.log(tempRoles);
        setRoles(tempRoles);

      })
      .catch(err => {
        console.log(err);
      })
  };

  // Extracting this method made it accessible for context/prop-drilling
  const fetchRecommendations = async () => {
    await axios.get("https://intdesk.herokuapp.com/assessments/assessment/get_recommended/", {
      headers: {
        'Authorization': 'Token '.concat(authToken.token),
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        // console.log(window.$log = res.data);
        const ara = res.data;
        console.log("Recommended")
        console.log(window.$log = ara);
        setRecommendedAssess(ara);
        setTempRecommendedAssess(ara);

        let tempRoles = [];
        

        // for loop to get the user name
        for (let i = 0; i < ara.length; i+=1) {
          // loop through tags if tags not null
        //   console.log(ara[i].assessment.roles);

            if (ara[i].roles !== null) {
                for (let j = 0; j < ara[i].roles.length; j+=1) {
                // if tag not in tempTags
                if (!tempRoles.includes(ara[i].roles[j].name)) {
                    tempRoles.push(ara[i].roles[j].name);
                    // children.push(<Option key={ara[i].tags[j]}>{ara[i].tags[j]}</Option>);
                } 
              }
            }
         }
        //  console.log("tempRoles");
        //  console.log(tempRoles);
         setRecommendRoles(tempRoles);


      })
      .catch(err => {
        console.log(err);
      })
  };

  function commaSeperate(obj, separator) {
    let arr = [];
    // var i; // HERE is where you move the 'var' to the top of the function
    for (let i = 0; i < obj.length; i += 1) {
      // console.log(obj[i].name);
      arr.push(obj[i].name);
    }
    let string = "Roles :".concat(arr.join(separator || ", "));
    if (obj.length === 0) {
      string = "";
    }
    return string;
  }


  useEffect(() => {
    fetchAssessments();
    fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onChange = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    setSearchValue(value);
    let tempAssessmentss = [];
    let tempTakenTime = [];

    for (let i = 0; i < assessments.length; i += 1) {

      // convert to lower case and check substring match
      if (assessments[i].skill_name.toLowerCase().includes(value.toLowerCase())) {
        console.log(assessments[i]);
        tempAssessmentss.push(assessments[i]);
        tempTakenTime.push(takenTimes[i]);
      }
    }

    setAssessmentsTemp(tempAssessmentss);
    setTakenTimesTemp(tempTakenTime);

    tempAssessmentss = [];
    for (let i = 0; i < recommendedAssess.length; i += 1) {
      // if tags not null
      if (recommendedAssess[i].skill_name.toLowerCase().includes(value.toLowerCase())) {

        tempAssessmentss.push(recommendedAssess[i]);
      }
    }
    console.log("tempAssessments : ", tempAssessmentss);
    setTempRecommendedAssess(tempAssessmentss);
  }

  // loop through tags
  for (let i = 0; i < roles.length; i += 1) {
    children.push(<Option key={roles[i]}>{roles[i]}</Option>);
  }
  for (let i = 0; i < recommendRoles.length; i += 1) {
    children.push(<Option key={recommendRoles[i]}>{recommendRoles[i]}</Option>);
  }

  const searchRoles = (value: string[]) => {
    console.log(`selected ${value}`);
    setSearchRoleValue(value);

    let tempAssessmentss = [];
    let tempTakenTime = [];
    for (let i = 0; i < assessments.length; i += 1) {
      // if tags not null
      if (assessments[i].roles !== null) {
        // loop through tags
        for (let j = 0; j < assessments[i].roles.length; j += 1) {
          // if tag in value and already not present
          if (value.includes(assessments[i].roles[j].name) && !tempAssessmentss.includes(assessments[i])) {
            tempAssessmentss.push(assessments[i]);
            tempTakenTime.push(takenTimes[i]);
          }
        }
      }
    }

    console.log("tempAssessments : ", tempAssessmentss);
    setAssessmentsTemp(tempAssessmentss);
    setTakenTimesTemp(tempTakenTime);

    tempAssessmentss = [];
    for (let i = 0; i < recommendedAssess.length; i += 1) {
      // if tags not null
      if (recommendedAssess[i].roles !== null) {
        // loop through tags
        for (let j = 0; j < recommendedAssess[i].roles.length; j += 1) {
          // if tag in value and already not present
          if (value.includes(recommendedAssess[i].roles[j].name) && !tempAssessmentss.includes(recommendedAssess[i])) {
            tempAssessmentss.push(recommendedAssess[i]);
          }
        }
      }
    }

    console.log("tempAssessments : ", tempAssessmentss);
    setTempRecommendedAssess(tempAssessmentss);
  };

  function countDiff(time) {
    let given = Moment(time, "YYYY-MM-DD");
    let current = Moment().startOf('day');

    // Difference in number of days
    return Moment.duration(current.diff(given)).asDays();
  }

  function countDays(time) {
    let difference = countDiff(time);
    if (difference > 30) {
      return "Retake the assessment"
    }
    difference = 30 - difference;
    return difference.toString().concat(" more days before you can retake the assessment")


  }

  function validLink(assessID, time) {
    let difference = countDiff(time);
    if (difference < 30) {
      return "";
    }
    return "/assessments/".concat(assessID);
  }

  const element = (
    <div style={{ paddingLeft: '5%',paddingRight:'5%' }}>
      {searchValue === "" && searchRoleValue.length === 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={assessments}
          renderItem={(item, index) => (
            <List.Item>

              <List.Item.Meta
                // avatar={<Avatar src={item.image_link} />}
                avatar={<Avatar src={<ProjectFilled style={{ fontSize: "50px", color: "#08c" }} /> }/> }
                title={<a href={validLink(item.ID, takenTimes[index])}>{item.skill_name}</a>}
                description={<p>{countDays(takenTimes[index])}<br />
                  Last taken on {Moment(takenTimes[index]).format("DD MMM,YYYY")}<br /></p>}
              />
            </List.Item>
          )}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={assessmentsTemp}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                // avatar={<Avatar src={item.image_link} />}
                avatar={<Avatar src={<ProjectFilled style={{ fontSize: "50px", color: "#08c" }} /> }/> }
                title={<a href={"/assessments/".concat(item.id)}>{item.skill_name}</a>}
                description={<p>{countDays(takenTimesTemp[index])}<br />
                  Last taken on {Moment(takenTimesTemp[index]).format("DD MMM,YYYY")}<br /></p>}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  )

  const recommendedElement = (
    <div style={{ paddingLeft: '5%',paddingRight:'5%' }}>
      {searchValue === "" && searchRoleValue.length === 0 ? (
        <List
        itemLayout="horizontal"
        dataSource={recommendedAssess}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              // avatar={<Avatar src={item.image_link} />}
              avatar={<Avatar src={<ProjectFilled style={{ fontSize: "50px", color: "#08c" }} /> }/> }
              title={<a href={"/assessments/".concat(item.id)}>{item.skill_name}</a>}
              description={commaSeperate(item.roles, ", ")}
            />
          </List.Item>
        )}
      />
      ) : (
        <List
        itemLayout="horizontal"
        dataSource={tempRecommendedAssess}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              // avatar={<Avatar src={item.image_link} />}
              avatar={<Avatar src={<ProjectFilled style={{ fontSize: "50px", color: "#08c" }} /> }/> }
              title={<a href={"/assessments/".concat(item.id)}>{item.skill_name}</a>}
              description={commaSeperate(item.roles, ", ")}
            />
          </List.Item>
        )}
      />

      )}
    </div>


  )

  const showAssessments = (
    <div>
      <h1 id='title'> My Assessments </h1>

      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '18.5%', float: 'right', margin: '0px 10% 0px 0px' }}
          placeholder="Select for Roles"
          onChange={searchRoles}
        >
          {children}
        </Select>
      </Space>

      <br />

      <Space id='space_above' size='large'>

        <Search
          id='search_button'
          placeholder="Search Assessments"
          allowClear
          size="large"
          onChange={onChange}
          enterButton
        />
      </Space>



      <br />
      <br />
      <br />
      <h1 id='title'>Passed Assessments</h1>
      { ( passedAssess.length === 0 ) ? 
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      :<br/>
      }
      <div style={{ paddingLeft: '5%',paddingRight:'5%' }} >
        {passedAssess.map((item, key) => (
          <Badge >
            {/* <Avatar src={item.image_link} /><br /> */}
            <Avatar src={<ProjectFilled style={{ fontSize: "50px", color: "#08c" }} /> }/> 
            <h4>{" "}{item.skill_name}</h4>
          </Badge>
        ))}
      </div>
      
      <h1 id='title'>Recommended for you</h1>
      {recommendedElement}
      <br />
      <br /><br />
      <h1 id='title'>Taken Assessments</h1>
      {element}
      <br /><br />
      
    </div>
  )


  return (


    <div>
      <Navbar />
      {isLoggedIn ? showAssessments : <h1 id='title'><Link to="/login">Log In </Link></h1>}
    </div>
  )
}



export default AssessmentsMine;



