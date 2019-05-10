//this code creates the GIVE page

import React, { Component } from "react";
import { AsyncStorage, ActivityIndicator, RefreshControl } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Body,
  Textarea,
  View,
  Form,
  Item,
  Input
} from "native-base";
import API from "../utils/API";
import ItemCard from "../components/ItemCard";
import AppNameHeader from "../components/AppNameHeader";

//this code renders the Give screen
export default class GiveScreen extends Component {
  state = {
    active: [],
    inactive: [],
    userId: null,
    refreshing: false
  };

  //   when give screen loads, state will set with the user's id, and previously posted items
  componentDidMount = () => {
    this.setUserId();

    if (!this.focusListener) {
      this.focusListener = this.props.navigation.addListener("willFocus", () =>
        this.getPostedItems()
      );
    }
  };

  componentWillUnmount() {
    this.focusListener.remove();
  }

  setUserId = async () => {
    let id = await AsyncStorage.getItem("userToken");
    this.setState({
      userId: id
    });
    this.getPostedItems(this.state.userId);
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getPostedItems().then(() => {
      this.setState({ refreshing: false });
    });
  };

  getPostedItems = async () => {
    this.setState({ refreshing: true });
    API.findGiven(this.state.userId)
      .then(res => {
        let avail = res.data.active;
        let unAvail = res.data.inactive;
        this.setState({
          active: avail,
          inactive: unAvail,
          refreshing: false
        });
        console.log("IN STATE: ", this.state.active, this.state.inactive);
      })
      .catch(err => console.log(err));
  };

  // renders the UI to the screen
  render() {
    return (
      <Container style={{ backgroundColor: "#C2DFE3" }}>
      <AppNameHeader />
        {this.state.refreshing && (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <ActivityIndicator />
          </View>
        )}
        <View style={{ flex: .25, flexDirection: "row", justifyContent: "center", paddingButtom: 40}} >
        {/* button to open form to post an item */}
        <Button style={{ margin: 50, backgroundColor: "#F3D34A" }} onPress={() => this.props.navigation.navigate("Post")}>
          <Text>New Post</Text>
        </Button>
        </View>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >

          {/* map active array at top */}
          {this.state.active.map((data, i) => (
            <ItemCard
              key={data._id}
              id={data._id}
              images={data.images}
              available={data.available}
              textBody={data.description}
              reload={this._onRefresh}
              topLeft={{ type: "Take" }}
              topRight={{
                type: "Duration",
                timeLeft: data.timeLeft
              }}
              active={true}
            />
          ))}

          {/* map inactive array below */}
          {this.state.inactive.map((data, i) =>
            data.available ? (
              <ItemCard
                key={data._id}
                id={data._id}
                images={data.images}
                available={data.available}
                textBody={data.description}
                reload={this._onRefresh}
                topLeft={{ type: "None" }}
                topRight={{ type: "Repost" }}
                active={false}
              />
            ) : (
              <ItemCard
                key={data._id}
                id={data._id}
                images={data.images}
                available={data.available}
                textBody={data.description}
                reload={this._onRefresh}
                topLeft={{ type: "None" }}
                topRight={{ type: "Repost" }}
                active={false}
              />
            )
          )}
        </Content>
      </Container>
    );
  }
}
