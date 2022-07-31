import { Button, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import Markdown from "react-textarea-markdown";
import Navbar from "./navbar";
import "./problemNew.css";

const { TextArea } = Input;

function ProblemNew() {

  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));

  
  const [problem, setProblem] = useState({
    title: "",
    timeLimit: 1,
    memoryLimit: 256,
    difficulty: "Easy",
    description: ""
  });



  const [tags, setTags] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  },[]);

  const handleTextChange = event => {
    const {name, value} = event.target;
    setProblem(oldProblem => (
        {
            ...oldProblem,
            [name]: value
        }
    ))
    console.log(problem);    
    
  }
  const handleMarkdownChange = event => {
    setProblem(oldProblem => (
        {
            ...oldProblem,
            description: event
        }
        
    )

    

    )
  };
  
  
  // arrow function to prevent the page from refreshing
  const submitFunc = async () => {
    
    // POST
    let postData = {
      'name': problem.title,
      'description': problem.description,
      'time_limit': problem.timeLimit,
      'memory_limit': problem.memoryLimit,
      'difficulty': problem.difficulty
    };

    console.log(postData);
    
    await axios.post('http://localhost:8000/problems/problem/', postData ,{headers: {
        'Authorization': 'Token '.concat(authToken.token),
        'Content-Type' : 'application/json'
      }})
      .then(res => {
        console.log(window.$log = res.data);
      })
      .catch(err => {
        console.log(err);
      })

      // navigate to the discussion page
      window.location.href = "/problems";
  }

    
    return (

          <div className="">
            {isLoggedIn ? ( 
              <div>
              <Navbar />
                <h1 id='title'>Add New Problem</h1>
                <div className="input-row">

                  <label htmlFor='title'>Problem Name</label>
                    <Input id='title' name='title' onChange={handleTextChange} placeholder="Enter problem name..." />
                    <label htmlFor='difficulty'>Difficulty</label>
                  <select id='difficulty' name='difficulty' onChange={handleTextChange} placeholder="Enter difficulty...">
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    
                    </select>
                
                    </div>
                <div className="input-row">
                  <label htmlFor='memoryLimit'>Memory Limit (MB)</label>
                  <Input id='memoryLimit' name='memoryLimit' onChange={handleTextChange} type="number" min="256" placeholder="Enter memory limit..."/>
                  <label htmlFor='timeLimit'>Time Limit (s)</label>
                  <Input id='timeLimit' name='timeLimit' onChange={handleTextChange} type="number" min="0.0" step="0.01" placeholder="Enter time limit..."/>
                
                </div>
                  <Markdown id='description' name='description' callback={handleMarkdownChange} textarea={true} customWidth={[50,50]}/>
                  <Button type="primary" id='button_submit' onClick={submitFunc} >Create Problem</Button>
                </div>

              ) : (
                <div>
                  <Navigate to="/login" />
                </div>
              )}
    
            </div>
          );
  }
  
export default ProblemNew;
