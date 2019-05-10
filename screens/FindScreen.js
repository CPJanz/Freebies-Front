//this code creates the FIND page

import React, { Component } from "react";
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

import {
  AsyncStorage,
  ActivityIndicator,
  RefreshControl,
  Image
} from "react-native";

import AppNameHeader from "../components/AppNameHeader";


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
          } else {
            this.setState({
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
      <Container style={{ backgroundColor: "#C2DFE3" }}>
      <AppNameHeader />
      {
      //This is a check to ensure that we have gotten a call back from the db
      this.state.refreshing ? (
        //loading view while data is loading
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      ) : !this.state.nearbyItems ? (
        // Got a response back but don't have any nearby items.
        <View
          style={{
            flex: 0.2,
            // flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 200
          }}
        >
          <Text style={{ fontSize: 25, paddingBottom: 100 }}>
            {"No Nearby Items Found"}
          </Text>
          <Image
            source={require("../assets/images/bee.png")}
            style={{ width: 125, height: 125 }}
          />
        </View>
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
            {this.state.nearbyItems.map((data, i) => {
              //for bug fixing only
              if (!data) {
                return <Text>no data</Text>;
              } else
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
        
      )}
      </Container>
    );
  }
}
