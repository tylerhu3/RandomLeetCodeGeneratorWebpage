import React from "react";
import "./App.css";
import jsonData from "./data2.json";
import { Button } from "react-bootstrap";
import Typing from "react-typing-animation";
import axios from "axios";

class App extends React.Component {
  state = {
    easy: [],
    medium: [],
    hard: [],
    theProblem: null,
    showDangerModal: false,
    fetchedImage: null,
  };

  // constructor() {
  //   super();
  //   // this.vantaRef = React.createRef();
  // }

  getImagine = () => {
    if (this.state.showDangerModal) {
      this.setState({ showDangerModal: false });
      return;
    }

    axios
      .get(
        "https://ei.phncdn.com/pics/logos/7381.png",
        {
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        let temp = Buffer.from(response.data, "binary").toString("base64");
        console.log("printing pic: " + temp);
        this.setState({ fetchedImage: temp, showDangerModal: true });
      });
  };

  displayImage = () => {
    console.log("execute displayImage");
    if (this.state.showDangerModal) {
      console.log("this.state.fetchedImage: " + this.state.fetchedImage);
      return (
        <div style={this.DangerModal}>
          <img
            id="imgElem"
            alt="Danger Image"
            src={"data:image/jpg;base64," + this.state.fetchedImage}
          />
        </div>
      );
    } else {
      return <div style={this.DangerModal}>Nothing Here</div>;
    }
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
      style={{
        width: "100%",
        textShadow: "4px 4px 4px #FFFFFF",
        color: "black",
        fontSize: "290%",
      }}
      onClick={() => this.openInNewTab(this.state.theProblem.url)}
    >
      <Typing
        hideCursor={false}
        key={new Date().getTime()} //force a component re-render
      >
        <span>
          {" "}
          {this.state.theProblem
            ? this.state.theProblem.title + "What"
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
        {this.displayImage()}
        <div>
          <Button
            style={this.DangerStyle}
            variant="danger"
            onClick={this.dangerResponse}
          >
            DANGER{" "}
          </Button>
        </div>
        <this.videoModal />
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

  DangerStyle = {
    position: "relative",
    right: -1000,
    bottom: 150,
    marginTop: "30px",
    zIndex: "4",
  };

  DangerModal = {
    fontSize: "24px",
    color: "white",
    position: "relative",
    right: -1000,
    bottom: 150,
    marginTop: "30px",
    zIndex: "4",
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

  videoModal = () => {
    return (
      <div
        // style={{
        //   position: "fixed",
        //   top: 0,
        //   bottom: 0,
        //   left: 0,
        //   right: 0,
        //   backgroundColor: "rgba(0,0,0,0.5)",
        // }}
      >
        <iframe
          allowFullScreen
          frameBorder="0"
          height="315px"
          
          src="https://www.youtube.com/embed/tbZ_rF8Xlsc"

          
          width="560px"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="Embedded youtube"
        />
      </div>
    );
  };

  dangerResponse = () => {
    this.getImagine();
  };
}

export default App;
