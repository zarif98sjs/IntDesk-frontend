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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import Questions from "./Questions";
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/questions" element={<Questions/>}/>
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