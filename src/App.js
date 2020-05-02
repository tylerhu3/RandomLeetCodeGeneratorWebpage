import React, { Component } from "react";
import logo from "./x.png";
import "./App.css";
import jsonData from "./data2.json";
/**
 * 
below is how we can inject html code into our webpage:

const x = "<h1> Big PP Boi </h1>";
<div dangerouslySetInnerHTML={{ __html: x }} />

Notice that we can take the string we made above and simple
paste it into the div tag with dangerouslySetInnerHTML.
This is dangerous because of what can happen but because
only we can use this, it should be ok. 

*/

class App extends Component {
  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  state = {
    easy: [],
    medium: [],
    hard: [],
    rotate: true,
    theProblem: null,
  };

  componentDidMount() {
    let easy = [];
    let medium = [];
    let hard = [];

    jsonData.forEach((x) => {
      if (x.diff === "Easy") {
        easy.push(x);
      } else if (x.diff === "Medium") {
        medium.push(x);
      } else {
        hard.push(x);
      }
    });
    let x = this.getRandomInt(jsonData.length);

    let prob = jsonData[x];

    console.log("easy", easy);
    console.log("Medum ", medium);
    console.log("hard ", hard);

    this.setState({ theProblem: prob, easy: easy, medium: medium, hard: hard });
  }

  random = () => {
    let x = this.getRandomInt(jsonData.length);
    let prob = jsonData[x];
    this.setState({ theProblem: prob });
  };

  randomEasy = () => {
    let x = this.getRandomInt(this.state.easy.length);
    let prob = this.state.easy[x];
    this.setState({ theProblem: prob });
  };

  randomMed = () => {
    let x = this.getRandomInt(this.state.medium.length);
    let prob = this.state.medium[x];
    this.setState({ theProblem: prob });
  };

  randomHard = () => {
    let x = this.getRandomInt(this.state.hard.length);
    let prob = this.state.hard[x];
    this.setState({ theProblem: prob });
  };

  render() {
    // setTimeout ( ()=>{console.log("ranran");this.setState({rotate:false})}, 2000 );
    if (this.state.theProblem === null) {
      console.log("nonono");
      return <div />;
    }
    console.log(jsonData);
    let problem = this.state.theProblem;
    console.log(problem);
    return (
      <div className="App">
        <div className="App-header">
          <img
            src={logo}
            className={this.state.rotate ? "App-logo" : ""}
            alt="logo"
          />
        </div>
        <a className="links" target="_blank" href={problem.url}>
          {" "}
          <span>{problem.num + " " + problem.title + " " + problem.diff}</span>
        </a>

      </div>
    );
  }
}

export default App;
