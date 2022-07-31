import { Col, Row } from 'antd';
import axios from "axios";
import 'katex/dist/katex.min.css';
import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { useLocation, useParams } from "react-router-dom";
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import IDE from "./IDE";
import bookmark from "./images/bookmark.png";
import Navbar from "./navbar";
import "./problems.css";
import SubMenu from "./SubMenu";

export default function ProblemIndividual(){

    const authToken = JSON.parse(localStorage.getItem("authToken"));

    const params = useParams()
    
    const currentPath = useLocation().pathname

    const [problem, setProblem] = useState([])
    const [id, setId] = useState(params.id)

    const constraints = 
`- $n == gas.length == cost.length$ \

- $1 <= n <= 105$ \

- $0 <= gas[i], cost[i] <= 104$ `

    const admin = false

    const [input, setInput] = useState({"input": "", "output": "", "points": 0})
    const [company, setCompany] = useState({"name": "", "description": ""})
    const [role, setRole] = useState({"name": "", "description": ""})
    const [subcategory, setSubcategory] = useState({"category": "", "name": ""})
    
    

    function preventDefault(event) {
        event.preventDefault()
    } 
    

    function handleInputChange(event){

        const {name, value} = event.target
        setInput(oldValue => (
            {
            ...oldValue,
            [name] : value
            }
        ))

    }

    function handleCompanyChange(event){

        const {name, value} = event.target
        setCompany(oldValue => (
            {
            ...oldValue,
            [name] : value
            }
        ))

    }

    function handleRoleChange(event){

        const {name, value} = event.target
        setRole(oldValue => (
            {
            ...oldValue,
            [name] : value
            }
        ))

    }

    function handleSubcategoryChange(event){

        const {name, value} = event.target
        setSubcategory(oldValue => (
            {
            ...oldValue,
            [name] : value
            }
        ))

    }


     const handleInputSubmit = async () => {

        
        let postdata = {
            
            "input": input.input,
            "output": input.output,
            "points": input.points

        }
        let address = 'http://localhost:8000/problems/problem/'.concat(id).concat('/input_output/')

        await axios.post(address ,postdata,{headers: {
            'Authorization': 'Token '.concat(authToken.token),
            'Content-Type' : 'application/json'
        }})
        .then(res => {
            console.log("success")
            console.log(window.$log = res.data);
        })
        .catch(err => {
            console.log("error")
            console.log(err);
        })

    }

    const handleCompanySubmit = async () => {

        
        let postdata = {
            
                "name": company.name,
                "description": company.description,
                
            
        }
        let address = 'http://localhost:8000/problems/problem/'.concat(id).concat('/company/')

        await axios.post(address ,postdata,{headers: {
            'Authorization': 'Token '.concat(authToken.token),
            'Content-Type' : 'application/json'
        }})
        .then(res => {
            console.log("success")
            console.log(window.$log = res.data);
        })
        .catch(err => {
            console.log("error")
            console.log(err);
        })

    }

    const handleRoleSubmit = async () => {

        
        let postdata = {
            
                "name": role.name,
                "description": role.description,
                
            
        }
        let address = 'http://localhost:8000/problems/problem/'.concat(id).concat('/role/')

        await axios.post(address ,postdata,{headers: {
            'Authorization': 'Token '.concat(authToken.token),
            'Content-Type' : 'application/json'
        }})
        .then(res => {
            console.log("success")
            console.log(window.$log = res.data);
        })
        .catch(err => {
            console.log("error")
            console.log(err);
        })

    }

    const handleSubCategorySubmit = async () => {

        
        let postdata = {
            
                "category": subcategory.category,
                "name": subcategory.name,
                
            
        }
        let address = 'http://localhost:8000/problems/problem/'.concat(id).concat('/subcategory/')

        await axios.post(address ,postdata,{headers: {
            'Authorization': 'Token '.concat(authToken.token),
            'Content-Type' : 'application/json'
        }})
        .then(res => {
            console.log("success")
            console.log(window.$log = res.data);
        })
        .catch(err => {
            console.log("error")
            console.log(err);
        })

    }
    
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
    <div>
        <Navbar />
        <div className="problem--submenu">
            <SubMenu options={subMenuOptions}/>
            <div id="problem--section">
            <br/>
            
            <Row>
                <Col span={12} style={{maxHeight: "100px"}}>
                
                    <h2 style={{paddingLeft: '20px'}}>{problem.name} <button type="button" title="Bookmark" onClick={handleBookMark}>
                            <img src={bookmark} width="20px" alt="Bookmark" />
                            </button></h2>
                    
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
                        {/* <div className="problem--constraints">
                            <h4><b>Constraints</b></h4>
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} >
                                {constraints}
                            </ReactMarkdown>
                        </div> */}
                    { admin && 
                    <div>
                        <form onSubmit={preventDefault}>
                            <input 
                            type="text" 
                            placeholder="input"
                            onChange={handleInputChange}
                            name="input"
                            />
                            <input 
                            type="text" 
                            placeholder="output" 
                            onChange={handleInputChange}
                            name="output"
                            />
                            <input 
                            type="number"
                            min="1" 
                            placeholder="points"
                            onChange={handleInputChange}
                            name="points"
                            />
                            
                            <button className="form--button" type="submit" onClick={handleInputSubmit}>Submit I/O</button>
                        </form>
                        <br/>
                        <form onSubmit={preventDefault}>
                            <input 
                            type="text" 
                            placeholder="company name"
                            onChange={handleCompanyChange}
                            name="name"
                            />
                            <input 
                            type="text" 
                            placeholder="description" 
                            onChange={handleCompanyChange}
                            name="description"
                            />
                            
                            
                            <button className="form--button" type="submit" onClick={handleCompanySubmit}>Submit Company</button>
                        </form>
                        <br/>
                        <form onSubmit={preventDefault}>
                            <input 
                            type="text" 
                            placeholder="role name"
                            onChange={handleRoleChange}
                            name="name"
                            />
                            <input 
                            type="text" 
                            placeholder="description" 
                            onChange={handleRoleChange}
                            name="description"
                            />
                            
                            
                            <button className="form--button" type="submit" onClick={handleRoleSubmit}>Submit Role</button>
                        </form>
                        <br/>
                        <form onSubmit={preventDefault}>
                            <input 
                            type="text" 
                            placeholder="category name"
                            onChange={handleSubcategoryChange}
                            name="category"
                            />
                            <input 
                            type="text" 
                            placeholder="subcategory name" 
                            onChange={handleSubcategoryChange}
                            name="name"
                            />
                            
                            
                            <button className="form--button" type="submit" onClick={handleSubCategorySubmit}>Submit Subcategory</button>
                        </form>
                        
                    </div>
                    
                    

                    }

                    </div>

                    
                </Col>
                <Col span={12}>
                    <IDE />
                </Col>
            </Row>
            
            </div>
            {/* <p>{problem.description}</p> */}
        </div>
    </div>
    )
}
