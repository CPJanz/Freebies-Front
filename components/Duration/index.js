import React, { Component } from "react";
import { Text } from "native-base";

export default class Duration extends Component {
  state = {
    timeLeft: this.props.timeLeft
  };

  componentDidMount = () => {
    console.log(this.state.timeLeft);
    this.intervalId = setInterval(() => this.tick(), 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  tick() {
    this.setState(function(prevState) {
      return { timeLeft: prevState.timeLeft - 1000 };
    });
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
    return <Text>{this.formatTime(this.state.timeLeft)}</Text>;
  }
}
