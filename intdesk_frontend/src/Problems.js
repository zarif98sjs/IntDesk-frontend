import {useState, useEffect} from "react"
import axios from "axios"
import { Space, Table } from "antd"
import Navbar from "./navbar"
import problemsData from "./ProblemData"
import "./problems.css"

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space size="middle">
          <a href={`problem/${record.id}`} >{record.name}</a>
        </Space>
      ),
    },
    {
      title: 'Categories',
      dataIndex: 'subcategories',
      key: 'subcategories',
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
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
    }

  ];


export default function Problems(){

  const [problems, setProblems] = useState([])

  const fetchProblems = async () => {
    axios.get("http://localhost:8000/problems/problem/")
    .then(res => {
      console.log(window.$log = res.data)
      setProblems(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchProblems()
  }, [])

    
    return (
        <div>
            
            <h1 id='title'>All Problems</h1>
            <Table id='problems' dataSource={problems} columns={columns}/>
        </div>
    )
}
