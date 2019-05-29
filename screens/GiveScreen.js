//this code creates the GIVE page

import React, { Component } from "react";
import { AsyncStorage, RefreshControl, FlatList } from "react-native";
import { Container, Content, Text, Button, View } from "native-base";
import API from "../utils/API";
import ItemCard from "../components/ItemCard";
import AppNameHeader from "../components/AppNameHeader";
import EmptyListMessage from "../components/EmptyListMessage";

//this code renders the Give screen
export default class GiveScreen extends Component {
  state = {
    active: [],
    inactive: [],
    userId: null,
    refreshing: true
  };

  //   when give screen loads, state will set with the user's id, and previously posted items
  componentDidMount = () => {
    this.setUserId().then(() => {
      if (!this.focusListener) {
        this.focusListener = this.props.navigation.addListener(
          "willFocus",
          () => {
            return this.getPostedItems();
          }
        );
      }
    });
  };

  componentWillUnmount() {
    this.focusListener.remove();
  }

  setUserId = async () => {
    let id = await AsyncStorage.getItem("userToken");
    this.setState({
      userId: id
    });
    this.getPostedItems();
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
      })
      .catch(err => console.log(err));
  };

  // renders the UI to the screen
  render() {
    return (
      <Container style={{ backgroundColor: "#C2DFE3" }}>
        <AppNameHeader />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {/* button to open form to post an item */}
          <Button
            style={{
              marginTop: 22,
              marginBottom: 27,
              backgroundColor: "#F3D34A"
            }}
            onPress={() => this.props.navigation.navigate("Post")}
          >
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
          {!this.state.active.length &&
          !this.state.inactive.length &&
          !this.state.refreshing ? (
            <EmptyListMessage
              topPadding={2}
              message={
                "Looks like you're a newBEE! \n\n Press the New Post button \n to get started!"
              }
            />
          ) : null}
          {/* map active array at top */}
          <FlatList
            data={this.state.active}
            keyExtractor={data => data._id}
            renderItem={({ item }) => (
              <ItemCard
                key={item._id}
                id={item._id}
                images={item.images}
                available={item.available}
                textBody={item.description}
                reload={this.getPostedItems}
                topLeft={{ type: "Take" }}
                topRight={{
                  type: "Duration",
                  timeLeft: item.timeLeft
                }}
                active={true}
              />
            )}
          />
          {/* map inactive array below */}
          <FlatList
            data={this.state.inactive}
            keyExtractor={data => data._id}
            renderItem={({ item }) => (
              <ItemCard
                key={item._id}
                id={item._id}
                images={item.images}
                available={item.available}
                textBody={item.description}
                reload={this.getPostedItems}
                topLeft={{ type: "Delete" }}
                topRight={{ type: "Repost" }}
                active={false}
              />
            )}
          />
        </Content>
      </Container>
    );
  }
}
