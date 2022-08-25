import { Space, Table, Tag } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../navbar"

import "./problems.css"


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space size="middle">
          <a href={`/problems/problem/${record.id}`} >{record.name}</a>
        </Space>
      ),
    },
    {
      title: 'Categories',
      dataIndex: 'subcategories',
      key: 'subcategories',
      render: (_, record) => (
        <Space size="middle">
         {/* if tags not null */}
          {record.subcategories !== null ? record.subcategories.map(subcategory => (
            // <pre>{tag}</pre>
            <Tag color="geekblue">{subcategory}</Tag>
          )) : null}

        </Space>
      ),
    },

    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (_, record) => (
        <Space size="middle">
          
            <Tag color="geekblue">{record.difficulty}</Tag>
          

        </Space>
      ),
    },
    {
        title: 'Submissions',
        dataIndex: 'submission_count',
        key: 'submission_count',
    },
    {
        title: 'Solutions',
        dataIndex: 'solve_count',
        key: 'solve_count',
    },
    {
      title: 'Asked In',
      dataIndex: 'companies',
      key: 'companies',
      render: (_, record) => (
        <Space size="middle">
         {/* if tags not null */}
          {record.companies !== null ? record.companies.map(company => (
            // <pre>{tag}</pre>
            <Tag color="geekblue">{company}</Tag>
          )) : null}

        </Space>
      ),
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (_, record) => (
        <Space size="middle">
         {/* if tags not null */}
          {record.roles !== null ? record.roles.map(role => (
            // <pre>{tag}</pre>
            <Tag color="geekblue">{role}</Tag>
          )) : null}

        </Space>
      ),
    },

  ];

  const gotoNew = () => {
    window.location.href = '/problems/new'
  }


export default function Problems(){

  const [problems, setProblems] = useState([])

  

  useEffect(() => {

    const fixFormat = (data) => {
      let newdata = data
      for(let i=0;i<data.length;i+=1){
        newdata[i].companies = data[i].companies.map(obj => obj.name)
        newdata[i].roles = data[i].roles.map(obj => obj.name)
        newdata[i].subcategories = data[i].subcategories.map(obj => obj.name)
        newdata[i].key = data[i].id
        
      }
      return newdata
    }
    const fetchProblems = async () => {
      axios.get("http://localhost:8000/problems/problem/")
      .then(res => {
        console.log(window.$log = res.data)
        setProblems(oldValue => {
          return fixFormat(res.data)
        })
      })
      .catch(err => {
        console.log(err)
      })
    }

    
    fetchProblems()
    
    
  }, [])

    
    return (
        <div>
            <Navbar />
            <div className="button-row--right">
              {/* <button className="submit-btn" type="button"  onClick={gotoNew} style={{width: "150px"}}>
                Create New
              </button> */}
              <Link to='/problems/new'>
              <button className="submit-btn" type="button" style={{width: "150px"}}>
                Create New
              </button>
              </Link>
            </div>
            <h1 id='title'>All Problems</h1>
            <Table id='problems' dataSource={problems} columns={columns}/>
        </div>
    )
}
