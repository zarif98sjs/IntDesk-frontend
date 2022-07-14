import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'

function Comments({comments}){
  
  return <CommentSection
        currentUser={{
          currentUserId: '01a',
          currentUserImg:
            'https://ui-avatars.com/api/name=Riya&background=random',
          currentUserProfile:
            'https://www.linkedin.com/in/',
          currentUserFullName: 'Ramisa'
        }}
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
          console.log('comments', comments)
        }}
      />
}

export default Comments;