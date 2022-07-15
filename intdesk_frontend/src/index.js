// // import { DatePicker } from 'antd';
// // import ReactDOM from 'react-dom';

// // ReactDOM.render(<DatePicker />, document.getElementById('root'));


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./Home";
import QuestionIndividual from "./QuestionIndividual";
import Questions from "./Questions";
import reportWebVitals from './reportWebVitals';
import ErrorPage from "./ErrorPage";
import Navbar from "./navbar";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";

import Problems from "./Problems";
import ProblemIndividual from "./ProblemIndividual"

import Assessments from "./Assessments";
import AssessQues from "./assess_ques";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/questions" element={<Questions/>}/>
      <Route exact path="/q" element={<QuestionIndividual/>}/>

      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/signup" element={<Register/>}/>
      <Route exact path="/profile" element={<Profile/>}/>

      <Route exact path="/assessments" element={<Assessments/>}/>
      <Route exact path="/assessments/assess_ques/:id" element={<AssessQues />}/>

      <Route exact path="/problems" element={<Problems/>}/>
      <Route exact path="/problem/:id" element={<ProblemIndividual />}/>
      <Route path="*" element={<ErrorPage />}/>

      
    </Routes>
</Router>,
  // <Router>
  //      <Routes >
	// 	      <Route exact path="/" component={App}/>
	// 			  <Route exact path="/questions" component={Questions}/>
	//     </Routes >
  //   </Router>,
  // <React.StrictMode>
  //   <App />
  //   <Questions />
  // </React.StrictMode>,
  rootElement
);

reportWebVitals();
