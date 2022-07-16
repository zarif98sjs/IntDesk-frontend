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

import ProblemIndividual from "./ProblemIndividual";
import Problems from "./Problems";

import Assessments from "./Assessments";
import AssessQues from "./assess_ques";



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

      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/logout" element={<Logout/>}/>
      <Route exact path="/signup" element={<Register/>}/>
      <Route exact path="/profile" element={<Profile/>}/>

      <Route exact path="/assessments" element={<Assessments/>}/>
      <Route exact path="/assessments/assess_ques/:id" element={<AssessQues />}/>

      <Route exact path="/problems" element={<Problems/>}/>
      <Route exact path="/problem/:id" element={<ProblemIndividual />}/>
      <Route path="*" element={<ErrorPage />}/>

      
    </Routes>
</Router>,
  rootElement
);

reportWebVitals();
