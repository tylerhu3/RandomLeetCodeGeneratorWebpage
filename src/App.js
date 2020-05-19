import React from "react";
import "./App.css";
import jsonData from "./data2.json";
import Particles from 'react-particles-js';

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
    // this.vantaEffect = HALO({
    //   el: this.vantaRef.current,
    //   THREE: THREE,
    // });

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
    return (
      <div>
        <div id="particles-js">
          <h3>SAD </h3>
        <a  target="_blank" href={(problem) ? problem.url: ""}>
          <span>{(problem) ? (problem.num + " " + problem.title + " " + problem.diff): ""}</span>
        </a>
        </div>
        {this.particles0()}
      </div>
    );
  }


  particles0 = () => {
    return(
      <Particles
    params={{
	    "particles": {
	        "number": {
	            "value": 160,
	            "density": {
	                "enable": false
	            }
	        },
	        "size": {
	            "value": 3,
	            "random": true,
	            "anim": {
	                "speed": 4,
	                "size_min": 0.3
	            }
	        },
	        "line_linked": {
	            "enable": false
	        },
	        "move": {
	            "random": true,
	            "speed": 1,
	            "direction": "top",
	            "out_mode": "out"
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "bubble"
	            },
	            "onclick": {
	                "enable": true,
	                "mode": "repulse"
	            }
	        },
	        "modes": {
	            "bubble": {
	                "distance": 250,
	                "duration": 2,
	                "size": 0,
	                "opacity": 0
	            },
	            "repulse": {
	                "distance": 400,
	                "duration": 4
	            }
	        }
	    }
	}} />
    )
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
