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
    inputOutputs: [],
    roles: [],
    companies: [],
    subcategories: [],
    editorial: "",
    authorSolution: ""
  });

  const changePage = (event) => {
    setPage(event.key);
    console.log('page now', page)
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

          <Menu.Item key="editorial" onClick={changePage} padding-left="100px">
            Editorial
          </Menu.Item>
          
          {/* <Menu.Item key="solution" onClick={changePage} padding-left="100px">
            Author Solution
          </Menu.Item> */}
          
          
          
        </Menu>
        </div>
        <div className='problem--forms'>
        
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