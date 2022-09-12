import {
    ProjectFilled
} from "@ant-design/icons";

import { Avatar, Input, List, Select } from 'antd';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import './assess.css';


const { Option } = Select;
const { Search } = Input;




function RecommendedAssess() {

  const authToken = JSON.parse(localStorage.getItem("authToken"));

  const [recommendedAssess, setRecommendedAssess] = useState([]);


  const fetchRecommendations = async () => {
    await axios.get("http://intdesk.herokuapp.com/assessments/assessment/get_recommended/", {
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
    fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



 

  const recommendedElement = (
    <div>
     
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
     
    </div>

  )


  return (

    <div>
        {recommendedElement}
    </div>
  )
}



export default RecommendedAssess;

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

