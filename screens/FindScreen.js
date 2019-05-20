//this code creates the FIND page

import React, { Component } from "react";
import { Container, Content, Text, View } from "native-base";
import API from "../utils/API";
const haversine = require("haversine-js");
import ItemCard from "../components/ItemCard";
import EmptyListMessage from "../components/EmptyListMessage";
import { AsyncStorage, ActivityIndicator, RefreshControl, FlatList } from "react-native";
import AppNameHeader from "../components/AppNameHeader";

export default class FindScreen extends Component {
  state = {
    nearbyItems: null,
    location: null,
    userId: null,
    refreshing: true
  };
  //Takes in an itemLocation (format: {latitude: 42, longitude: -112}) and compares it to the passed prop location (of the same format).
  calculateDistance = itemLocation => {
    const itemLocationInfo = {
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

  //Grab current client position then use that to query the database for nearby items, finally set the state with the nearbyItems and location.
  async fetchItems() {
    navigator.geolocation.getCurrentPosition(position => {
      API.getNearbyItems(position.coords)
        .then(items => {
          if (items) {
            this.setState({
              nearbyItems: items.data,
              location: position.coords,
              refreshing: false
            });
          } else {
            this.setState({
              location: position.coords,
              refreshing: false
            });
          }
        })
        .catch(err => console.log(err));
      this.asyncGetUser();
    });
  }

  async componentDidMount() {
    if (!this.focusListener) {
      this.focusListener = this.props.navigation.addListener(
        "willFocus",
        () => {
          this.fetchItems();
        }
      );
    }
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _onRefresh = () => {
    console.log("Refreshing Find Screen.");
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
      <Container style={{ backgroundColor: "#C2DFE3" }}>
        <AppNameHeader />
        {//This is a check to ensure that we have gotten a call back from the db
        this.state.refreshing ? (
          //loading view while data is loading
          <View style={{ flex: 1, paddingTop: 20 }}>
            <ActivityIndicator />
          </View>
        ) : !this.state.nearbyItems ? (
          // Got a response back but don't have any nearby items.
          <EmptyListMessage
            topPadding={200}
            message={"No Nearby Items Found"}
          />
        ) : (
          // Got a response back and have nearby items.
          <Content
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
          <FlatList 
              data={this.state.nearbyItems}
              keyExtractor={data => data._id}
              renderItem={({ item }) => (
                <ItemCard
                  available={item.available}
                  textBody={item.description}
                  topLeft={{
                    type: "DistanceHud",
                    distanceInfo: this.calculateDistance(item.location)
                  }}
                  topRight={{ type: "Map", location: item.location }}
                  images={item.images}
                  location={item.location}
                  id={item._id}
                  active={true}
                />
              )}
            />
          </Content>
        )}
      </Container>
    );
  }
}
