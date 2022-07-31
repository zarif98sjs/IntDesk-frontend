import axios from "axios";
import React, { useEffect, useState } from "react";
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';

function Comments({comments,discussionId}){

  const [user, setUser] = useState([]);
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  let tempUser = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {  
    // DUMMY function, otherwise axios gets removed after cntrl+s -_-
    const fetchUser = async () => {
      await axios.get("http://localhost:8000/users/details/", {
        headers: {
            'Authorization': 'Token'
          }
        })
        .then(res => {
          // console.log(window.$log = res.data);
          console.log("Fetchd user", res.data);
        })
        .catch(err => {
          console.log(err);
        })
    };  

  }, []);

 
  return (
    <div>
    
      <CommentSection
        currentUser={{
          currentUserId: tempUser.id,
          currentUserImg:
            'https://ui-avatars.com/api/name=Riya&background=random',
          currentUserProfile:
            'https://www.linkedin.com/in/',
          currentUserFullName: tempUser.username
        }}

        advancedInput={true}
        
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
            
            // POST 
            let postData = {
              "comment": data.text,
              "hash": data.comId
            }
  
            console.log('postData here', postData)
            console.log('authToken here', authToken)
            axios.post('http://localhost:8000/discussion/'.concat(discussionId).concat('/comment/'), postData ,{headers :{
              'Authorization': 'Token '.concat(authToken.token),
              'Content-Type' : 'application/json'
            }})
            .then(res => {
              console.log(window.$log = res.data);
            })
            .catch(err => {
              console.log(err);
            })
            
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

            let tempPar = null;

            if (data.parentOfRepliedCommentId == null){
              tempPar = data.repliedToCommentId;
            }
            else{
              tempPar = data.parentOfRepliedCommentId;
            }

            console.log(tempPar)

            // POST 
            let postData = {
              "comment": data.text,
              "hash": data.comId,
              "parent" : tempPar
            }

            console.log('postData here', postData)
            axios.post('http://localhost:8000/discussion/'.concat(discussionId).concat('/comment/'), postData ,{headers: {
              'Authorization': 'Token '.concat(authToken.token),
              'Content-Type' : 'application/json'
            }})
            .then(res => {
              console.log(window.$log = res.data);
            })
            .catch(err => {
              console.log(err);
            })

          }
        }

        currentData={(data: any) => {
          console.log('curent data', data)
          console.log('discussion_id here', discussionId)
          
        }}
      />
    </div>
    
  );
}

export default Comments;

