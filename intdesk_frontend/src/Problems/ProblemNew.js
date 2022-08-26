import { Alert, Menu } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import NewProblemBody from "./NewProblemBody";
import "./problemNew.css";


function ProblemNew() {

  

  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));
  const [page, setPage] = useState("statement");
  const [mode, setMode] = useState("POST");
  const params = useParams();


  const [id, setId] = useState(params.id);

  
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

  const [error, setError] = useState({isError: false, errorText: []})

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

    if(problem.title === ''){
      console.log('title is required')
      setError({isError: true, errorText: "Problem title is required"})
      return 
    }
    if(problem.description === ''){

      console.log('description is required')
      setError({isError: true, errorText: "Problem description is required"})
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
    
    if (mode === 'POST'){
      console.log(id)
      console.log(mode)
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
             // navigate to the problems page
      //  window.location.href = "/problems";
  
      })
      .catch(err => {
        console.log(err);
        
      })
    }
    else 
    {
      await axios.put('http://localhost:8000/problems/problem/'.concat(id).concat('/'), postData ,{headers: {
        'Authorization': 'Token '.concat(authToken.token),
        'Content-Type' : 'application/json'
      }})
      .then(res => {
        console.log(window.$log = res.data);
        console.log('id now', id);
        console.log('Input outputs now:')

        console.log(problem.inputOutputs);
        
        submitIO(id);
        submitRoles(id);
        submitCompanies(id);
        submitSubcategories(id);
        // // navigate to the problems page
        // window.location.href = `/problems/problem/${id}`;

        
      })
      .catch(err => {
        console.log('problem in updating');
        console.log(err);
        
      })

      

    }

      

      
     
  }

  useEffect(() => {
      setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")));
      if(id) {
          const fetchProblem = async () => {
            await axios.get("http://localhost:8000/problems/problem/".concat(id))
            .then(res => {

              console.log(res.data);

              let prevRoles = [];
              for(let i=0;i<res.data.roles.length;i+=1){
                prevRoles.push({'role': res.data.roles[i].name});
              }

              let prevCompanies = [];
              for(let i=0;i<res.data.companies.length;i+=1){
                prevCompanies.push({'company': res.data.companies[i].company});
              }

              let prevSubcategories = [];
              for(let i=0;i<res.data.subcategories.length;i+=1){
                prevSubcategories.push({'category': res.data.subcategories[i].category, 'subcategory': res.data.subcategories[i].name});
              }
              
              setProblem(oldProblem => (
                {
                  ...oldProblem,
                  title: res.data.name,
                  description: res.data.description,
                  difficulty: res.data.difficulty,
                  timeLimit: res.data.time_limit,
                  memoryLimit: res.data.memory_limit,
                  submissionCount: res.data.submission_count,
                  solveCount: res.data.solve_count,
                  inputOutputs: res.data.input_outputs,
                  roles: prevRoles,
                  companies: prevCompanies,
                  subcategories: prevSubcategories
                }
              ))

              if(res.data.input_outputs.length === 0){
                setProblem(oldProblem => (
                  {
                    ...oldProblem,
                    inputOutputs: [{"input": "", "output": "", "points": 1}],
                    
                  }
                ))
              }
              if(res.data.roles.length === 0){
                setProblem(oldProblem => (
                  {
                    ...oldProblem,
                    roles: [{"role": ""}],
                    
                  }
                ))
              }
              if(res.data.companies.length === 0){
                setProblem(oldProblem => (
                  {
                    ...oldProblem,
                    companies: [{"company": ""}],
                    
                  }
                ))
              }

              if(res.data.subcategories.length === 0){
                setProblem(oldProblem => (
                  {
                    ...oldProblem,
                    subcategories: [{"subcategory": "", "category": ""}],
                    
                  }
                ))
              }

              

             
            })
            .catch(err => {
              console.log(err)
            })
          }
        fetchProblem();
        setMode("PUT");
        
      }
      else {
        setMode("POST");
      }
  }, [id]);

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
            <button className="submit-btn" type="button" onClick={() => handleSubmit()} style={{width: "200px", marginRight: "40px"}}>
              {mode === 'POST' ? "Create Problem" : "Save Problem"}
            </button>
              
        </div>
        {error.isError && 
        <Alert
            message={`Missing required fields: ${error.errorText}`}
            showIcon
            type="error"
            closable
            style={{marginTop: "20px"}}
          />
        }
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