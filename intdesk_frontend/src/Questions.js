// import { Table } from "antd";
// import { TableProps } from "antd/lib/table";
// import * as React from "react";
// // @ts-ignore
// import reqwest from "reqwest";

// import "antd/dist/antd.css";

// const { useState, useEffect } = React;

// function Questions() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [userList, setUserList] = useState([]);
//   const [pagination, setPagination] = useState({});

//   const customFetch = async (params = {}) => {
//     console.log("params:", params);
//     setIsLoading(true);
//     const response = await reqwest({
//       url: "https://randomuser.me/api",
//       method: "get",
//       data: {
//         results: 100
//       },
//       type: "json"
//     });
//     console.log("response.results", response.results);
//     setUserList(response.results);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     customFetch({});
//   }, []);

//   const columns = [
//     {
//       title: "Email",
//       dataIndex: "email"
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       sorter: (a, b) => (a.name.first > b.name.first ? 1 : -1),
//       render: (name) => `${name.first} ${name.last}`,
//       width: "20%"
//     },
//     {
//       title: "Gender",
//       dataIndex: "gender",
//       filters: [
//         { text: "Male", value: "male" },
//         { text: "Female", value: "female" }
//       ],
//       width: "20%"
//     }
//   ];

//   const handleTableChange: TableProps<any>["onChange"] = (
//     pagination,
//     filters,
//     sorter
//   ) => {
//     setPagination(pagination);
//     customFetch({
//       results: pagination.pageSize,
//       page: pagination.current,
//       sortField: sorter.field,
//       sortOrder: sorter.order,
//       ...filters
//     });
//   };

//   return (
//     <div>
//       <Table
//         columns={columns}
//         dataSource={userList}
//         loading={isLoading}
//         onChange={handleTableChange}
//         pagination={pagination}
//         rowKey="email"
//       />
//     </div>
//   );
// };

// export default Questions;

import { Space, Table } from "antd";
import Navbar from "./navbar";
// questions.css import
import "./questions.css";

const dataSource = [
    { id: 1, title: "How to reverse a Linked List ?", name: 'Wasif', upvotes: 21, views: 21 },
    { id: 1, title: "Tips from the author of Blind 75", name: 'Ali', upvotes: 19, views: 21 },
    { id: 1, title: "Does Data Structures matter ?", name: 'Saad', upvotes: 16, views: 21 },
    { id: 1, title: "What is Agile software development ?", name: 'Asad', upvotes: 25, views: 21 },
    { id: 1, title: "How to reverse a Linked List ?", name: 'Wasif', upvotes: 21, views: 21 },
    { id: 1, title: "Tips from the author of Blind 75", name: 'Ali', upvotes: 19, views: 21 },
    { id: 1, title: "Does Data Structures matter ?", name: 'Saad', upvotes: 16, views: 21 },
    { id: 1, title: "What is Agile software development ?", name: 'Asad', upvotes: 25, views: 21 },
    { id: 1, title: "How to reverse a Linked List ?", name: 'Wasif', upvotes: 21, views: 21 },
    { id: 1, title: "Tips from the author of Blind 75", name: 'Ali', upvotes: 19, views: 21 },
    { id: 1, title: "Does Data Structures matter ?", name: 'Saad', upvotes: 16, views: 21 },
    { id: 1, title: "What is Agile software development ?", name: 'Asad', upvotes: 25, views: 21 },
    { id: 1, title: "How to reverse a Linked List ?", name: 'Wasif', upvotes: 21, views: 21 },
    { id: 1, title: "Tips from the author of Blind 75", name: 'Ali', upvotes: 19, views: 21 },
    { id: 1, title: "Does Data Structures matter ?", name: 'Saad', upvotes: 16, views: 21 },
    { id: 1, title: "What is Agile software development ?", name: 'Asad', upvotes: 25, views: 21 },
    { id: 1, title: "How to reverse a Linked List ?", name: 'Wasif', upvotes: 21, views: 21 },
    { id: 1, title: "Tips from the author of Blind 75", name: 'Ali', upvotes: 19, views: 21 },
    { id: 1, title: "Does Data Structures matter ?", name: 'Saad', upvotes: 16, views: 21 },
    { id: 1, title: "What is Agile software development ?", name: 'Asad', upvotes: 25, views: 21 },
  ];
  
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => (
        <Space size="middle">
          <a href="/q">{record.title}</a>
          {/* <Link to="/App">{record.title}</Link> */}
        </Space>
      ),
    },
    {
      title: 'Posted By',
      dataIndex: 'name',
      key: 'name',
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
    return (
            <div className="">
                <Navbar />
                <h1 id='title'>    All Questions </h1>
               <Table id='questions' dataSource={dataSource} columns={columns} />;
            </div>
          );
  }
  
export default Questions;
