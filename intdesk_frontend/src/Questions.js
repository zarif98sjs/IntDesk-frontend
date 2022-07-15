
import { Button, Input, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./questions.css";

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
              <pre>{tag}</pre>
            )) : null}

          </Space>
        ),
      },
  ];

  function Questions() {

    const [discussions, setDiscussions] = useState([]);
    const [discussionsTemp, setDiscussionsTemp] = useState([]);

    const [searchValue, setSearchValue] = useState("");

    // Extracting this method made it accessible for context/prop-drilling
    const fetchDiscussions = async () => {
      axios.get("http://localhost:8000/discussion/")
        .then(res => {
          console.log(window.$log = res.data);
          const ara = res.data;
          console.log(window.$log = ara);

          // for loop to get the user name
          for (let i = 0; i < ara.length; i+=1) {
            // if not null
            if (ara[i].user !== null) {
              ara[i].name = ara[i].user.username;
            }
          }
          setDiscussions(ara);
          setDiscussionsTemp(ara);
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

    
    
    return (
            <div className="">
                <h1 id='title'>Discussions</h1>
                <Space id='space_above'>
                <Search
                  id='search_button'
                  placeholder="search discussions"
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
                {/* check if search value is empty */}
                {searchValue === "" ? (
                  <Table id='questions' columns={columns} dataSource={discussions} />
                ) : (
                  <Table id='questions' columns={columns} dataSource={discussionsTemp} />
                )}
               {/* <Table id='questions' dataSource={discussions} columns={columns} />; */}
            </div>
          );
  }
  
export default Questions;
