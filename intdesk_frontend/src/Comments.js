import axios from "axios";
import React, { useEffect, useState } from "react";
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';

function Comments({comments}){

  const [user, setUser] = useState([]);
  
  const fetchUser = async () => {
    await axios.get("http://localhost:8000/users/details/", {
      headers: {
          'Authorization': 'Token ab77e5955ff7b7ef59a5ad0620fa9ff76f7aa846'
        }
      })
      .then(res => {
        console.log(window.$log = res.data);
        const objU = {
          'currentUserId' : res.data.id,
          'currentUserImg': 'https://ui-avatars.com/api/name=Riya&background=random',
          'currentUserProfile' : 'https://www.linkedin.com/in/',
          'currentUserFullName' : res.data.username,
        }
        setUser(objU);
        localStorage.setItem("user", JSON.stringify(objU));
      })
      .catch(err => {
        console.log(err);
      })
  };

  useEffect(() => {    
    fetchUser();
  }, []);

  const tempUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
    
      <CommentSection
        currentUser={{
          currentUserId: tempUser.currentUserId,
          currentUserImg:
            'https://ui-avatars.com/api/name=Riya&background=random',
          currentUserProfile:
            'https://www.linkedin.com/in/',
          currentUserFullName: tempUser.currentUserFullName
        }}
        // currentUser={}
        logIn={{
          loginLink: 'http://localhost:3001/',
          signupLink: 'http://localhost:3001/'
        }}

        overlayStyle={{ 
            width: '70%',
            margin: 'auto'
        }}

        comment-titleStyle={{
            fontFamily: "Gill Sans"
        }}
        
        commentData={comments}
        
        onSubmitAction={(data: {|
          userId: string,
          comId: string,
          avatarUrl: string,
          userProfile?: string,
          fullName: string,
          text: string,
          replies: any,
          commentId: string
          |}) => {
            console.log('parent comment, ', data)
            // forceUpdate();
          }
        }

        onReplyAction={(data: {|
          userId: string,
          comId: string,
          avatarUrl: string,
          userProfile?: string,
          fullName: string,
          text: string,
          replies: any,
          commentId: string
          |}) => {
            console.log('reply comment, ', data)
          }
        }

        currentData={(data: any) => {
          console.log('curent data', data)
          // console.log('comments here', comments)
        }}
      />
    </div>
    
  );
}

export default Comments;