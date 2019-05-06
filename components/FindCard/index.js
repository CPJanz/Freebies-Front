//this is the find item card component

import React, { Component } from "react";
import { Image } from "react-native";
import Map from "../Map";
import ItemImage from "../ItemImage";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Body,
  Right,
  View
} from "native-base";
import SnapCarousel from "../SnapCarousel/SnapCarousel";
import API from "../../utils/API";
import { ScrollView } from "react-native-gesture-handler";

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
            <Button transparent textStyle={{ color: "#87838B" }}>
              <Icon name="logo-github" />
              <Text>{this.props.distanceInfo.distance}</Text>
            </Button>
            {this.props.distanceInfo.showTaken === true && (
              <Button onPress={this.handlePress}>
                <Text> {this.state.taken ? "Take It!" : "Un Take It!"}</Text>
              </Button>
            )}
            <Map location={this.props.location} />
          </CardItem>
          <CardItem>
            <Body>
              <ItemImage images={this.props.images} />
              <Text>{this.props.textBody}</Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}
