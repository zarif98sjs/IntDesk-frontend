

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

import React from 'react';
import { Card, Col, Row , Button} from 'antd';
import { Navigate, Link } from 'react-router-dom';
import Navbar from "./navbar";
import './assess.css';

const { Meta } = Card;





function Assessments() {

    const flashcards = [
        { id: 1, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 2, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 3, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 4, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 5, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 6, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 7, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 8, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 9, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 10, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 11, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 12, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 13, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
        { id: 14, image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: 'Python', takenBy: 21 },
    ];


    const element = flashcards.map(flashcard => (
        <Col span={6}>
        <div key={flashcard.id}>
            <Link to={`assess_ques/${flashcard.id}`}>
            <Card className='site-card-wrapper' hoverable style={{ width: 240, height: 300}} cover={<img alt="example" className = 'photo' src={flashcard.image} />} >
                <h2 style={{textAlign: "center"}}>{flashcard.name}</h2>
                <h4>Taken By : {flashcard.takenBy}</h4>
                <Button  type="link" htmlType="submit">Take Assessment Quiz </Button>
            </Card>
            </Link>
        </div>
        </Col>
    ))
    


    return (
        
        <div>
            <Navbar/>
            <h1 id='title'> All Assessments </h1>
            <Row gutter={[16, 24]}>
              {element}
            </Row>             
        </div>
    )
  }



export default Assessments;

/* <Card hoverable style={{ width: 240,}} cover={<img alt="example" src={flashcard.image} />} >
                            <h2 style={{textAlign: "center"}}>{flashcard.name}</h2>
                            <Button type="primary" htmlType="submit">Take Assessment Quiz </Button>
                        </Card> */

                        // <div key={flashcard.id} onClick={goToDetails} role="button" tabIndex={0}>

