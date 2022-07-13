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
      dataIndex: 'subCategories',
      key: 'subCategories',
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
    },
    {
        title: 'Submissions',
        dataIndex: 'submissionCount',
        key: 'submissionCount',
    },
    {
        title: 'Solutions',
        dataIndex: 'solveCount',
        key: 'solveCount',
    },
    {
        title: 'Asked In',
        dataIndex: 'companies',
        key: 'companies',
    }

  ];


export default function Problems(){
    
    return (
        <div>
            
            <h1 id='title'>All Problems</h1>
            <Table id='problems' dataSource={problemsData} columns={columns}/>
        </div>
    )
}