
import { Card, Tag, Space } from "antd"
import bookmarkWhite from "../images/bookmark-white.png"
import bookmarkBlack from "../images/bookmark-black.png"

import "./problems.css"

const { Meta } = Card;


export default function ProblemCardTable ({problems}) {
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
                  []
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