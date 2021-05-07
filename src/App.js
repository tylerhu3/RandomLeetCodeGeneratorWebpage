import React from "react";
import "./App.css";
import jsonData from "./data2.json";
import Particles from "react-particles-js";
import { Button } from "react-bootstrap";
import Typing from "react-typing-animation";

class App extends React.Component {
  state = {
    easy: [],
    medium: [],
    hard: [],
    theProblem: null,
  };

  constructor() {
    super();
    // this.vantaRef = React.createRef();
  }

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
      style={{ width: "100%",  textShadow: '2px 2px 4px #000000',
      color: "white", fontSize: "290%" }}
      onClick={() => this.openInNewTab(this.state.theProblem.url)}
    >
      <Typing
        key={new Date().getTime()} //force a component re-render
      >
        <span >
          {" "}
          {this.state.theProblem
            ? this.state.theProblem.title + "SSDS"
            : ""}{" "}
        </span>
        <Typing.Backspace count={5} />
      </Typing>
    </div>
  );

  render() {
    // console.log(jsonData);
    let problem = this.state.theProblem;
    return (
      <div className={"App"}>
        {this.particles0()}

        <div className={"mainContent"}>
          {this.AnimatedTypingComponent()}
          <div style={this.contentStyle}>
            <Button
              style={this.buttonStyle}
              size="lg"
              variant="primary"
              onClick={() => this.openInNewTab(problem.url)}
            >
              Try It{" "}
            </Button>
            <Button
              style={this.buttonStyle}
              variant="info"
              onClick={this.random}
            >
              New Question{" "}
            </Button>
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
        </div>
      </div>
    );
  }

  miscButtonStyle = {
    position: "relative",
    right: 0,
    bottom: 0,
  };

  contentStyle = {
    position: "relative",
    zIndex: "2",
  };

  titleStyle = {
    marginBottom: "15px",
  };

  buttonStyle = {
    margin: "10px",
  };

  divStyle = {
    position: "relative",
    zIndex: "1",
    left: 0,

    backgroundImage:
      "url(" +
      "hhttps://www.economist.com/sites/default/files/20171216_blp513.jpg" +
      ")",
  };

  particles0 = () => {
    return (
      <Particles
        className={"particles-js-canvas-el"}
        style={this.divStyle}
        params={{
          particles: {
            number: {
              value: 88,
              density: {
                enable: false,
              },
            },
            size: {
              value: 8,
              random: true,
              anim: {
                speed: 4,
                size_min: 1,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              random: true,
              speed: 1,
              direction: "top",
              out_mode: "out",
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0,
              },
              repulse: {
                distance: 400,
                duration: 4,
              },
            },
          },
        }}
      />
    );
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
