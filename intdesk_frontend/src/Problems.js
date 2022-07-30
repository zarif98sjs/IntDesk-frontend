import { Space, Table } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "./navbar"
import "./problems.css"

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space size="middle">
          <a href={`problems/problem/${record.id}`} >{record.name}</a>
        </Space>
      ),
    },
    {
      title: 'Categories',
      dataIndex: 'subcategories',
      key: 'subcategories',
    } ,
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

  

  useEffect(() => {

    const fixFormat = (data) => {
      let newdata = data
      for(let i=0;i<data.length;i+=1){
        newdata[i].companies = data[i].companies.map(obj => obj.name)
        newdata[i].roles = data[i].roles.map(obj => obj.name)
        newdata[i].subcategories = data[i].subcategories.map(obj => obj.name)
        
        
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
            <h1 id='title'>All Problems</h1>
            <Table id='problems' dataSource={problems} columns={columns}/>
        </div>
    )
}
