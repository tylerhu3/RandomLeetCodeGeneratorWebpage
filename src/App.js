import React from "react";
import "./App.css";
import jsonData from "./data2.json";
import { Button } from "react-bootstrap";

class App extends React.Component {
  state = {
    easy: [],
    medium: [],
    hard: [],
    theProblem: null,
  };

  // constructor() {
  //   super();
  //   // this.vantaRef = React.createRef();
  // }

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

    let index = this.getRandomInt(jsonData.length);
    let prob = jsonData[index];
    this.setState({ theProblem: prob, easy: easy, medium: medium, hard: hard });
  }

  componentWillUnmount() {
    // if (this.vantaEffect) {
    //   this.vantaEffect.destroy();
    // }
  }

  openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  AnimatedTypingComponent = () => (
    <div
      
      onClick={() => this.openInNewTab(this.state.theProblem.url)}
    >
        <h1>
          {" "}
          {this.state.theProblem
            ? this.state.theProblem.title
            : ""}{" "}
        </h1>
    </div>
  );

  render() {
    // console.log(jsonData);
    let problem = this.state.theProblem;
    return (
      <div className={"App"}>

        <div className={"mainContent"} >
        <h1 style={this.problemTitleStyle} >
          {" "}
          {this.state.theProblem
            ? this.state.theProblem.title
            : ""}{" "}
        </h1>
          <div style={this.buttonContainer}>
            <Button
              style={this.buttonStyle}
              size="lg"
              variant="primary"
              onClick={() => this.openInNewTab(problem.url)}
            >
              Try
            </Button>
            <Button
              style={this.buttonStyle}
              variant="info"
              onClick={this.random}
            >
              New Question{" "}
            </Button>

          </div>
        </div>
      </div>
    );
  }

  difficultyButtons = () => {
    return(
      <div>
                    <Button
              style={this.buttonStyle}
              variant="success"
              onClick={this.randomEasy}
            >
              New Easy Question{" "}
            </Button>
            <Button
              style={this.buttonStyle}
              variant="warning"
              onClick={this.randomMed}
            >
              New Medium Question{" "}
            </Button>
            <Button
              style={this.buttonStyle}
              variant="danger"
              onClick={this.randomHard}
            >
              New Hard Question{" "}
            </Button>
      </div>
    )    
  }

  problemTitleStyle = {
    position: 'relative',
    textShadow: '2px 2px 5px white',
    marginTop: '2em',
    fontSize: '60px',
    fontWeight: 'bold',
    color: 'black',
    fontFamily: "Pangolin",
    width:'auto',
    overflow: 'hidden', /* Ensures the content is not revealed until the animation */
    borderRight: '0.05em solid', /* The typwriter cursor */
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap', /* Keeps the content on a single line */
    animation: 'typing 3s steps(100, end), blink-caret 0.5s step-end infinite',
  }

  miscButtonStyle = {
    position: "relative",
    right: 0,
    bottom: 0,
  };

  buttonContainer = {
    marginTop: "300px",

    position: "absolute",
    zIndex: "2"

  };

  buttonStyle = {
    margin: "10px",
  };

  divStyle = {
    position: "relative",
    zIndex: "1",
    left: 0,
  };


  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

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
}

export default App;
