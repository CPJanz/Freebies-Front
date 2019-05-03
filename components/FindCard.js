//this is the find item card component

import React, { Component } from "react";
import { Image } from "react-native";
import  Map  from "./Map";

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

export default class FindCard extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
      <Card style={{ marginTop: 5 }}>
        <CardItem>
          <Button transparent textStyle={{ color: "#87838B" }}>
            <Icon name="logo-github" />
            <Text>{this.props.distance}</Text>
          </Button>
          <Map></Map>
        </CardItem>
        <CardItem>
          <Body>
            <Image
              source={{ uri: this.props.images[0] }}
              style={{ height: 200, width: 300, flex: 1 }}
            />
            <Text>{this.props.textBody}</Text>
          </Body>
        </CardItem>
      </Card>
      </View>
    );
  }
}
