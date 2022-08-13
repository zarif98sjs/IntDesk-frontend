import axios from 'axios';
import {Menu} from 'antd';
import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../navbar';
import NewProblemBody from "./NewProblemBody"
import "./problemNew.css"


function ProblemNew() {

  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));
  const [page, setPage] = useState("statement");

  const [problem, setProblem] = useState({
    title: "",
    timeLimit: 1,
    memoryLimit: 256,
    difficulty: "Easy",
    description: "",
    submissionCount: 0,
    solveCount: 0,
    inputOutputs: [{"input": "", "output": "", "points": 1}],
    roles: [{"role": ""}],
    companies: [{"company": ""}],
    subcategories: [{"subcategory": "", "category": ""}],
    editorial: "",
    authorSolution: ""
  });

  const changePage = (event) => {
    setPage(event.key);
    console.log('page now', page)
  }
  const submitRoles = async (id) => {

      console.log('submitting roles for id =', id);
      let postData = {
        'roles': problem.roles
      }
      let address = 'http://localhost:8000/problems/problem/'.concat(id).concat('/role/')

      await axios.post(address ,postData,{headers: {
        'Authorization': 'Token '.concat(authToken.token),
        'Content-Type' : 'application/json'
    }})
    .then(res => {
        console.log("success adding roles")
        console.log(window.$log = res.data);
    })
    .catch(err => {
        console.log("error adding roles")
        console.log(err);
    })

  }
  
  const submitCompanies = async (id) => {
    console.log('submitting companies for id = ', id);
    let postData = {
      'companies': problem.companies
    }
    let address = 'http://localhost:8000/problems/problem/'.concat(id).concat('/company/')

    await axios.post(address ,postData,{headers: {
      'Authorization': 'Token '.concat(authToken.token),
      'Content-Type' : 'application/json'
  }})
  .then(res => {
      console.log("success adding companies")
      console.log(window.$log = res.data);
  })
  .catch(err => {
      console.log("error adding companies")
      console.log(err);
  })



  }
  const submitSubcategories = async (id) => {
    console.log('submitting subcategories for id =', id);
    let postData = {
      'subcategories': problem.subcategories
    }
    let address = 'http://localhost:8000/problems/problem/'.concat(id).concat('/subcategory/')

    await axios.post(address ,postData,{headers: {
      'Authorization': 'Token '.concat(authToken.token),
      'Content-Type' : 'application/json'
  }})
  .then(res => {
      console.log("success adding subcategories")
      console.log(window.$log = res.data);
  })
  .catch(err => {
      console.log("error adding subcategories")
      console.log(err);
  })

  }
  const submitIO = async (id) => {
      console.log('submitting input outputs for id =', id);
      let postData = {
        'input_outputs': problem.inputOutputs
      }
      let address = 'http://localhost:8000/problems/problem/'.concat(id).concat('/input_output/')

      await axios.post(address ,postData,{headers: {
        'Authorization': 'Token '.concat(authToken.token),
        'Content-Type' : 'application/json'
    }})
    .then(res => {
        console.log("success adding input_output")
        console.log(window.$log = res.data);
    })
    .catch(err => {
        console.log("error adding input_output")
        console.log(err);
    })

  }
  const handleSubmit = async () => {
    console.log(problem);

    if(problem.title === '' || problem.description === ''){
      console.log('title and description are required')
      return 
    }

    // POST
    let postData = {
      'title': problem.title,
      'description': problem.description,
      'difficulty': problem.difficulty,
      'memory_limit': problem.memoryLimit,
      'time_limit': problem.timeLimit,
      'submission_count': problem.submissionCount,
      'solve_count': problem.solveCount
    };
    
    await axios.post('http://localhost:8000/problems/problem/', postData ,{headers: {
        'Authorization': 'Token '.concat(authToken.token),
        'Content-Type' : 'application/json'
      }})
      .then(res => {
        console.log(window.$log = res.data);
        const id = res.data.id;
        submitIO(id);
        submitRoles(id);
        submitCompanies(id);
        submitSubcategories(id);
      })
      .catch(err => {
        console.log(err);
        
      })

      

      
      // navigate to the problems page
      // window.location.href = "/problems";
  }

  useEffect(() => {
      setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, []);

  return (
    <div className="">
      {isLoggedIn ? (
        <div>
        <Navbar />
        <br />
        <div className='problem--submenu'>
        <Menu mode="horizontal" defaultSelectedKeys={["statement"]}>
          <Menu.Item key="statement" onClick={changePage} padding-left="100px">
            Statement
          </Menu.Item>

          <Menu.Item key="input_output" onClick={changePage} padding-left="100px">
            Input-Output
          </Menu.Item>

          <Menu.Item key="tags" onClick={changePage} padding-left="100px">
            Tags
          </Menu.Item>

          {/* <Menu.Item key="editorial" onClick={changePage} padding-left="100px">
            Editorial
          </Menu.Item> */}
          
          {/* <Menu.Item key="solution" onClick={changePage} padding-left="100px">
            Author Solution
          </Menu.Item> */}
          
          
          
        </Menu>
        </div>
        <div className='problem--forms'>
        <div className="button-row--right">
            <button className="submit-btn" type="button" onClick={() => handleSubmit()} style={{width: "200px"}}>
              Create Problem
            </button>
              
        </div>
        
        <NewProblemBody problem={problem} setProblem={setProblem} page={page}/>
        </div>
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