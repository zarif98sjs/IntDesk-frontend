import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Space, Tag } from "antd";
import "./problems.css"

const { Meta } = Card;

export default function RecommendProblems () {

    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));
    const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("authToken")));      

    const [problems, setProblems] = useState([]);

    useEffect(() => {

        const fetchPopular = async () => {
            axios.get("http://localhost:8000/problems/popular/")
            .then(res => {
        
                console.log(window.$log = res.data)
                setProblems(res.data);
                
            })
            .catch(err => {
                console.log(err)
            })
        }

        const fetchRecommended = async () => {
            axios.get("http://localhost:8000/problems/recommended/", {
                headers: {
                  Authorization: "Token ".concat(authToken.token),
                  "Content-Type": "application/json",
                },
            })
            .then(res => {
        
                console.log(window.$log = res.data)
                setProblems(res.data);
                
            })
            .catch(err => {
                console.log(err)
            })
        }

        if(!isLoggedIn)
        {
            fetchPopular();
        }
        else 
        {
            fetchRecommended();
        }

    }, [isLoggedIn, authToken])
    return (
        <div className="card--container">
            {problems.map(obj => (
                <div>
                <Card hoverable
                style={{ width: "100%",  alignContent: "center", alignSelf: "center", margin: "auto", border: "groove", paddingTop: "20px", paddingLeft: "20px", fontSize: "16px" }}
                cover={
                    <div className="problem--card-body">
                  <a href={`/problems/problem/${obj.id}`}>
                    <h2 style={{color: "#1f65e6"}}>{obj.name}</h2>
                  </a>
                  {obj.difficulty === "Easy" ? 
                    (
                        <>
                        <Tag color="green" >{obj.difficulty}</Tag>
                        <Tag color="green">Solves: {obj.solve_count} / {obj.submission_count}</Tag>
                        </>
                    ):
                    (
                    obj.difficulty === "Medium" ? 
                    (
                        <>
                        <Tag color="yellow">{obj.difficulty}</Tag>
                        <Tag color="yellow">Solves: {obj.solve_count} / {obj.submission_count}</Tag>
                        </>
                    )
                    :
                    (
                        <>
                        <Tag color="red">{obj.difficulty}</Tag>
                        <Tag color="red">Solves: {obj.solve_count} / {obj.submission_count}</Tag>
                        </>
                    )
                    
                    )
                    
                    }
                    <br /><br />
                    <b>Categories:</b> <Space />
                    {obj.subcategories.map(sub => <Tag color="purple">{sub.name}</Tag>)}   
                    {obj.subcategories.map(sub => <Tag color="purple">{sub.category.name}</Tag>)}   
                    
                    <br /> <br />
                    <b>Roles and Companies:</b> <Space />
                    {obj.roles.map(role => <Tag color="purple">{role.name}</Tag>)}   
                    {obj.companies.map(com => <Tag color="purple">{com.name}</Tag>)}   
                    
                    
                  </div>
                }
                actions={
                  [
                    // <SettingOutlined key="setting" />,
                    // <EditOutlined key="edit" />,
                    // <EllipsisOutlined key="ellipsis" />,
                  ]
                }
              >
                <Meta
                  style={{ display: "block" }}
                />
              </Card>
                <br />
                </div>
                ))}
        </div>
    )

}