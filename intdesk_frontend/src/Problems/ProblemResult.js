
import { Alert, Menu, Space, Table, Tag } from 'antd';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import spinner from "../images/spinner.gif";
import Navbar from '../Navbar/Navbar';
import "./result.css";


function ProblemResult() {

  

  const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("authToken")));
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));
  
  const location = useLocation();
  const problem = location.state.problem;
  const language = location.state.language;
  const code = location.state.code;

  const [loading, setLoading] = useState(true);

  const [results, setResults] = useState([])
  const [remainingCases, setremainingCases] = useState(problem.input_outputs.length + 1);
  const [finalResult, setFinalResult] = useState({"status": "Accepted", "time": 0, "memory": 0});
  const [totalPoints, setTotalPoints] = useState(0);
  const [sumPoints, setSumPoints] = useState(0);

  const columns = [
    {
      title: 'Case No',
      dataIndex: 'case_no',
      key: 'case_no',
      render: (_, record) => (
        <Space size="middle">
            <Tag color="geekblue">Test Case #{record.case_no}</Tag>
          
        </Space>
      ),
    },
    {
      title: 'Case Description',
      dataIndex: 'case_description',
      key: 'case_description',
      render: (_, record) => (
        <Space size="middle">
          <Tag color="geekblue">{record.case_description}</Tag>
        </Space>
      ),
    },

    {
      title: 'Memory Used',
      dataIndex: 'memory',
      key: 'memory',
      render: (_, record) => (
        <Space size="middle">
            <Tag color="geekblue">{record.memory}</Tag>

        </Space>
      ),
    },
    {
        title: 'Time Used',
        dataIndex: 'time',
        key: 'time',
        render: (_, record) => (
          <Space size="middle">
            
              <Tag color="geekblue">{record.time}</Tag>
            
  
          </Space>
        ),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, record) => (
          <Space size="middle">
            
            {record.status === "Accepted" ? 
            (
              <Tag color="green">{record.status}</Tag>
            ) : 
            (
              <Tag color="red">{record.status}</Tag>
            )}
  
          </Space>
        ),
    }
    
  ];

  

  useEffect(() => {

    const addSolution = async () => {
      const postData = {
        'code': code,
        'language': language.value,
        'memory': finalResult.memory,
        'time': finalResult.time,
        'status': finalResult.status
      }
      console.log("posting..", postData);
      await axios.post('http://localhost:8000/problems/problem/'.concat(problem.id).concat('/solution/') ,
      postData,{headers: {
        'Authorization': 'Token '.concat(authToken.token),
        'Content-Type' : 'application/json'
      }})
      .then(res => {
          console.log("success adding submission")
          console.log(window.$log = res.data);
      })
    .catch(err => {
        console.log("error adding submission")
        console.log(err.response.data);
    })
    }
    
    if(remainingCases === 0)
    {
      setLoading(false);
      addSolution();

    }

  }, [remainingCases, problem.id, code, language, finalResult, authToken])

  useEffect(() => {
    setremainingCases(old => (old === 0 ? 0 : old-1));
  }, [results])

  useEffect(() => {

    const checkStatus = async (token, i) => {

      console.log("checking status for ", i);

  
      const options = {
          method: "GET",
          url: `${process.env.REACT_APP_RAPID_API_URL}/${token}`,
          params: { base64_encoded: "true", fields: "*" },
          headers: {
              "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
              "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          }
      }
  
      console.log("checking url...", options.url)
      let status;
      let memoryUsed;
      let timeUsed;
  
      
      await axios.request(options)
      .then((response) => {
          status = response.data.status;
          memoryUsed = response.data.memory;
          timeUsed = response.data.time;
          let statusId = status.id;
          console.log('status', status.description);
  
          console.log('memory', memoryUsed);
          console.log('time', timeUsed);
  
          
          if(statusId === 1 || statusId === 2){
              setTimeout(() => {
                  status = checkStatus(token, i);
              }, 2000);
          }
          else 
          {
  
              setResults(oldResult => (
                [
                  ...oldResult,
                  {
                    'case_no': i+1,
                    'case_description': "",
                    'status': response.data.status?.description,
                    'memory': `${memoryUsed} KB`,
                    'time': `${timeUsed} s`
                  },
                ]
              ))

              if(statusId === 3){
                setTotalPoints(old => old+problem.input_outputs[i].points);
              }
              setFinalResult(oldResult => (
                (oldResult === "Accepted" ? 
                {
                  "status" : response.data.status.description, 
                  "time" : Math.max(oldResult.time, timeUsed),
                  "memory": Math.max(oldResult.memory, memoryUsed)
                } 
                : 
                {
                  "status" : oldResult.status, 
                  "time" : Math.max(oldResult.time, timeUsed),
                  "memory": Math.max(oldResult.memory, memoryUsed)
                } 
                ))
              )
              setSumPoints(old => old+problem.input_outputs[i].points);
              
              console.log(i, "th case done successfully");   
              console.log("input output was ", problem.input_outputs[i].input, problem.input_outputs[i].output);
              console.log(response.data);

          }
  
          
      })
      .catch(err => {
          console.log("err", err);
          setLoading(false);
  
      })
      return {status, memoryUsed, timeUsed};
  
    }

    const submitCode = async () =>  {
      console.log("Submitting code...")
  
      
      const inputOutputs = problem.input_outputs;
      console.log(inputOutputs);
      
      for(let i=0;i<inputOutputs.length; i+=1){
  
          const formData = {
              language_id: language.id,
              // encode source code in base64
              source_code: btoa(code),
              stdin: btoa(inputOutputs[i].input),
              expected_output: btoa(inputOutputs[i].output),
              cpu_time_limit: problem.time_limit,
              cpu_extra_time: 0.1,
              memory_limit: problem.memory_limit * 1000
          };
          const options = {
              method: "POST",
              url: process.env.REACT_APP_RAPID_API_URL,
              params: { base64_encoded: "true", fields: "*" },
              headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
              },
              data: formData,
            };
  
          await axios.request(options).
          then((response) => {
              console.log("res.data", response.data);
              const token = response.data.token;
              console.log("token", token);
              let result = checkStatus(token, i);
              console.log("result returned");
              console.log(result);
              console.log()
              // if(result.status !== "Accepted")
              // {
              //   setFinalResult(response.data.status.description);
              //   let j = 0;
              //   for(j=i+1; j< problem.input_outputs.length;j+=1)
              //   {
              //     setResults(oldResult => (
              //       [
              //         ...oldResult,
              //         {
              //           'case_no': j,
              //           'case_description': "",
              //           'status': "Skipped",
              //           'memory': "None",
              //           'time': "None"
              //         },
              //       ]
              //     ))
              //   }

              //   return;
                
              // }
  
            
  
          })
          .catch((err) => {
              let error = err.response ? err.response.data : err;
              let status = error.reponse.status;
              console.log("status", status);
              if (status === 429){
                  console.log("too many requests", status);
              }
              console.log("error", err)
              
          })
  
      }
      
      
      
    }
    submitCode();





  }, [problem, language, code])

  

  
  
   


  return (
    <div className="">
      {isLoggedIn ? (
        <div>
        <Navbar />
        <br />
        <div className='problem--submenu' style={{fontWeight: 400}}>
        <Menu mode="horizontal">
          <Menu.Item key="goback" padding-left="100px">
          <Link to={`/problems/problem/${problem.id}`}>{`<< Back to problem`}</Link>
          </Menu.Item>

        </Menu>
        </div>

        <div className="result--section">
            
        <h2 >{problem.name}</h2>
        <br />
        
        <div >
        {remainingCases ? 
          <div>
            <h4>Running On Test Cases...</h4>
            <img src={spinner} width="10%" height="10%"
                 alt="loading..."/>
          </div>
          :
          <div>
          {sumPoints === totalPoints ? 
          <Alert 
          type='success'
          message={finalResult.status}
          description={`Points: ${totalPoints} / ${sumPoints}`} 
          />
          
          : 
          <Alert 
          type='error'
          message={finalResult.status}
          description={`Points: ${totalPoints} / ${sumPoints}`} 
          />
          }
          </div>
        
        }
        
        
        
        <br />
        </div>
        
        
        <Table id='result' dataSource={results} columns={columns}/>
        
                
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

export default ProblemResult;