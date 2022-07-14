import { Typography } from 'antd';
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { useParams } from "react-router-dom";
import remarkGfm from 'remark-gfm';
import Comments from './Comments';
import Navbar from './navbar';
import "./questionIndividual.css";
import "./questions.css";

const { Title, Paragraph, Text, Link } = Typography;

function QuestionIndividual() {

    const params = useParams()
    const id = params.id

    const [discussion, setDiscussion] = useState([]);
    const [comments, setComments] = useState([]);

    // Extracting this method made it accessible for context/prop-drilling
    const fetchDiscussion = async () => {
      axios.get("http://localhost:8000/discussion/".concat(id))
        .then(res => {
          // console.log(window.$log = res.data.results);
          const data = res.data;
          // console.log(window.$log = data);
          setDiscussion(data);
        })
        .catch(err => {
          console.log(err);
        })
    };

    const fetchComments = async () => {
      axios.get("http://localhost:8000/discussion/".concat(id).concat("/comments/"))
        .then(res => {
          const ara = res.data;
          console.log(window.$log = ara);

          // empty array
          const tempComments = [];

          for (let i = 0; i < ara.length; i+=1) {
            // if not null
            if (ara[i].user !== null) {

              const obj = {
                  'userId' : ara[i].user.id,
                  'comId' : ara[i].id,
                  'fullName' : ara[i].user.username,
                  'text' : ara[i].comment,
                  'userProfile' : 'https://www.linkedin.com/in/',
                  'avatarUrl' : 'https://ui-avatars.com/api/name=Lily&background=random',
                  'replies' : []
              }

              tempComments.push(obj);
              console.log('temmp obj', obj);
            }
          }
          setComments(tempComments);
        })
        .catch(err => {
          console.log(err);
        })
    };

    useEffect(() => {    
      fetchDiscussion();
      fetchComments();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
            <div className="">
                <Navbar />
                {/* <h1 id='title'>   Single Question </h1> */}
                  <div id='qih'>
                    <h1>{discussion.title}</h1>
                  </div>
                  <br/>
                  <div id='qi'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} >
                    {discussion.description}
                    </ReactMarkdown>
                  </div>

                  <div>
                    <Comments comments={comments}/>
                  </div>
              
            </div>
          );
  }
  
export default QuestionIndividual;
