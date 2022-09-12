import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Table, Tag, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./discussions.css";

const { Text, Link } = Typography;
const { Option } = Select;
const { Search } = Input;

const userLocal = JSON.parse(localStorage.getItem("user"));

function Discussions() {
  const [discussions, setDiscussions] = useState([]);
  const [discussionsTemp, setDiscussionsTemp] = useState([]);

  const [userNames, setUserNames] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [searchTagValue, setSearchTagValue] = useState([]);

  const [tags, setTags] = useState([]);
  const children: React.ReactNode[] = [];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (_, record) => (
        <Space size="middle">
          <a href={`discussion/${record.id}`}>
            <Text style={{ "font-size": "110%" }} italic keyboard>
              {record.title}
            </Text>
          </a>
        </Space>
      ),
    },
    {
      title: "Posted By",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Space size="middle">
          {userLocal === null || record.name !== userLocal.username ? (
            <a href={`profile/${record.name}`}>
              <Space size="middle">
                <Tag color="blue">{record.name}</Tag>
              </Space>
            </a>
          ) : (
            <a href="profile">
              <Space size="middle">
                <Tag color="blue">{record.name}</Tag>
              </Space>
            </a>
          )}
        </Space>
      ),
      filters: userNames,
      onFilter: (value: string, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "Votes",
      dataIndex: "upvotes",
      key: "upvotes",
      render: (_, record) => (
        <Space size="middle">
          {/* <Tag color="blue">{record.upvotes - record.downvotes}</Tag> */}
          <Text style={{ "font-size": "110%" }} keyboard>
            {record.upvotes - record.downvotes}
          </Text>
        </Space>
      ),
      sorter: (a, b) => a.upvotes - a.downvotes - (b.upvotes - b.downvotes),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_, record) => (
        <Space size="middle">
          {/* if tags not null */}
          {record.tags !== null
            ? record.tags.map((tag) => (
                // <pre>{tag}</pre>
                <Tag color="geekblue">{tag}</Tag>
              ))
            : null}
        </Space>
      ),
    },
  ];

  // Extracting this method made it accessible for context/prop-drilling
  const fetchDiscussions = async () => {
    await axios
      .get("https://intdesk.herokuapp.com/discussion/")
      .then((res) => {
        console.log((window.$log = res.data));
        const ara = res.data;
        console.log((window.$log = ara));

        let tempTags = [];
        let tempUserNames = [];

        // for loop to get the user name
        for (let i = 0; i < ara.length; i += 1) {
          // if not null
          if (ara[i].user !== null) {
            ara[i].name = ara[i].user.username;

            // if not present
            if (!tempUserNames.includes(ara[i].user.username)) {
              tempUserNames.push(ara[i].user.username);
            }

            // loop through tags if tags not null
            if (ara[i].tags !== null) {
              for (let j = 0; j < ara[i].tags.length; j += 1) {
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

        let tempUserNameFilter = [];
        for (let i = 0; i < tempUserNames.length; i += 1) {
          tempUserNameFilter.push({
            text: tempUserNames[i],
            value: tempUserNames[i],
          });
        }

        setUserNames(tempUserNameFilter);
        console.log("tags: ", tempTags);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("user Local: ", userLocal);
    fetchDiscussions();
  }, []);

  // SEARCH by title and tags
  const onChange = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    setSearchValue(value);
    let tempDiscussions = [];

    for (let i = 0; i < discussions.length; i += 1) {
      // convert to lower case and check substring match
      if (
        discussions[i].title.toLowerCase().includes(value.toLowerCase()) ||
        discussions[i].description.toLowerCase().includes(value.toLowerCase())
      ) {
        console.log(discussions[i]);
        tempDiscussions.push(discussions[i]);
      }
    }

    setDiscussionsTemp(tempDiscussions);
  };

  // loop through tags
  for (let i = 0; i < tags.length; i += 1) {
    children.push(<Option key={tags[i]}>{tags[i]}</Option>);
  }

  const searchTags = (value: string[]) => {
    console.log(`selected ${value}`);
    setSearchTagValue(value);

    let tempDiscussions = [];
    for (let i = 0; i < discussions.length; i += 1) {
      // if tags not null
      if (discussions[i].tags !== null) {
        // loop through tags
        for (let j = 0; j < discussions[i].tags.length; j += 1) {
          // if tag in value and already not present
          if (
            value.includes(discussions[i].tags[j]) &&
            !tempDiscussions.includes(discussions[i])
          ) {
            tempDiscussions.push(discussions[i]);
          }
        }
      }
    }

    console.log("tempDiscussions : ", tempDiscussions);
    setDiscussionsTemp(tempDiscussions);
  };

  const onChangeTable: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="">
      <Navbar />
      <h1 id="title">Discussions</h1>

      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "18.5%", float: "right", margin: "0px 10% 0px 0px" }}
          placeholder="Select Tags"
          onChange={searchTags}
        >
          {children}
        </Select>
      </Space>

      <br />

      <Space id="space_above" size="large">
        <Search
          id="search_button"
          placeholder="Search Discussions"
          allowClear
          size="large"
          onChange={onChange}
          enterButton
        />
      </Space>

      <Button
        type="primary"
        href="/discussion/new"
        shape="round"
        icon={<PlusOutlined />}
        size="large"
        style={{ float: "left", margin: "0px 10%" }}
      >
        New
      </Button>

      <br />
      <br />
      <br />

      {searchValue === "" && searchTagValue.length === 0 ? (
        <Table
          id="questions"
          columns={columns}
          dataSource={discussions}
          onChange={onChangeTable}
        />
      ) : (
        <Table
          id="questions"
          columns={columns}
          dataSource={discussionsTemp}
          onChange={onChangeTable}
        />
      )}
      {/* <Table id='questions' dataSource={discussions} columns={columns} />; */}
    </div>
  );
}

export default Discussions;
