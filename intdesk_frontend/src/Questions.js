
import { Button, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
// questions.css import
import "./questions.css";

  
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
        title: 'Views',
        dataIndex: 'views',
        key: 'views',
      },
  ];

  function Questions() {

    const [discussions, setDiscussions] = useState([]);

    // Extracting this method made it accessible for context/prop-drilling
    const fetchDiscussions = async () => {
      axios.get("http://localhost:8000/discussion/")
        .then(res => {
          // console.log(window.$log = res.data.results);

          const ara = res.data.results;
          console.log(window.$log = ara);
          // console.log(ara[1].user.username);
          // for loop to get the user name
          for (let i = 0; i < ara.length; i+=1) {
            // if not null
            if (ara[i].user !== null) {
              console.log(ara[i].user);
              ara[i].name = ara[i].user.username;
              console.log(ara[i].name);
            }
          }
          setDiscussions(ara);
        })
        .catch(err => {
          console.log(err);
        })
    };

    useEffect(() => {    
      fetchDiscussions();
    }, []);
    
    return (
            <div className="">
                <Navbar />
                <h1 id='title'>Discussions</h1>
          
                <Button type="primary" id = 'button_new' href="/question/new">New</Button>
                <br/>
                <br/>
                <br/>
               <Table id='questions' dataSource={discussions} columns={columns} />;
            </div>
          );
  }
  
export default Questions;
