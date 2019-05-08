//this is the find item card component

import React, { Component } from "react";
import Map from "../Map";
import ItemImage from "../ItemImage";
import DistanceHud from "../DistanceHud";

import { Card, CardItem, Text, Body, View, Input } from "native-base";
import API from "../../utils/API";
import TakeButton from "../TakeButton";
import Duration from "../Duration";

export default class ItemCard extends Component {
  state = {
    available: this.props.available
  };

  takeItem = async () => {
    var response = await API.takeItem(this.props.id, !this.state.available);
    if (response.status == 200) {
      this.setState({ available: response.data.available });
      this.forceUpdate();
    } else {
      console.log("RESPONSE DATA");
      console.log(response.data);
    }
  };

  formatElement = input => {
    switch (input.type) {
      case "DistanceHud":
        return (
          <DistanceHud
            distanceInfo={input.distanceInfo}
            available={this.state.available}
            onPress={this.takeItem}
          />
        );
      case "Map":
        return <Map location={input.location} />;
      case "Duration":
        return <Duration timeLeft={input.timeLeft} />;
      //     let displayString;
      //     const SECONDS = 1000;
      //     const MINUTES = 60 * SECONDS;
      //     const HOURS = 60 * MINUTES;
      //     const DAYS = 24 * HOURS;
      //     if (Math.floor(input.timeLeft / DAYS)) {
      //       displayString =
      //         Math.floor(input.timeLeft / DAYS) +
      //         "d " +
      //         Math.floor((input.timeLeft % DAYS) / HOURS) +
      //         "h";
      //     } else if (Math.floor(input.timeLeft / HOURS)) {
      //       displayString =
      //         Math.floor(input.timeLeft / HOURS) +
      //         "h " +
      //         Math.floor((input.timeLeft % HOURS) / MINUTES) +
      //         "m";
      //     } else {
      //       displayString =
      //         Math.floor(input.timeLeft / MINUTES) +
      //         "m " +
      //         Math.floor((input.timeLeft % MINUTES) / SECONDS) +
      //         "s ";
      //     }
      //     return <Text>{displayString}</Text>;
      case "Take":
        return (
          <TakeButton
            onPress={this.takeItem}
            available={this.state.available}
          />
        );
      case "Repost":
        return <Text>REPOST</Text>;
      case "None":
        return null;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Card style={{ marginTop: 5 }}>
          <CardItem>
            <Body>
              <ItemImage images={this.props.images} />
              <CardItem
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "rgba(255,255,255,.5)",
                  borderRadius: 0,
                  borderBottomRightRadius: "50%"
                }}
              >
                {this.formatElement(this.props.topLeft)}
              </CardItem>
              <CardItem
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "rgba(255,255,255,.5)",
                  borderRadius: 0,
                  borderBottomLeftRadius: "50%"
                }}
              >
                {this.formatElement(this.props.topRight)}
              </CardItem>
              {this.props.textBody ? (
                <CardItem
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(255,255,255,.5)",
                    width: "100%"
                  }}
                >
                  <Text>{this.props.textBody}</Text>
                </CardItem>
              ) : null}
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}
