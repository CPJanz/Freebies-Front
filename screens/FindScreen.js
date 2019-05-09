//this code creates the FIND page

import React, { Component } from "react";
import FindCard from "../components/FindCard";
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
import ItemCard from "../components/ItemCard";
import { AsyncStorage, ActivityIndicator, RefreshControl } from "react-native";

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
    };

    const distanceToItem = haversine(itemLocation, this.state.location);
    if (distanceToItem > 0.1) {
      itemLocationInfo.distance = distanceToItem.toPrecision(2) + "Mi.";
      itemLocationInfo.showTaken = false;
    } else {
      itemLocationInfo.showTaken = true;
    }

    return itemLocationInfo;
  };

  async componentDidMount() {
    //Grab current client position then use that to query the database for nearby items, finally set the state with the nearbyItems and location.
    navigator.geolocation.getCurrentPosition(position => {
      API.getNearbyItems(position.coords)
        .then(items => {
          if (items) {
            this.setState({
              nearbyItems: items.data,
              location: position.coords
            });
          }
        })
        .catch(err => console.log(err));
      this.asyncGetUser();
    });

    if (!this.focusListener) {
      this.focusListener = this.props.navigation.addListener("willFocus", () =>
        this.componentDidMount()
      );
    }
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  };

  async asyncGetUser() {
    const result = await AsyncStorage.getItem("userToken");
    this.setState({ userId: result });
  }

  render() {
    return (
      //This is a check to ensure that we have gotten a call back from the db
      this.state.refreshing || !this.state.nearbyItems ? (
        //loading view while data is loading
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      ) : this.state.nearbyItems.length === 0 ? (
        // Got a response back but don't have any nearby items.
        <Text>{"No Results"}</Text>
      ) : (
        // Got a response back and have nearby items.
        <Container style={{ backgroundColor: "#C2DFE3" }}>
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            {this.state.nearbyItems.map((data, i) => {
              return (
                <ItemCard
                  key={i}
                  available={data.available}
                  textBody={data.description}
                  topLeft={{
                    type: "DistanceHud",
                    distanceInfo: this.calculateDistance(data.location)
                  }}
                  topRight={{ type: "Map", location: data.location }}
                  images={data.images}
                  location={data.location}
                  id={data._id}
                  active={true}
                />
              );
            })}
          </Content>
        </Container>
      )
    );
  }
}
