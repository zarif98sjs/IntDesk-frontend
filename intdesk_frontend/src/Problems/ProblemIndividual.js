import { Col, Row } from 'antd';
import axios from "axios";
import 'katex/dist/katex.min.css';
import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { useLocation, useParams, Link } from "react-router-dom";
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import IDE from "./IDE";
import bookmark from "../images/bookmark.png";
import Navbar from "../navbar";
import "./problems.css";
import SubMenu from "../SubMenu";

export default function ProblemIndividual(){

    const authToken = JSON.parse(localStorage.getItem("authToken"));

    const params = useParams()
    
    const currentPath = useLocation().pathname
    
    const [problem, setProblem] = useState([])
    const [id, setId] = useState(params.id)

    const [solution, setSolution] = useState([])


    
    useEffect(() => {
        const fetchProblem = async () => {
            await axios.get("http://localhost:8000/problems/problem/".concat(id))
            .then(res => {
              console.log(window.$log = res.data)
              console.log(res.data.roles)
              console.log(res.data.subcategories)
              console.log(res.data.companies)
              console.log(res.data.input_outputs)
              setProblem(res.data)
            })
            .catch(err => {
              console.log(err)
            })
          }
        fetchProblem()
      }, [id])
    
      
    
    const subMenuOptions = [
        {
            name: "Description",
            url : {currentPath}
        },
        {
            name: "My Submissions",
            url: `${currentPath}/submissions` // to be changed later
        }
    ]
    function handleBookMark(){
        
        console.log("bookmark")
    }

    const gotoEdit = () => {
        window.location.href = '/problems/problem/'.concat(id).concat('/edit')
    }
    return (
    <div>
        <Navbar />
        <div className="problem--submenu">
            <SubMenu options={subMenuOptions}/>
            <div id="problem--section">
            <br/>
            
            <Row>
                <Col span={12} style={{maxHeight: "100px"}}>
                <button className="submit-btn" type="button" onClick={gotoEdit}  style={{width: "150px", height: "40px", marginLeft: "20px", marginBottom: "10px"}}>
                                    Edit Problem
                            </button>
                    <h2 style={{paddingLeft: '20px'}}>{problem.name} <button type="button" title="Bookmark" onClick={handleBookMark}>
                            <img src={bookmark} width="20px" alt="Bookmark" />
                            </button>
                            
                            </h2>
                    <Row style={{fontSize:'16px', paddingLeft:'20px', paddingBottom: '15px', color: "#5172b0"}}>
                        <Col span={2}>
                            {problem.difficulty}
                        </Col>
                        <Col span={4}>
                                Solves: {problem.solve_count} / {problem.submission_count}
                        </Col>
                        <Col span={6}>
                            Time Limit: {problem.time_limit}s
                        </Col>
                        <Col span={6}>
                                Memory Limit: {problem.memory_limit} MB
                        </Col>
                        
                    </Row>
                    {/* <Row style={{fontSize:'16px', paddingLeft:'20px', paddingBottom: '15px', color: "#5172b0"}}>
                        
                        
                    </Row> */}
                    <div className="problem--description" style={{paddingLeft: "20px"}}>
                        
                    <ReactMarkdown 
                    remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} >
                        {problem.description}
                    </ReactMarkdown>
                    </div>

                    
                </Col>
                <Col span={12}>
                    <IDE problem={problem} solution={solution}/>
                </Col>
            </Row>
            
            </div>
            {/* <p>{problem.description}</p> */}
        </div>
    </div>
    )
}
