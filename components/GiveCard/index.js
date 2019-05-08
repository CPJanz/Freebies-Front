//this is the give item card component

import React, { Component } from "react";
import style from "./style.js";
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
  StyleSheet
} from "native-base";
import ItemImage from "../ItemImage/index.js";

export default class GiveCard extends Component {
  render() {
    return (
      <Card style={{ marginTop: 50 }}>
        <CardItem>
          <Body>
            <ItemImage
              images={
                this.props.images || ["https://picsum.photos/id/499/340/300"]
              }
            />
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
              {this.props.topRight}
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
    );
  }
}
