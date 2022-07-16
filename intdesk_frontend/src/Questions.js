
import { Button, Input, Select, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import "./questions.css";

const { Option } = Select;

const { Search } = Input;
  
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => (
        <Space size="middle">
          {/* <a href="/q">{record.title}</a> */}
          <a href={`question/${record.id}`} >{record.title}</a>
          {/* <Link to="/App">{record.title}</Link> */}
        </Space>
      ),
    },
    {
      title: 'Posted By',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space size="middle">
          {record.name}
        </Space>
      ),
    },
    {
      title: 'Upvotes',
      dataIndex: 'upvotes',
      key: 'upvotes',
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: (_, record) => (
          <Space size="middle">
           {/* if tags not null */}
            {record.tags !== null ? record.tags.map(tag => (
              // <pre>{tag}</pre>
              <Tag color="geekblue">{tag}</Tag>
            )) : null}

          </Space>
        ),
      },
  ];

  function Questions() {

    const [discussions, setDiscussions] = useState([]);
    const [discussionsTemp, setDiscussionsTemp] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [searchTagValue, setSearchTagValue] = useState([]);

    const [tags, setTags] = useState([]);
    const children: React.ReactNode[] = [];
    
    // Extracting this method made it accessible for context/prop-drilling
    const fetchDiscussions = async () => {
      await axios.get("http://localhost:8000/discussion/")
        .then(res => {
          console.log(window.$log = res.data);
          const ara = res.data;
          console.log(window.$log = ara);

          let tempTags = [];

          // for loop to get the user name
          for (let i = 0; i < ara.length; i+=1) {
            // if not null
            if (ara[i].user !== null) {
              ara[i].name = ara[i].user.username;
              // loop through tags if tags not null
              if (ara[i].tags !== null) {
                for (let j = 0; j < ara[i].tags.length; j+=1) {
                  // if tag not in tempTags
                  if (!tempTags.includes(ara[i].tags[j])) {
                    tempTags.push(ara[i].tags[j]);
                    // children.push(<Option key={ara[i].tags[j]}>{ara[i].tags[j]}</Option>);
                  }
                }
              }
            }
          }
          setDiscussions(ara);
          setDiscussionsTemp(ara);
          setTags(tempTags);
          console.log("tags: ", tempTags);
        })
        .catch(err => {
          console.log(err);
        })
    };

    useEffect(() => {    
      fetchDiscussions();
    }, []);

    const onSearch = (value: string) => {
      console.log(value);
      // let tempDiscussions = [];

      // for(let i = 0; i < discussions.length; i+=1) {
      //   // convert to lower case
      //   if (discussions[i].title.toLowerCase().includes(value.toLowerCase())) {
      //     console.log(discussions[i]);
      //     tempDiscussions.push(discussions[i]);
      //   }
      // }

      // setDiscussions(tempDiscussions);
    } 

    const onChange= (e) => {
      console.log(e.target.value);
      let value = e.target.value;
      setSearchValue(value);
      let tempDiscussions = [];

      for(let i = 0; i < discussions.length; i+=1) {

        // convert to lower case and check substring match
        if (discussions[i].title.toLowerCase().includes(value.toLowerCase()) || 
          discussions[i].description.toLowerCase().includes(value.toLowerCase())) {
          console.log(discussions[i]);
          tempDiscussions.push(discussions[i]);
        }
      }

      setDiscussionsTemp(tempDiscussions);
    } 

    
    // loop through tags
    for (let i = 0; i < tags.length; i+=1) {
      children.push(<Option key={tags[i]}>{tags[i]}</Option>);
    }

    const searchTags = (value: string[]) => {
      console.log(`selected ${value}`);
      setSearchTagValue(value);

      let tempDiscussions = [];
      for(let i = 0; i < discussions.length; i+=1) {
        // if tags not null
        if (discussions[i].tags !== null) {
          // loop through tags
          for (let j = 0; j < discussions[i].tags.length; j+=1) {
            // if tag in value and already not present
            if (value.includes(discussions[i].tags[j]) && !tempDiscussions.includes(discussions[i])) {
              tempDiscussions.push(discussions[i]);
            }
          }
        }
      }

      console.log("tempDiscussions : ",tempDiscussions);
      setDiscussionsTemp(tempDiscussions);
    };
    
    return (
            <div className="">
                <h1 id='title'>Discussions</h1>

                <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width:'18.5%', float: 'right', margin: '0px 10% 0px 0px'}}
                      placeholder="Select Tags"
                      onChange={searchTags}
                    >
                      {children}
                    </Select>
                </Space>

                <br />

                <Space id='space_above' size='large'>

                <Search
                  id='search_button'
                  placeholder="Search Discussions"
                  allowClear
                  size="large"
                  onChange={onChange}
                  enterButton 
                />
                <Button type="primary" id='button_new' href="/question/new">New</Button>
                </Space>

                
                
                <br/>
                <br/>
                <br/>
             
                {searchValue === "" && searchTagValue.length === 0 ? (
                  <Table id='questions' columns={columns} dataSource={discussions} />
                ) : (
                  <Table id='questions' columns={columns} dataSource={discussionsTemp} />
                )}
               {/* <Table id='questions' dataSource={discussions} columns={columns} />; */}
            </div>
          );
  }
  
export default Questions;
