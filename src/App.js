import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import JoinForm from "./components/JoinForm";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Route path="/" exact component={Home} />
        <Route path="/joinCommunity" component={JoinForm} />
      </Router>
    );
  }
}

export default App;
