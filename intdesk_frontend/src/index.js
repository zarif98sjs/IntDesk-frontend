import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Login from "./login";
import Logout from "./LogOut";
import Profile from "./profile";
import QuestionIndividual from "./QuestionIndividual";
import QuestionNew from "./QuestionNew";
import Questions from "./Questions";
import Register from "./register";
import reportWebVitals from './reportWebVitals';

import ProblemIndividual from "./Problems/ProblemIndividual";
import ProblemNew from "./Problems/ProblemNew";
import Problems from "./Problems/Problems";
// import ProblemResult from './Problems/ProblemResult';

import Assessments from "./Assessments";
import AssessDetails from './assess_details';
import AssessQues from "./assess_ques";
import AssessQuesForm from './AssessQuesForm';

import QuestionsMine from './QuestionsMine';



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
      <Route exact path="/questions" element={<Questions/>}/>
      <Route exact path="/question/:id" element={<QuestionIndividual/>}/>
      <Route exact path="/question/new" element={<QuestionNew/>}/>
      <Route exact path="/myq" element={<QuestionsMine/>}/>

      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/logout" element={<Logout/>}/>
      <Route exact path="/signup" element={<Register/>}/>
      <Route exact path="/profile" element={<Profile/>}/>

      <Route exact path="/assessments" element={<Assessments/>}/>
      <Route exact path="/assessments/:id" element={<AssessDetails/>}/>
      <Route exact path="/assessments/:id/assess_ques" element={<AssessQues />}/>
      <Route exact path="/assessments/:id/assess_ques_new" element={<AssessQuesForm />}/>

      <Route exact path="/problems" element={<Problems/>}/>
      <Route exact path="/problems/problem/:id" element={<ProblemIndividual />}/>
      <Route exact path="/problems/new" element={<ProblemNew />}/>
      <Route exact path="/problems/problem/:id/edit" element={<ProblemNew />} />
      {/* <Route exact path="/problems/problem/:id/result" element={<ProblemResult />} /> */}
      <Route path="*" element={<ErrorPage />}/>

    </Routes>
</Router>,
  rootElement
);

reportWebVitals();
