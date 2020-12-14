import axios from "axios";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import * as SurveyJS from "survey-react";
import "survey-react/modern.css";
import questions from "./questions.js";

import Userfront from "@userfront/react";

Userfront.init("5xbpy4nz");
const SignupForm = Userfront.build({
  toolId: "mnbrak",
});
const LoginForm = Userfront.build({
  toolId: "nadrrd",
});
const isLoggedIn = () => !!Userfront.accessToken();

SurveyJS.StylesManager.applyTheme("modern");
const survey = new SurveyJS.Model(questions);
survey.onComplete.add((result) => {
  axios.post("http://localhost:5000/survey-responses", {
    data: result.data,
  });
});

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand bg-white py-4 shadow">
          <div className="container">
            <NavLink exact to="/" className="btn btn-outline-primary mr-4">
              survey.dev
            </NavLink>

            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to="/survey" className="nav-link">
                  Survey
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/results" className="nav-link">
                  Results
                </NavLink>
              </li>
            </ul>
            <AuthButtons />
          </div>
        </nav>

        <div>
          <Switch>
            <Route path="/results">
              <Results />
            </Route>
            <Route path="/survey">
              <Survey />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

function Landing() {
  return <div className="container">Landing</div>;
}

function Survey() {
  return (
    <div className="container">
      <SurveyJS.Survey model={survey} />
    </div>
  );
}

function Results() {
  return <div className="container">Results</div>;
}

function Signup() {
  return (
    <div className="container py-5">
      <SignupForm />
    </div>
  );
}

function Login() {
  return (
    <div className="container py-5">
      <LoginForm />
    </div>
  );
}

function AuthButtons() {
  if (Userfront.accessToken()) {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button className="btn btn-link nav-link" onClick={Userfront.logout}>
            Logout
          </button>
        </li>
      </ul>
    );
  } else {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </ul>
    );
  }
}
