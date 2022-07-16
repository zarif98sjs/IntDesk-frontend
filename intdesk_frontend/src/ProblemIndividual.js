import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import axios from "axios"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Col, Row, Tag } from 'antd';
import problemData from "./ProblemData"
import SubMenu from "./SubMenu"
import IDE from "./IDE";
import "./problems.css"
import bookmark from "./images/bookmark.png"
import 'katex/dist/katex.min.css';

export default function ProblemIndividual(){
    const params = useParams()
    
    const currentPath = useLocation().pathname

    const [problem, setProblem] = useState([])
    const [id, setId] = useState(params.id)

    
    
      useEffect(() => {
        const fetchProblem = async () => {
            axios.get("http://localhost:8000/problems/problem/".concat(id))
            .then(res => {
              console.log(window.$log = res.data)
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
    return (
    <div className="problem--submenu">
        <SubMenu options={subMenuOptions}/>
        <div id="problem--section">
        <br/>
        
        <Row>
            <Col span={12} style={{maxHeight: "100px"}}>
                <h2 style={{paddingLeft: '20px'}}>{problem.name}</h2>
                <Row style={{fontSize:'16px', paddingLeft:'20px', paddingBottom: '15px', color: "#5172b0"}}>
                    <Col span={2}>
                        {problem.difficulty}
                    </Col>
                    <Col span={4}>
                            Solves: {problem.solve_count} / {problem.submission_count}
                    </Col>
                    <Col span={5}>
                        <button type="button" title="Bookmark" onClick={handleBookMark}>
                        <img src={bookmark} width="20px" alt="Bookmark" />
                        </button>
                        
                        </Col>
                </Row>
                <div className="problem--description" style={{paddingLeft: "20px"}}>
                    
                <ReactMarkdown 
                remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} >
                      {problem.description}
                </ReactMarkdown>
              
                </div>
            </Col>
            <Col span={12}>
                <IDE />
            </Col>
        </Row>
        
        </div>
        {/* <p>{problem.description}</p> */}
    </div>
    )
}
