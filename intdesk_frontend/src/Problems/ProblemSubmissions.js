import Editor from "@monaco-editor/react";
import { Menu, Space, Table, Tag } from "antd";
import axios from "axios";
import "katex/dist/katex.min.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import copy from "../images/copy-content.png";

import Navbar from "../Navbar/Navbar";
import "./result.css";





export default function ProblemSubmissions() {
  const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("authToken")));

  const params = useParams();

  const currentPath = useLocation().pathname;

  const [id, setId] = useState(params.id);

  const [submissions, setSubmissions] = useState([]);

  const [selectedSubmission, setSelectedSubmission] = useState("");

  
  const columns = [
    {
      title: 'Solution ID',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => (
        <button
            type="button"
            className="link-button"
            onClick={() => setSelectedSubmission(record)}
            >
            {record.id}
        </button>
      ),
    },
    {
      title: 'Submission Date',
      dataIndex: 'time_added',
      key: 'time_added',
      
    },
    {
        title: 'Language',
        dataIndex: 'language',
        key: 'language',
        
      },
    {
      title: 'Memory Used',
      dataIndex: 'memory_usage',
      key: 'memory_usage',
      render: (_, record) => (
        `${record.memory_usage} KB` 
      ),
      
    },
    {
        title: 'Time Used',
        dataIndex: 'runtime',
        key: 'runtime',
        render: (_, record) => (
          `${record.runtime} s` 
        ),
    },
    {
        title: 'Status',
        dataIndex: 'solve_status',
        key: 'solve_status',
        render: (_, record) => (
          <Space size="middle">
            
            {record.solve_status === "Accepted" ? 
            (
              <Tag color="green">{record.solve_status}</Tag>
            ) : 
            (
              <Tag color="red">{record.solve_status}</Tag>
            )}
  
          </Space>
        ),
    }
    
  ];

  


  useEffect(() => {
    const fetchSolutions = async () => {
        console.log("fetching solution for ", id);
        await axios.get("https://intdesk.herokuapp.com/problems/problem/".concat(id).concat('/solutions'), {
            // await axios.get("https://intdesk.herokuapp.com/mysolved/test_solutions"), {
            headers: {
              Authorization: "Token ".concat(authToken.token),
              "Content-Type": "application/json",
            },
          })
        .then(res => {

            console.log("solution returned")
            console.log(window.$log = res.data)
            setSubmissions(res.data);
            if(res.data.length > 0){
                setSelectedSubmission(res.data[0]);
            }

        

        })
        .catch(err => {
            console.log("solution error");
          console.log(err)
        })
      }
      fetchSolutions();
    }, [id, authToken])


  const subMenuOptions = [
    {
      name: "Description",
      url: `/problems/problem/${id}`,
    },
    {
      name: "My Submissions",
      url: `/problems/problem/${id}/submissions`,
    },
  ];
  
  

  
  return (
    <div>
      <Navbar />
      <div className="problem--submenu">
      <Menu mode="horizontal" defaultSelectedKeys={["My Submissions"]}>
            {subMenuOptions.map(option => (
                <Menu.Item key={option.name} padding-left="100px">
                    <Link to={option.url}>{option.name}</Link>
                </Menu.Item>)
            )}
        </Menu>
        <div id="result--section">
          <br />
          <h3 >All Submissions</h3>
        <br />

        </div>
        <Table id='submissions' dataSource={submissions} columns={columns}/>
        <br />
        <br />
        {selectedSubmission !== "" && 
        <div className="submission--body">

        <div>
            <h4>Solution ID: {selectedSubmission.id}</h4>
        </div>
        
        {selectedSubmission.solve_status === "Accepted" ? 
        <div className="submission--accepted">

            <div>
                <h2>{selectedSubmission.solve_status}</h2>
                
                Runtime: {selectedSubmission.runtime} s
                <br />
                Memory: {selectedSubmission.memory_usage} KB
                <br />
                Language: {selectedSubmission.language}
                
            </div>
                
        </div>
        :
        <div className="submission--rejected">

            <div>
                <h2>{selectedSubmission.solve_status}</h2>
                Runtime: {selectedSubmission.runtime} s
                <br />
                Memory: {selectedSubmission.memory_usage} KB
                <br />
                Language: {selectedSubmission.language}
                
            </div>
                
        </div>

        }
        <br />    
        <div className="editor--body">
            Copy To Clipboard    
        <button type="button" title="Copy Code" 
        onClick={()=> navigator.clipboard.writeText(selectedSubmission.code)}>
            <img src={copy} width="20px" alt="Copy Code" />
        </button>
            
        <Editor
                options={{readOnly: true, minimap: {enabled: false}}}
                height="calc(50vh)"
                width="100%"
                theme="light"
                language={selectedSubmission.language}
                value = {selectedSubmission.code}
                style = {{border: "black", borderWeight: "10px"}}
                
            />
        </div>

        </div>
        }   
      </div>
    </div>
  );
}
