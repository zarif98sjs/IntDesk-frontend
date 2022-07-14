import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import QuestionIndividual from "./QuestionIndividual";
import Questions from "./Questions";
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/questions" element={<Questions/>}/>
      <Route exact path="/question/:id" element={<QuestionIndividual/>}/>
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