

import { Avatar, Badge, Input, List, Select, Space } from 'antd';
import axios from "axios";
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './assess.css';


const { Option } = Select;
const { Search } = Input;




function AssessmentsMine() {
    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));
   
    const [assessments, setAssessments] = useState([]);
    const [takenTimes, setTakenTimes] = useState([]);
    const [passedAssess, setPassedAssess] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [searchRoleValue, setSearchRoleValue] = useState([]);
    const [roles, setRoles] = useState([]);
    

    const [assessmentsTemp, setAssessmentsTemp] = useState([]);
    const [takenTimesTemp, setTakenTimesTemp] = useState([]);

    const children: React.ReactNode[] = [];


    // Extracting this method made it accessible for context/prop-drilling
    const fetchAssessments = async () => {
        await axios.get("http://localhost:8000/assessments/user_taken_assessments/",{headers :{
            'Authorization': 'Token '.concat(authToken.token),
            'Content-Type' : 'application/json'
          }})
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
            for (let i = 0; i < ara.length; i+=1) {
              // loop through tags if tags not null
            //   console.log(ara[i].assessment.roles);
              console.log(ara[i].passed);
              if(ara[i].passed === true){
                tempPassed.push(ara[i].assessment);
                
              }
              else{
                tempAssessments.push(ara[i].assessment);
                console.log(ara[i].taken_time.substring(0, 10));
                tempTakenTime.push( ara[i].taken_time.substring(0, 10) );
                if (ara[i].assessment.roles !== null) {
                    for (let j = 0; j < ara[i].assessment.roles.length; j+=1) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    const onChange= (e) => {
      console.log(e.target.value);
      let value = e.target.value;
      setSearchValue(value);
      let tempAssessmentss = [];
      let tempTakenTime = [];

      for(let i = 0; i < assessments.length; i+=1) {

        // convert to lower case and check substring match
        if (assessments[i].skill_name.toLowerCase().includes(value.toLowerCase())) {
          console.log(assessments[i]);
          tempAssessmentss.push(assessments[i]);
          tempTakenTime.push(takenTimes[i]);
        }
      }

      setAssessmentsTemp(tempAssessmentss);
      setTakenTimesTemp(tempTakenTime);
    }  
    
    // loop through tags
    for (let i = 0; i < roles.length; i+=1) {
      children.push(<Option key={roles[i]}>{roles[i]}</Option>);
    }

    const searchRoles = (value: string[]) => {
      console.log(`selected ${value}`);
      setSearchRoleValue(value);

      let tempAssessmentss = [];
      let tempTakenTime = [];
      for(let i = 0; i < assessments.length; i+=1) {
        // if tags not null
        if (assessments[i].roles !== null) {
          // loop through tags
          for (let j = 0; j < assessments[i].roles.length; j+=1) {
            // if tag in value and already not present
            if (value.includes(assessments[i].roles[j].name) && !tempAssessmentss.includes(assessments[i])) {
              tempAssessmentss.push(assessments[i]);
              tempTakenTime.push(takenTimes[i]);
            }
          }
        }
      }

      console.log("tempAssessments : ",tempAssessmentss);
      setAssessmentsTemp(tempAssessmentss);
      setTakenTimesTemp(tempTakenTime);
    };
    
    function countDiff(time){
        let given = Moment(time, "YYYY-MM-DD");
        let current = Moment().startOf('day');

        // Difference in number of days
        return Moment.duration(current.diff(given)).asDays();
    }

    function countDays(time) {
        let difference = countDiff(time);
        if( difference > 30 ){
            return "Retake the assessment"
        }
        difference = 30 - difference ;
        return difference.toString().concat(" more days before you can retake the assessment")
           
        
    }

    function validLink(assessID, time){
        let difference = countDiff(time);
        if( difference < 30 ){
            return "";
        }
        return "/assessments/".concat( assessID );
    }
     
    const element =  (
      <div>
        {searchValue === "" && searchRoleValue.length === 0 ? (
          <List
          itemLayout="horizontal"
          dataSource={assessments}
          renderItem={(item, index) => (
            <List.Item>
                
              <List.Item.Meta
                avatar={<Avatar src={item.image_link} />}
                title={<a href={ validLink( item.ID, takenTimes[index] ) }>{item.skill_name}</a>}
                description= {<p>{countDays(takenTimes[index])}<br/>
                Last taken on {Moment(takenTimes[index]).format("DD MMM,YYYY")}<br/></p>}
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
                  avatar={<Avatar src={item.image_link} />}
                  title={<a href={"/assessments/".concat( item.id )}>{item.skill_name}</a>}
                  description= {<p>{countDays(takenTimesTemp[index])}<br/>
                    Last taken on {Moment(takenTimesTemp[index]).format("DD MMM,YYYY")}<br/></p>}
                />
              </List.Item>
            )}
          />
        )}
      </div>
    )



    return (
        
        <div>
            <Navbar/>
            <h1 id='title'> My Assessments </h1>

                <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width:'18.5%', float: 'right', margin: '0px 10% 0px 0px'}}
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

                
                
                <br/>
                <br/>
                <br/>
            <h1 id = 'title'>Passed Assessments</h1>
            <div style={{margin:'20px'}} >
                {passedAssess.map((item, key) => (
                    <Badge >
                        <Avatar src={item.image_link} /><br/>
                        <h4>{item.skill_name}</h4>
                    </Badge>
                ))}
            </div>
            
            <br/><br/>
            <h1 id = 'title'>Taken Assessments</h1>
              {element}   
            <br/><br/>
            <h1 id = 'title'>Recommendations</h1>       
        </div>
    )
  }



export default AssessmentsMine;


                       
