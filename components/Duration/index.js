import React, { Component } from "react";
import { Text } from "native-base";

export default class Duration extends Component {
  state = {
    timeLeft: this.props.timeLeft
  };

  componentDidMount = () => {
    this.intervalId = setInterval(() => this.tick(), 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  tick() {
    if (this.state.timeLeft <= 0) {
      this.props.setInactive();
    } else {
      this.setState(function(prevState) {
        return { timeLeft: prevState.timeLeft - 1000 };
      });
    }
  }

  formatTime = time => {
    let displayString;
    const SECONDS = 1000;
    const MINUTES = 60 * SECONDS;
    const HOURS = 60 * MINUTES;
    const DAYS = 24 * HOURS;
    if (Math.floor(time / DAYS)) {
      displayString = "> " + Math.floor(time / DAYS) + "d";
    } else {
      displayString =
        Math.floor(time / HOURS) +
        "h " +
        Math.floor((time % HOURS) / MINUTES) +
        "m " +
        Math.floor((time % MINUTES) / SECONDS) +
        "s";
    }
    return displayString;
  };

  render() {
    return this.state.timeLeft > 0 ? (
      <Text
        style={{
          color: "#ffffff",
          fontWeight: "bold",
          fontSize: 22,
          marginTop: 6,
          textShadowColor: "#424242",
          textShadowOffset: {width: 2, height: 2},
          textShadowRadius: 5
        }}
      >
        {this.formatTime(this.state.timeLeft)}
      </Text>
    ) : (
      <Text
        style={{
          color: "#ffffff",
          fontWeight: "bold",
          fontSize: 22,
          marginTop: 6,
          textShadowColor: "#424242",
          textShadowOffset: {width: 2, height: 2},
          textShadowRadius: 5
        }}
      >
        Expired!
      </Text>
    );
  }
}
