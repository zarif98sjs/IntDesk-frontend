import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Login from "./LogIn";
import Logout from "./LogOut";
import Register from "./Register";
import reportWebVitals from "./reportWebVitals";

import ProblemIndividual from "./Problems/ProblemIndividual";
import ProblemMine from "./Problems/ProblemMine";
import ProblemNew from "./Problems/ProblemNew";
import ProblemResult from "./Problems/ProblemResult";

import Problems from "./Problems/Problems";
import ProblemSubmissions from "./Problems/ProblemSubmissions";

import AssessEdit from "./Assessments/AssessEdit";
import Assessments from "./Assessments/Assessments";
import AssessmentsMine from "./Assessments/AssessmentsMine";
import AssessmentsQues from "./Assessments/AssessQues";
import AssessQuesForm from "./Assessments/AssessQuesForm";
import AssessResult from "./Assessments/assessResult";
import AssessDetails from "./Assessments/assess_details";
import AssessForm from "./Assessments/assess_form";

import Populate from "./Assessments/data_populate";

import DiscussionIndividual from "./Discussions/DiscussionIndividual";
import Discussions from "./Discussions/Discussions";
import DiscussionsMine from "./Discussions/DiscussionsMine";
import DiscussionsNew from "./Discussions/DiscussionsNew";

import DiscussionsGeneral from "./Discussions/DiscussionsGeneral";
import Profile from "./Profile/Profile";
import ProfileEdit from "./Profile/ProfileEdit";
import ProfileGeneral from "./Profile/ProfileGeneral";

const rootElement = document.getElementById("root");

class Doc extends React.Component {
  componentDidMount() {
    document.title = "IntDesk";
  }

  render() {
    return <div />;
  }
}
ReactDOM.render(
  <Router>
    <Doc />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/discussions" element={<Discussions />} />
      <Route exact path="/discussion/:id" element={<DiscussionIndividual />} />
      <Route exact path="/discussion/new" element={<DiscussionsNew />} />
      <Route exact path="/mydiscussions" element={<DiscussionsMine />} />
      <Route exact path="/discussions/:username" element={<DiscussionsGeneral />} />

      <Route exact path="/login" element={<Login />} />
      <Route exact path="/logout" element={<Logout />} />
      <Route exact path="/signup" element={<Register />} />

      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/profile_edit" element={<ProfileEdit />} />
      <Route exact path="/profile/:username" element={<ProfileGeneral />} />

      <Route exact path="/assessments" element={<Assessments />} />
      <Route exact path="/assessments/:id" element={<AssessDetails />} />
      <Route
        exact
        path="/assessments/:id/assess_ques"
        element={<AssessmentsQues />}/>
      <Route exact path="/assessments/:id/assess_result" element={<AssessResult />} />
      <Route exact path="/myassessments" element={<AssessmentsMine />} />
      <Route
        exact
        path="/assessments/:id/assess_ques_new"
        element={<AssessQuesForm />}
      />
      <Route exact path="/assessments/assess_new" element={<AssessForm />} />
      <Route exact path="/assessments/:id/assess_edit" element={<AssessEdit />} />

      <Route exact path="/assessments/populate" element={<Populate />} />

      <Route exact path="/problems" element={<Problems />} />
      <Route
        exact
        path="/problems/problem/:id"
        element={<ProblemIndividual />}
      />
      <Route exact path="/problems/new" element={<ProblemNew />} />
      <Route exact path="/problems/problem/:id/edit" element={<ProblemNew />} />
      <Route exact path="/problems/problem/:id/result" element={<ProblemResult />} />
      <Route exact path="/problems/problem/:id/submissions" element={<ProblemSubmissions />} />
      <Route exact path="/myproblems" element={<ProblemMine />} />

      <Route path="/error" element={<ErrorPage />} />

      <Route path="*" element={<ErrorPage />} />

    </Routes>
  </Router>,
  rootElement
);

reportWebVitals();
