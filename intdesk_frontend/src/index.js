import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Login from "./login";
import Logout from "./LogOut";
import Profile from "./profile";
import Register from "./register";
import reportWebVitals from './reportWebVitals';

import ProblemIndividual from "./Problems/ProblemIndividual";
import ProblemNew from "./Problems/ProblemNew";
import Problems from "./Problems/Problems";
import ProblemResult from "./Problems/ProblemResult";
// import ProblemResult from './Problems/ProblemResult';


import Assessments from "./Assessments/Assessments";
import AssessDetails from './Assessments/assess_details';
import AssessQuesForm from './Assessments/AssessQuesForm';
import AssessmentsQues from './Assessments/AssessQues';
import AssessForm from './Assessments/assess_form';
import AssessmentsMine from './Assessments/AssessmentsMine';


import Populate from './Assessments/data_populate';

import DiscussionIndividual from './Discussions/DiscussionIndividual';
import Discussions from './Discussions/Discussions';
import DiscussionsMine from './Discussions/DiscussionsMine';
import DiscussionsNew from './Discussions/discussionsNew';
import ProfileEdit from './ProfileEdit';
import ProfileGeneral from './ProfileGeneral';



const rootElement = document.getElementById("root");

class Doc extends React.Component{
  componentDidMount(){
    document.title = "IntDesk"
  }

  render(){
    return(        
      <div />
    )
  }
}
ReactDOM.render(
  
  <Router>
    <Doc />
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/discussions" element={<Discussions/>}/>
      <Route exact path="/discussion/:id" element={<DiscussionIndividual/>}/>
      <Route exact path="/discussion/new" element={<DiscussionsNew/>}/>
      <Route exact path="/mydiscussions" element={<DiscussionsMine/>}/>

      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/logout" element={<Logout/>}/>
      <Route exact path="/signup" element={<Register/>}/>
      <Route exact path="/profile" element={<Profile/>}/>
      <Route exact path="/profile_edit" element={<ProfileEdit/>}/>
      <Route exact path="/profile/:username" element={<ProfileGeneral/>}/>

      <Route exact path="/assessments" element={<Assessments/>}/>
      <Route exact path="/assessments/:id" element={<AssessDetails/>}/>
      <Route exact path="/assessments/:id/assess_ques" element={<AssessmentsQues />}/>
      <Route exact path="/myassessments" element={<AssessmentsMine/>}/>
      <Route exact path="/assessments/:id/assess_ques_new" element={<AssessQuesForm />}/>
      <Route exact path="/assessments/assess_new" element={<AssessForm />}/>

      <Route exact path="/assessments/populate" element={<Populate />}/>

      <Route exact path="/problems" element={<Problems/>}/>
      <Route exact path="/problems/problem/:id" element={<ProblemIndividual />}/>
      <Route exact path="/problems/new" element={<ProblemNew />}/>
      <Route exact path="/problems/problem/:id/edit" element={<ProblemNew />} />
      <Route exact path="/problems/problem/:id/result" element={<ProblemResult />} />
      <Route path="*" element={<ErrorPage />}/>

    </Routes>
</Router>,
  rootElement
);

reportWebVitals();

