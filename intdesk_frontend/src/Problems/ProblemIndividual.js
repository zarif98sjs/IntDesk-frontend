import axios from "axios";
import "katex/dist/katex.min.css";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation, useParams, Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons"
import { Col, Row, Menu, Button } from "antd";

import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import bookmark from "../images/bookmark.png";
import bookmarkWhite from "../images/bookmark-white.png"
import bookmarkBlack from "../images/bookmark-black.png"
import Navbar from "../Navbar/Navbar";
import IDE from "./IDE";
import "./problems.css";

export default function ProblemIndividual() {


  
  const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("authToken")));
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isAdmin, setAdmin] = useState(user ? user.is_admin : false);

  const params = useParams();

  const currentPath = useLocation().pathname;

  const [problem, setProblem] = useState([]);
  const [id, setId] = useState(params.id);

  const [bookmarked, setBookMarked] = useState(false);



  useEffect(() => {
    const fetchProblem = async () => {
      await axios
        .get("http://localhost:8000/problems/problem/".concat(id))
        .then((res) => {
          console.log((window.$log = res.data));
          console.log(res.data.roles);
          console.log(res.data.subcategories);
          console.log(res.data.companies);
          console.log(res.data.input_outputs);
          setProblem(res.data);
        })
        .catch((err) => {
          console.log(err);
          window.location.href = "/error"
        });
    };
    const checkBookMark = async () => {
        await axios.get("http://localhost:8000/problems/problem/".concat(id).concat("/check_bookmark"), {
            headers: {
              Authorization: "Token ".concat(authToken.token),
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log("bookmark checked")
            console.log(res.data)
            if(res.data.time_added)
            {
                setBookMarked(true);
            }
          }
            
        )
        .catch((err) => {
            console.log(err);
        })
    }
    fetchProblem();
    if(isLoggedIn) {
      checkBookMark();
    }
  }, [id, authToken, isLoggedIn]);

  const subMenuOptions = [
    {
      name: "Description",
      url: `/problems/problem/${id}`,
    },
    {
      name: "My Submissions",
      url: `/problems/problem/${id}/submissions`, // to be changed later
    },
  ];

  const addBookMark = async () => {
    

    await axios.post("http://localhost:8000/problems/problem/".concat(id).concat("/bookmark/"), {}, {
        headers: {
          Authorization: "Token ".concat(authToken.token),
          "Content-Type": "application/json",
        },
        })
        .then((res) => {
        console.log("bookmark added")
        console.log(res.data);
        setBookMarked(true);
        
        })
        .catch((err) => {
            console.log(err);
        })
    }
  
    const removeBookMark = async () => {
    

        await axios.delete("http://localhost:8000/problems/problem/".concat(id).concat("/delete_bookmark/"), {
            headers: {
              Authorization: "Token ".concat(authToken.token),
              "Content-Type": "application/json",
            },
            })
            .then((res) => {
            console.log("bookmark deleted")
            console.log(res.data);
            setBookMarked(false);
            
            })
            .catch((err) => {
                console.log(err);
            })
        }
      
    
  const gotoEdit = () => {
    window.location.href = "/problems/problem/".concat(id).concat("/edit");
  };
  return (
    <div>
      <Navbar />
      <div className="problem--submenu">
        <Menu mode="horizontal" defaultSelectedKeys={["Description"]}>
            {subMenuOptions.map(option => (
                <Menu.Item key={option.name} padding-left="100px">
                    <Link to={option.url}>{option.name}</Link>
                </Menu.Item>)
            )}
        </Menu>
        <div id="problem--section">
          <br />

          <Row>
            <Col span={12} style={{ maxHeight: "100px" }}>
              {isAdmin && 
              <Button
                  type="primary"
                  href={`/problems/problem/${id}/edit`}
                  shape="round"
                  icon={<PlusOutlined />}
                  size="large"
                  style={{ float: "left", margin: "0px 30px"}}
                >

                  Edit Problem
              </Button>
              
              // <button
              //   className="submit-btn"
              //   type="button"
              //   onClick={gotoEdit}
              //   style={{
              //     width: "150px",
              //     height: "40px",
              //     marginLeft: "20px",
              //     marginBottom: "10px",
              //   }}
              // >
              //   Edit Problem
              // </button>
              }
              <br />
              <br />
              <h2 style={{ paddingLeft: "20px" }}>
                {problem.name}{"        "}
                  {isLoggedIn && 
                    (bookmarked ? 
                    (
                    <button type="button" style={{backgroundColor: "white", borderRadius: "2px"}} title="Bookmark" onClick={removeBookMark}>
                    <img src={bookmarkBlack} alt="Remove Bookmark" width="40px" height="50px"/>
                    </button>
                    )
                    :
                    (
                    <button type="button" style={{backgroundColor: "white", borderRadius: "2px"}} title="Bookmark" onClick={addBookMark}>
                     <img src={bookmarkWhite} width="40px" height="50px" alt="Bookmark" />
                    </button>
                    )
                    ) 
                  }   
                    
                
              </h2>
              <Row
                style={{
                  fontSize: "16px",
                  paddingLeft: "20px",
                  paddingBottom: "15px",
                  color: "#5172b0",
                }}
              >
                <Col span={2}>{problem.difficulty}</Col>
                <Col span={4}>
                  Solves: {problem.solve_count} / {problem.submission_count}
                </Col>
                <Col span={6}>Time Limit: {problem.time_limit}s</Col>
                <Col span={6}>Memory Limit: {problem.memory_limit} MB</Col>
              </Row>
              {/* <Row style={{fontSize:'16px', paddingLeft:'20px', paddingBottom: '15px', color: "#5172b0"}}>
                        
                        
                    </Row> */}
              <div
                className="problem--description"
                style={{ paddingLeft: "20px" }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {problem.description}
                </ReactMarkdown>
              </div>
            </Col>
            <Col span={12}>
              <IDE problem={problem} id={id}/>
            </Col>
          </Row>
        </div>
        {/* <p>{problem.description}</p> */}
      </div>
    </div>
  );
}
