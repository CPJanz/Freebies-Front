//this is the find item card component

import React, { Component } from "react";
import Map from "../Map";
import ItemImage from "../ItemImage";
import DistanceHud from "../DistanceHud";
import { Ionicons } from '@expo/vector-icons';

import { Card, CardItem, Text, Body, Icon, View, StyleSheet } from "native-base";
import API from "../../utils/API";
import TakeButton from "../TakeButton";
import Duration from "../Duration";
import RepostButton from "../RepostButton";
import styles from "./style";

export default class ItemCard extends Component {
  state = {
    available: this.props.available,
    active: this.props.active
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
        return <Duration timeLeft={input.timeLeft} setInactive={this.setInactive}/>;
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

  activeStatus = () => {
    if (this.state.active) {
      return 1
    } else {
      return 0.2
    };
  };

  setInactive = () => {
    this.setState({ active: false });
  };

  render() {
    return (

      <View style={{ flex: 1 }}>
      {/* this is where changes were made so that there is no border showing around the image */}
        <Card transparent style={{ marginTop: 5 }}>
          <CardItem style={{backgroundColor: "transparent"}}>

            <Body>
              <ItemImage images={this.props.images} opacity={this.activeStatus()} />
              <CardItem 
                style={styles.topLeft}>
              {this.formatElement(this.props.topLeft)}
              <Ionicons name="location" size={22} color="black"/>
              </CardItem> 
              <CardItem
                style={styles.topRight}
              >
                {this.formatElement(this.props.topRight)}
              </CardItem>
              {this.props.textBody ? (
                <CardItem
                  style={styles.bottomBar}
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
