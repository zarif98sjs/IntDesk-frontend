import { Button, Input, InputNumber } from 'antd';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import AssessQuesForm from './AssessQuesForm';
import Navbar from './navbar';
import "./AssessNew.css";


function AssessForm(){

   // const authToken = JSON.parse(localStorage.getItem("authToken"));
  // const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));

  const [skill_name, setSkillName] = useState('');
  const [taken_by, setTakenBy] = useState(0);
  const [passed_by, setPassedBy] = useState(0);
  const [roles, setRoles] = useState([]);
<<<<<<< HEAD
  const [categories, setCategories] = useState([]);
=======
  const [subcategories, setSubcategories] = useState([]);
>>>>>>> 65847eab5e6921115d1bb6aa86f8298fa8f61b5d
  const [image, setImage] = useState('');

//   useEffect(() => {
//     console.log("inside use effect : ");
//     setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
//   },[]);

  const handleSkillNameChange = event => {
    setSkillName(event.target.value);
    // console.log(event.target.value);
  };

  const handleImageChange = event => {
    setImage(event.target.value);
    // console.log(event.target.value);
  };

  const takenByChange = event => {
    // console.log(event);
    setTakenBy(event);
    // console.log(event.target.value);
  };

  const passedByChange = event => {
    // console.log(event);
    setPassedBy(event);
    // console.log(event.target.value);
  };

  const handleRolesChange = event => {
    let tagsAra = event.target.value.replace(/ /g,' ');
    tagsAra = tagsAra.split(',');
    // console.log(tagsAra);
    setRoles(tagsAra); 
    // console.log(tagsAra);
  };

<<<<<<< HEAD
  const handleCategoriesChange = event => {
    let tagsAra = event.target.value.replace(/ /g,' ');
    tagsAra = tagsAra.split(',');
    // console.log(tagsAra);
    setCategories(tagsAra); 
=======
  const handleSubcategoriesChange = event => {
    let tagsAra = event.target.value.replace(/ /g,' ');
    tagsAra = tagsAra.split(',');
    // console.log(tagsAra);
    setSubcategories(tagsAra); 
>>>>>>> 65847eab5e6921115d1bb6aa86f8298fa8f61b5d
    // console.log(tagsAra);
  };


//   const submit = event => {
//     setText(event);
//     // console.log(event);
//   };

  // arrow function to prevent the page from refreshing
  const submitFunc = async () => {
    // console.log(title);
    // console.log(tags);
    // console.log(text);
<<<<<<< HEAD
    if( skill_name === '' ){
      console.log("no skill name");
      return;
    }
=======

>>>>>>> 65847eab5e6921115d1bb6aa86f8298fa8f61b5d
    // POST
    let postData = {
      'skill_name': skill_name,
      'taken_by' : taken_by,
      'passed_by' : passed_by,
      'image_link' : image,
      'roles': roles,
<<<<<<< HEAD
      'categories' : categories,
      // 'description': text,
    };
    console.log(postData);
=======
      'subcategories' : subcategories,
      // 'description': text,
    };
    // console.log(postData);
>>>>>>> 65847eab5e6921115d1bb6aa86f8298fa8f61b5d
    
    await axios.post('http://localhost:8000/assessments/assessment/', postData ,{headers: {
        // 'Authorization': 'Token '.concat(authToken.token),
        'Content-Type' : 'application/json'
      }})
      .then(res => {
        console.log(window.$log = res.data);
  
<<<<<<< HEAD
        window.location.href = "/assessments/".concat( res.data.id ).concat( "/assess_ques_new" );
=======
        window.location.href = "/assessments/".concat( res.data.id ).concat( "/assess_newques" );
>>>>>>> 65847eab5e6921115d1bb6aa86f8298fa8f61b5d

      })
      .catch(err => {
        console.log(err);
      }) 
      
    
  }

    
    return (

          <div className="">
              <div>
              <Navbar />
                <h1 id='title'>New Assessment</h1>
           
                  <Input id='title' onChange={handleSkillNameChange} placeholder="Enter skill name"/>
<<<<<<< HEAD
                  <div id='input_num'>Taken By : <InputNumber defaultValue={0} onChange={takenByChange}  /></div><br/>
                  <div id='input_num'>Passed By : <InputNumber  defaultValue={0} onChange={passedByChange}  /></div><br/>
                  <Input id='title' onChange={handleImageChange} placeholder="Enter image link"/>
                  <Input id='tag_ara' onChange={handleRolesChange} placeholder="Roles (use comma separated values)" />
                  <Input id='tag_ara' onChange={handleCategoriesChange} placeholder="Categories (use comma separated values)" />
=======
                  Taken By : <InputNumber defaultValue={0} onChange={takenByChange}  /><br/>
                  Passed By : <InputNumber  defaultValue={0} onChange={passedByChange}  /><br/>
                  <Input id='title' onChange={handleImageChange} placeholder="Enter image link"/>
                  <Input id='tag_ara' onChange={handleRolesChange} placeholder="Roles (use comma separated values)" />
                  <Input id='tag_ara' onChange={handleSubcategoriesChange} placeholder="Subcategories (use comma separated values)" />
>>>>>>> 65847eab5e6921115d1bb6aa86f8298fa8f61b5d
                

                  <Button type="primary" id='button_submit' onClick={submitFunc} >Create Assessment</Button>
                </div>
    
            </div>
          );
  }



export default AssessForm;