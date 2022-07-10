import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'

function Comments(){
  const data =[
    {
      userId: '02b',
      comId: '017',
      fullName: 'Mashiat',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'I think you have a point🤔',
      avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
      replies: []
    }
  ]
  return <CommentSection
        currentUser={{
          currentUserId: '01a',
          currentUserImg:
            'https://ui-avatars.com/api/name=Riya&background=random',
          currentUserProfile:
            'https://www.linkedin.com/in/riya-negi-8879631a9/',
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
        
        commentData={data}
        onSubmitAction={(data: {|
          userId: string,
          comId: string,
          avatarUrl: string,
          userProfile?: string,
          fullName: string,
          text: string,
          replies: any,
          commentId: string
        |}) => console.log('check submit, ', data)}
        currentData={(data: any) => {
          console.log('curent data', data)
        }}
      />
}

export default Comments;