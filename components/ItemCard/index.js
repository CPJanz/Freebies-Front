//this is the find item card component

import React, { Component } from "react";
import Map from "../Map";
import ItemImage from "../ItemImage";
import DistanceHud from "../DistanceHud";

import { Card, CardItem, Text, Body, View } from "native-base";
import API from "../../utils/API";
import TakeButton from "../TakeButton";
import Duration from "../Duration";
import RepostButton from "../RepostButton";

export default class ItemCard extends Component {
  state = {
    available: this.props.available
  };

  componentDidMount = () => {
    console.log("Mounted!");
  };
  takeItem = async () => {
    var response = await API.takeItem(this.props.id, !this.state.available);
    if (response.status === 200) {
      this.setState({ available: response.data.available });
      this.forceUpdate();
    } else {
      console.log("RESPONSE DATA");
      console.log(response.data);
    }
    this.props.reload();
  };

  repostItem = async () => {
    var response = await API.itemRepost(this.props.id);
    if (response.status === 200) {
      this.setState({ available: true });
      this.forceUpdate();
    } else {
      console.log("RESPONSE DATA");
      console.log(response.data);
    }
    this.props.reload();
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
      case "Take":
        return (
          <TakeButton
            onPress={this.takeItem}
            available={this.state.available}
          />
        );
      case "Repost":
        return <RepostButton onPress={this.repostItem} />;
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
