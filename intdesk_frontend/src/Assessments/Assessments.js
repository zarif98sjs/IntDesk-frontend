import { CheckCircleTwoTone  } from '@ant-design/icons';
import { Card, Button, Input, Select, Space, Avatar, List } from 'antd';
import { Navigate, Link } from 'react-router-dom';
import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "moment";
import Navbar from "../Navbar/Navbar";
import "./assess.css";

const { Option } = Select;
const { Search } = Input;

function Assessments() {

  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));

  const [assessments, setAssessments] = useState([]);
  const [recommendedAssess, setRecommendedAssess] = useState([]);
  const [tempRecommendedAssess, setTempRecommendedAssess] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [searchRoleValue, setSearchRoleValue] = useState([]);
  const [roles, setRoles] = useState([]);

  const [status, setStatus] = useState([]);


  const [assessmentsTemp, setAssessmentsTemp] = useState([]);

  const children: React.ReactNode[] = [];

  // Extracting this method made it accessible for context/prop-drilling
  const fetchAllAssessments = () => {
    axios.get("http://localhost:8000/assessments/assessment/")
      .then(res => {
        console.log(window.$log = res.data);
        const ara = res.data;
        console.log(window.$log = ara);
        setAssessments(ara);
        setAssessmentsTemp(ara);

        let tempRoles = [];

        // for loop to get the user name
        for (let i = 0; i < ara.length; i += 1) {
          // loop through tags if tags not null
          if (ara[i].roles !== null) {
            for (let j = 0; j < ara[i].roles.length; j += 1) {
              // if tag not in tempTags
              if (!tempRoles.includes(ara[i].roles[j].name)) {
                tempRoles.push(ara[i].roles[j].name);
                // children.push(<Option key={ara[i].tags[j]}>{ara[i].tags[j]}</Option>);
              }
            }
          }
        }
        console.log(tempRoles);
        setRoles(tempRoles);

      })
      .catch(err => {
        console.log(err);
      })
  };

  // Extracting this method made it accessible for context/prop-drilling
  const fetchAssessments = () => {
    axios.get("http://localhost:8000/assessments/assessment/get_assessment/", {
      headers: {
        'Authorization': 'Token '.concat(authToken.token),
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(window.$log = res.data);
        const ara = res.data.assess;
        const status = res.data.status;
        // console.log(window.$log = ara);
        // console.log(ara.assess)
        // console.log(ara.status)
        setAssessments(ara);
        setAssessmentsTemp(ara);
        setStatus(status);

        let tempRoles = [];

        // for loop to get the user name
        for (let i = 0; i < ara.length; i += 1) {
          // loop through tags if tags not null
          if (ara[i].roles !== null) {
            for (let j = 0; j < ara[i].roles.length; j += 1) {
              // if tag not in tempTags
              if (!tempRoles.includes(ara[i].roles[j].name)) {
                tempRoles.push(ara[i].roles[j].name);
                // children.push(<Option key={ara[i].tags[j]}>{ara[i].tags[j]}</Option>);
              }
            }
          }
        }
        console.log(tempRoles);
        setRoles(tempRoles);

      })
      .catch(err => {
        console.log(err);
      })
  };

  const fetchRecommendations = async () => {
    await axios.get("http://localhost:8000/assessments/assessment/get_recommended/", {
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
        if(isLoggedIn){
          fetchAssessments();
        }  
        else{
          fetchAllAssessments();
        }
        fetchRecommendations();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


  const onChange = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    setSearchValue(value);
    let tempAssessmentss = [];

    for (let i = 0; i < assessments.length; i += 1) {

      // convert to lower case and check substring match
      if (assessments[i].skill_name.toLowerCase().includes(value.toLowerCase())) {
        console.log(assessments[i]);
        tempAssessmentss.push(assessments[i]);
      }
    }

      setAssessmentsTemp(tempAssessmentss);
    }  
    
    // loop through tags
    for (let i = 0; i < roles.length; i+=1) {
      children.push(<Option key={roles[i]}>{roles[i]}</Option>);
    }

  const searchRoles = (value: string[]) => {
    console.log(`selected ${value}`);
    setSearchRoleValue(value);

      let tempAssessmentss = [];
      for(let i = 0; i < assessments.length; i+=1) {
        // if tags not null
        if (assessments[i].roles !== null) {
          // loop through tags
          for (let j = 0; j < assessments[i].roles.length; j+=1) {
            // if tag in value and already not present
            if (value.includes(assessments[i].roles[j].name) && !tempAssessmentss.includes(assessments[i])) {
              tempAssessmentss.push(assessments[i]);
            }
          }
        }
      }

      console.log("tempAssessments : ",tempAssessmentss);
      setAssessmentsTemp(tempAssessmentss);
    };

    function showStatus(index, roles) {
      
        return (
          <div>
           { ( ( status[index] !== false ) && ( status[index] !== true ) ) ? <p>Last taken on {Moment(status[index]).format("DD MMM,YYYY")} <br/>{commaSeperate(roles, ", ")}</p> : <p>{commaSeperate(roles, ", ")}</p>}
          </div>
        )
  
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
                title={
                <div>
                <a href={"/assessments/".concat( item.id )}>{item.skill_name}</a>
                { (isLoggedIn && status[index] === true) ? <span style={{paddingLeft:'10px'}}><CheckCircleTwoTone /> </span>: <br/>}
                </div>
              }
                description= {
                <div>
                  
                  {isLoggedIn  ? ( <p>{showStatus(index, item.roles)}</p> ): ( <p>{commaSeperate(item.roles, ", ")}</p> ) }
                </div>
              } 
              />
            </List.Item>
          )}
        />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={assessmentsTemp}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.image_link} />}
                  title={<a href={"/assessments/".concat( item.id )}>{item.skill_name}</a>}
                  description= {commaSeperate(item.roles, ", ")} 
                />
              </List.Item>
            )}
          />
        )}
      </div>
    )

    const recommendedElement = (
      <div>
        {searchValue === "" && searchRoleValue.length === 0 ? (
          <List
          itemLayout="horizontal"
          dataSource={recommendedAssess}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.image_link} />}
                title={<a href={"/assessments/".concat( item.id )}>{item.skill_name}</a>}
                description= {commaSeperate(item.roles, ", ")} 
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
                  avatar={<Avatar src={item.image_link} />}
                  title={<a href={"/assessments/".concat( item.id )}>{item.skill_name}</a>}
                  description= {commaSeperate(item.roles, ", ")} 
                />
              </List.Item>
            )}
          />
        )}
      </div>

  
    )



  return (

    <div>
      <Navbar />
      
        <h1 id='title'> All Assessments </h1>

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
      <div style={{
        paddingLeft:'10%',
        paddingRight:'10%'
      }}>
        <h1>Recommended For You</h1>
        {recommendedElement}
        <br /><br /><br />
        <h1 >All Assessments</h1>
        {element}
      </div>



    </div>
  )
}



export default Assessments;

/* cover={<img alt="example" className = 'photo' src={flashcard.image} />} */
/*
<Link to={`${assess_ind.id}`}>
            <Card className='site-card-wrapper' hoverable style={{ width: 240, height: 300}} cover={<img alt="example" className = 'photo' src={assess_ind.image_link} />} >
                <h2 style={{textAlign: "center"}}>{assess_ind.skill_name}</h2>
                
                <h4>{commaSeperate(assess_ind.roles, ", ")}</h4>
                <h4>{assess_ind.taken_by} took this</h4>
                <Button  type="link" htmlType="submit">Take Assessment Quiz </Button>
            </Card>
            */
                       
