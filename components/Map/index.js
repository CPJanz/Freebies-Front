import React, { Component } from "react";
import { Text } from "react-native";
import { Button } from "native-base";
import openMap from "react-native-open-maps";

export default class Map extends Component {
  _goToMaps = () => {
    openMap({ ...this.props.location, query: "Find Me Here!" });
  };

  render() {
    return (
      <Button
        transparent
        // style={{ flexDirection: "column", flex: 1, justifyContent: "center" }}
        onPress={this._goToMaps}
      >
        <Text style={{ fontSize: 30, marginTop: -10 }}>🗺</Text>
      </Button>
    );
  }
}
