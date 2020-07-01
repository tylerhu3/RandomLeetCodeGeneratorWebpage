import React from "react";
import "./App.css";
import * as THREE from "three";
import HALO from "./vanta.cells.min.js";
import jsonData from "./data2.json";
import ReactTypingEffect from "react-typing-effect";
import "./_buttons.scss";

class App extends React.Component {
  state = {
    easy: [],
    medium: [],
    hard: [],
    theProblem: null,
    effectsOn: false,
  };

  constructor() {
    super();
    this.vantaRef = React.createRef();
  }

  componentDidMount() {
    this.vantaEffect = HALO({
      el: this.vantaRef.current,
      THREE: THREE,
    });
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

  componentWillUnmount() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }

  render() {
    // console.log(jsonData);
    let problem = this.state.theProblem;
    // console.log(problem);
    return (
      <div className="App" ref={this.vantaRef}>
        <div onClick={this.randomEasy} className="box">
          <a href="#" className="btn btn-white btn-animation-1">
            Easy Question
          </a>
        </div>
        {/* <button
          onClick={() => {
            if (this.vantaEffect) {
              this.vantaEffect.destroy();
            }
          }}
        >
          {" "}
          Destroy Effect{" "}
        </button> */}

        <div className="center-screen leetFont">
          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            href={problem ? problem.url : ""}
          >
            <ReactTypingEffect
              text={
                problem
                  ? problem.num + " " + problem.title + " " + problem.diff
                  : ""
              } //text=["Hello.", "World!"]
            />
          </a>
        </div>
      </div>
    );
  }

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
