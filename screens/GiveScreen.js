//this code creates the GIVE page

import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import ImagePickerComponent from "../components/Camera";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  Card,
  CardItem,
  Body,
  Textarea
} from "native-base";
//brings in firebaseDB
import * as firebase from "firebase";
//uuid is used to generate a unique identifier for each image
import uuid from "uuid";
import API from "../utils/API";
import ItemCard from "../components/ItemCard";

//this code renders the Give screen
export default class GiveScreen extends Component {
  //stores the image URLs from the users camera/image library in an array
  images = [];
  state = {
    active: [],
    inactive: [],
    userId: null,
    latitude: null,
    longitude: null,
    description: "",
    uploaded: [],
    //sets the post item state enabling the display on the post item UI to update
    post: false,
    postText: "New Post"
  };

  //   when give screen loads, state will set with the users location, id, and previously posted items
  componentDidMount = () => {
    this.getLocation();
    this.setUserId();
  };

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }

  setUserId = async () => {
    let id = await AsyncStorage.getItem("userToken");
    this.setState({
      userId: id
    });
    this.getPostedItems(this.state.userId);
  };

  getPostedItems = userId => {
    API.findGiven(this.state.userId)
      .then(res => {
        let avail = res.data.active;
        let unAvail = res.data.inactive;
        this.setState({
          active: avail,
          inactive: unAvail
        });
        console.log("IN STATE: ", this.state.active, this.state.inactive);
      })
      .catch(err => console.log(err));
  };

  //uploads the image to firebase
  uploadImage = async uri => {
    // generates a random image ID for firebase
    var imageID = uuid.v4() + ".jpg";
    // creates a blob (binary image format)
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    // creates a reference based off of the generated image ID
    var ref = firebase
      .storage()
      .ref()
      .child(imageID);
    // sends the blob to firebase
    var snapshot = await ref.put(blob, { contentType: "image/jpg" });
    // finalizes the uploaded blob
    blob.close();
    // returns the URL of the uploaded image
    return await snapshot.ref.getDownloadURL();
  };

  // changes the text according to the state (see above)
  togglePost = () => {
    this.setState({
      post: !this.state.post,
      postText: !this.state.post ? "Close Post" : "New Post"
    });
  };

  // TODO: This code can be updated to call to backend for posting to MongoDB
  postItem = async () => {
    let uploadArr = [];
    for (var i = 0; i < this.images.length; i++) {
      console.log(this.images[i]);
      var uploadImageResult = await this.uploadImage(this.images[i]);
      // TODO: store the resulting image URL in MongoDB
      console.log(uploadImageResult);
      uploadArr.push(uploadImageResult);
    }

    this.setState({ uploaded: uploadArr });

    // TODO: store the description in Mongo DB
    console.log(this.state.description);

    this.togglePost();

    API.postNewItem({
      images: this.state.uploaded,
      giverId: this.state.userId,
      location: {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      },
      description: this.state.description
    });
  };

  // updates the description each time the user modifies the description text box
  handleDiscriptionChange = event => {
    this.setState({ description: event.nativeEvent.text });
  };

  // renders the UI to the screen
  render() {
    let { post, postText } = this.state;

    return (
      <Container>
        {/* button to open form to post an item */}
        <Content>
          <Button style={{ margin: 50 }} onPress={this.togglePost}>
            <Text>{postText}</Text>
          </Button>

          {/* inserts image picker UI */}
          {post && (
            <Container>
              <Content>
                <Card>
                  <CardItem header>
                    <Text>Post an Item</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <ImagePickerComponent images={this.images} />
                      <Textarea
                        rowSpan={5}
                        bordered
                        placeholder="Optional item description"
                        value={this.state.description}
                        onChange={this.handleDiscriptionChange}
                      />
                    </Body>
                  </CardItem>
                  <CardItem footer />
                  <Button onPress={this.postItem} primary>
                    <Text> Post </Text>
                  </Button>
                </Card>
              </Content>
            </Container>
          )}
          <Text>Active Posts</Text>
          {/* map active array at top */}
          {this.state.active.map((data, i) => (
            <ItemCard
              key={i}
              id={data.id}
              images={data.images}
              available={data.available}
              textBody={data.description}
              topLeft={{ type: "Take" }}
              topRight={{
                type: "Duration",
                timeLeft: data.timeLeft
              }}
            />
          ))}
          <Text>Inactive Posts</Text>
          {/* map inactive array below */}
          {this.state.inactive.map(
            (data, i) =>
              data.available ? (
                <ItemCard
                  key={i}
                  id={data._id}
                  images={data.images}
                  available={data.available}
                  textBody={data.description}
                  topLeft={{ type: "None" }}
                  topRight={{ type: "Repost" }}
                />
              ) : (
                <ItemCard
                  key={i}
                  id={data._id}
                  images={data.images}
                  available={data.available}
                  textBody={data.description}
                  topLeft={{ type: "None" }}
                  topRight={{ type: "Take" }}
                />
              )

            // <GiveCard
            //   key={data._id}
            //   image={data.images[0]}
            //   textBody={data.description}
            //   topRight={<Text>Repost(TEMP)</Text>}
            // />
          )}
        </Content>
      </Container>
    );
  }
}
