import { Input, Select, Space, Table, Tag, Menu } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Navbar from "../Navbar/Navbar"

import "./problems.css"

const { Option } = Select;
const { Search } = Input;


export default function BookMarksMine(){

  

  const [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("authToken")));
  
  const [problems, setProblems] = useState([]);
  const [showProblems, setShowProblems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [searchCategories, setSearchCategories] = useState([]);
  
  const [searchMatchIds, setSearchMatchIds] = useState([]);
  const [categoryMatchIds, setCategoryMatchIds] = useState([]);

  
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
      filters: [{text:"Easy", value: "Easy"}, {text: "Medium", value: "Medium"}, {text: "Hard", value:"Hard"}],
      onFilter: (value: string, record) => record.difficulty.indexOf(value) === 0,
    },
    
    {
        title: 'Solved By',
        dataIndex: 'solve_count',
        key: 'solve_count',
        sorter: (a, b) => a.solve_count - b.solve_count,
    },
    {
      title: 'Submitted By',
      dataIndex: 'submission_count',
      key: 'submission_count',
      sorter: (a, b) => a.submission_count - b.submission_count
  },
    {
      title: 'Asked In',
      dataIndex: 'companies',
      key: 'companies',
      render: (_, record) => (
        <Space size="middle">
         {/* if tags not null */}
          {record.companies !== null ? record.companies.map(company => (
            // <pre>{tag}</pre>userName
            <Tag color="geekblue">{company}</Tag>
          )) : null}

        </Space>
      ),
      filters: companies.map(obj => (
        {
          text: obj,
          value: obj
        }
      )),
      onFilter: (value: string, record) => record.companies.includes(value),
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
      filters: roles.map(obj => (
        {
          text: obj,
          value: obj
        }
      )),
      onFilter: (value: string, record) => record.roles.includes(value),
    },

  ];

  

  

  useEffect(() => {
    const fixFormat = (data) => {
      let newdata = data
      
      for(let i=0;i<data.length;i+=1){
        newdata[i].companies = data[i].companies.map(obj => obj.name)
        newdata[i].roles = data[i].roles.map(obj => obj.name)
        newdata[i].subcategories = data[i].subcategories.map(obj => obj.name)
        newdata[i].key = data[i].id
  
        setCompanies(oldCompanies => ([...oldCompanies, ...newdata[i].companies]));
        setRoles(oldRoles => ([...oldRoles, ...newdata[i].roles]))
        setCategories(oldCategories => ([...oldCategories, ...newdata[i].subcategories]))
        
      }
      setCategories(oldCategories => [...new Set(oldCategories)])
      setRoles(oldRoles => [...new Set(oldRoles)])
      setCompanies(oldCompanies => [...new Set(oldCompanies)])
      
      return newdata
    }
    const fetchProblems = async () => {
      axios.get("http://localhost:8000/problems/mybookproblemmarks", {
        headers: {
          Authorization: "Token ".concat(authToken.token),
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        
        console.log(window.$log = res.data)
        const formatted = fixFormat(res.data);
        setProblems(formatted);
        setShowProblems(formatted);
      })
      .catch(err => {
        console.log(err)
      })
    }
  
    
    fetchProblems()

    
  }, [authToken])

  const onSearchValueChange = (e) => {
    let value = e.target.value;
    setSearchValue(value);

    if(value === "" && searchCategories.length !== 0) 
    {
      onCategoryChange(searchCategories);
      return ;
    }

    let tempProblems = [];
    for(let i=0;i<problems.length;i+=1)
    {
      if(problems[i].name.toLowerCase().includes(value.toLowerCase()) && (searchCategories.length === 0 || showProblems.includes(problems[i])))
      {
        tempProblems.push(problems[i]);
      }
    }
    setShowProblems(tempProblems);
  }

  const onCategoryChange = (value: string[]) => {
    setSearchCategories(value);

    if(value.length === 0 && searchValue !== "")
    {
      onSearchValueChange(searchValue);
      return ;
    }

    

    let tempProblems = [];
    for(let i=0;i<problems.length;i+=1)
    {
      for(let j=0;j<value.length;j+=1)
      {
        if(problems[i].subcategories.includes(value[j]) && (searchValue === "" || showProblems.includes(problems[i])))
        {
          tempProblems.push(problems[i]);
          break;
        }
      }
    }
    setShowProblems(tempProblems);
    
  }
  
  
  const onChangeTable: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

    return (
        <div>
            
            <h1 id='title'>My Bookmarks</h1>
            <Space direction="vertical" size="large" style={{ display: "flex" }}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "18.5%", height: "20%", float: "right", margin: "0px 10% 0px 0px" }}
                placeholder="Select Categories"
                onChange={onCategoryChange}
              >
                {categories.map(obj=> <Option key={obj}>{obj}</Option>)}

      
              </Select>
              
            </Space>

            <br />
            
            
            <Space id="space_above" size="large">
              <Search
                id="search_button"
                placeholder="Search Problems"
                allowClear
                size="large"
                onChange={onSearchValueChange}
                enterButton
              />
            </Space>
            
            <br />
            <br />
            <br />
            {
            searchValue === "" && searchCategories.length === 0 ? 
            <Table id='problems' dataSource={problems} columns={columns} onChange={onChangeTable}/>
            :
            <Table id='problems' dataSource={showProblems} columns={columns} onChange={onChangeTable}/>
          
          }
            
        </div>
    )
}


