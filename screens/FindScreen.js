//this code creates the FIND page

import React, { Component } from "react";
import FindCard from "../components/FindCard.js";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  View
} from "native-base";
import API from "../utils/API";
const haversine = require("haversine-js");
import { AsyncStorage } from "react-native";

export default class FindScreen extends Component {
  state = {
    nearbyItems: null,
    location: null,
    userId: null
  };
  //Takes in an itemLocation (format: {latitude: 42, longitude: -112}) and compares it to the passed prop location (of the same format).
  calculateDistance = itemLocation => {
    var itemLocationInfo = {
      distance: "",
      showTaken: false
    }
    
    const distanceToItem = haversine(itemLocation, this.state.location);
    if (distanceToItem > 0.1) {
      itemLocationInfo.distance = distanceToItem.toPrecision(2) + "Mi.";
      itemLocationInfo.showTaken = false;
    } else {
      itemLocationInfo.distance =  "Close!";
      itemLocationInfo.showTaken = true;
    }

    return itemLocationInfo;
  };

  componentDidMount() {
    //Grab current client position then use that to query the database for nearby items, finally set the state with the nearbyItems and location.
    navigator.geolocation.getCurrentPosition(position => {
      API.getNearbyItems(position.coords)
        .then(items => {
          this.setState({ nearbyItems: items.data, location: position.coords });
        })
        .catch(err => console.log(err));
      this.asyncGetUser();
    });
  }

  async asyncGetUser() {
    const result = await AsyncStorage.getItem("userToken");
    this.setState({ userId: result });
  }

  logOut = function() {
    AsyncStorage.setItem("userToken", "");
  };

  render() {
    return (
      //This is a check to ensure that we have gotten a call back from the db
      !this.state.nearbyItems ? (
        // Haven't gotten a response yet.
        <Text>{"loading"}</Text>
      ) : this.state.nearbyItems.length === 0 ? (
        // Got a response back but don't have any nearby items.
        <Text>{"No Results"}</Text>
      ) : (
        // Got a response back and have nearby items.
        <Container>
          {/* DEBUG ELEMENT REMOVE BEFORE MDP */}
          <Text>
            {"Lat: " +
              this.state.location.latitude.toPrecision(8) +
              " Long: " +
              this.state.location.longitude.toPrecision(8)}
          </Text>
          <Text>Account: {this.state.userId}</Text>
          <Button onPress={this.logOut}>
            <Text>Log Out</Text>
          </Button>
          <Content>
            {this.state.nearbyItems.map((data, i) => {
              return (
                <FindCard
                  key={i}
                  textBody={data.description}
                  distanceInfo={this.calculateDistance(data.location)}
                  availible={data.availible}
                  images={data.images}
                  location={data.location}
                  id={data._id}
                />
              );
              
            })}
            
          </Content>
        </Container>
      )
    );
  }
}
