//this is the find item card component

import React, { Component } from "react";
import Map from "../Map";
import ItemImage from "../ItemImage";
import DistanceHud from "../DistanceHud";

import { Card, CardItem, Text, Body, View } from "native-base";
import API from "../../utils/API";

export default class FindCard extends Component {
  state = {
    taken: !this.props.availible
  };

  handlePress = async () => {
    var response = await API.takeItem(this.props.id, !this.state.taken);

    if (response.status == 200) {
      this.setState({ taken: response.data.available });
    } else {
      console.log(response.data);
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
                <DistanceHud
                  distanceInfo={this.props.distanceInfo}
                  taken={this.state.taken}
                  onPress={this.handlePress}
                />
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
                <Map location={this.props.location} />
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
