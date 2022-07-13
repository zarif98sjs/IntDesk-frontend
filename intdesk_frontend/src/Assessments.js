import { Image, Space, Typography, Carousel} from 'antd';
import { View } from "react";

import Navbar from "./navbar";

// questions.css import
import "./questions.css";

const { Text, Link } = Typography;

// const dataSource = [
//     { id: 1, title: "How to reverse a Linked List ?", name: 'Wasif', upvotes: 21, views: 21 },
//     { id: 1, title: "Tips from the author of Blind 75", name: 'Ali', upvotes: 19, views: 21 },
//     { id: 1, title: "Does Data Structures matter ?", name: 'Saad', upvotes: 16, views: 21 },
//     { id: 1, title: "What is Agile software development ?", name: 'Asad', upvotes: 25, views: 21 },
//     { id: 1, title: "How to reverse a Linked List ?", name: 'Wasif', upvotes: 21, views: 21 },
//     { id: 1, title: "Tips from the author of Blind 75", name: 'Ali', upvotes: 19, views: 21 },
//     { id: 1, title: "Does Data Structures matter ?", name: 'Saad', upvotes: 16, views: 21 },
//     { id: 1, title: "What is Agile software development ?", name: 'Asad', upvotes: 25, views: 21 },
//     { id: 1, title: "How to reverse a Linked List ?", name: 'Wasif', upvotes: 21, views: 21 },
//     { id: 1, title: "Tips from the author of Blind 75", name: 'Ali', upvotes: 19, views: 21 },
//     { id: 1, title: "Does Data Structures matter ?", name: 'Saad', upvotes: 16, views: 21 },
//     { id: 1, title: "What is Agile software development ?", name: 'Asad', upvotes: 25, views: 21 },
//     { id: 1, title: "How to reverse a Linked List ?", name: 'Wasif', upvotes: 21, views: 21 },
//     { id: 1, title: "Tips from the author of Blind 75", name: 'Ali', upvotes: 19, views: 21 },
//     { id: 1, title: "Does Data Structures matter ?", name: 'Saad', upvotes: 16, views: 21 },
//     { id: 1, title: "What is Agile software development ?", name: 'Asad', upvotes: 25, views: 21 },
//     { id: 1, title: "How to reverse a Linked List ?", name: 'Wasif', upvotes: 21, views: 21 },
//     { id: 1, title: "Tips from the author of Blind 75", name: 'Ali', upvotes: 19, views: 21 },
//     { id: 1, title: "Does Data Structures matter ?", name: 'Saad', upvotes: 16, views: 21 },
//     { id: 1, title: "What is Agile software development ?", name: 'Asad', upvotes: 25, views: 21 },
//   ];
  
//   const columns = [
//     {
//       title: 'Title',
//       dataIndex: 'title',
//       key: 'title',
//       render: (_, record) => (
//         <Space size="middle">
//           <a href="/q">{record.title}</a>
//           {/* <Link to="/App">{record.title}</Link> */}
//         </Space>
//       ),
//     },
//     {
//       title: 'Posted By',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Upvotes',
//       dataIndex: 'upvotes',
//       key: 'upvotes',
//     },
//     {
//         title: 'Views',
//         dataIndex: 'views',
//         key: 'views',
//       },
//   ];

//   function Assessments() {
//     return (
//             <div className="">
//                 <Navbar />
//                 <h1 id='title'>    All Questions </h1>
//                <Table id='questions' dataSource={dataSource} columns={columns} />;
//             </div>
//           );
//   }
  
// export default Assessments;

const imageSource = [
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" ,
        "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
      ];

function Assessments() {
        return (
                <div className="">
                    <Navbar />
                        <Image.PreviewGroup>
                            <Space size={50}>
                                <Image width={200} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" /> 
                                <Image width={200} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"/>
                            </Space>
                        </Image.PreviewGroup>
                </div>
              );
      }


export default Assessments;