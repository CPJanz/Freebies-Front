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
    location: null
  };
  //Takes in an itemLocation (format: {latitude: 42, longitude: -112}) and compares it to the passed prop location (of the same format).
  calculateDistance = itemLocation => {
    const unformatted = haversine(itemLocation, this.state.location);
    if (unformatted > 0.1) {
      return unformatted.toPrecision(2) + "Mi.";
    } else {
      return "Close!";
      // return unformatted.toPrecision(2);
    }
  };

  componentDidMount() {
    //Grab current client position then use that to query the database for nearby items, finally set the state with the nearbyItems and location.
    navigator.geolocation.getCurrentPosition(position => {
      API.getNearbyItems(position.coords)
        .then(items => {
          this.setState({ nearbyItems: items.data, location: position.coords });
        })
        .catch(err => console.log(err));
    });
  }

  logOut = function() {
    console.log("clicked");
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
          <Button onPress={this.logOut}>
            <Text>Log Out</Text>
          </Button>
          <Content>
            {this.state.nearbyItems.map((data, i) => {
              return (
                <FindCard
                  key={i}
                  textBody={data.description}
                  distance={this.calculateDistance(data.location)}
                  images={data.images}
                  location={data.location}
                />
              );
            })}
          </Content>
        </Container>
      )
    );
  }
}
