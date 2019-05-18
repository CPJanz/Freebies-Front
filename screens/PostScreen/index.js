import React, { Component } from "react";
import { AsyncStorage, KeyboardAvoidingView } from "react-native";
import ImagePickerComponent from "../../components/Camera";
import {
  Container,
  Content,
  Text,
  Button,
  View,
  Form,
  Item,
  Input,
  Toast
} from "native-base";
import * as firebase from "firebase";
import uuid from "uuid";
import API from "../../utils/API";
import styles from "./style";

export default class PostScreen extends Component {
  images = [];
  state = {
    userId: null,
    latitude: null,
    longitude: null,
    description: "",
    uploaded: [],
    showToast: false,
    makingPost: false
  };

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
  };

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

  // updates the description each time the user modifies the description text box
  handleDiscriptionChange = event => {
    this.setState({ description: event.nativeEvent.text });
  };

  disableBtn = () => {
    this.setState({ makingPost: true });
    this.postItem();
  };

  rmLineBreaks = txt => {
    newTxt = txt.replace(/[\n\r]/g, " ");
    this.setState({
      description: newTxt
    });
  };

  postItem = async () => {
    let uploadArr = [];
    for (var i = 0; i < this.images.length; i++) {
      var uploadImageResult = await this.uploadImage(this.images[i]);
      uploadArr.push(uploadImageResult);
    }

    this.setState({ uploaded: uploadArr });

    this.rmLineBreaks(this.state.description);

    if (this.state.uploaded.length > 0) {
      this.props.navigation.navigate("Give");
      API.postNewItem({
        images: this.state.uploaded,
        giverId: this.state.userId,
        location: {
          latitude: this.state.latitude,
          longitude: this.state.longitude
        },
        description: this.state.description
      });
      Toast.show({
        text: "Your item was posted!",
        textStyle: { color: "#f3d34a", textAlign: "center" },
        duration: 3000,
        position: "top"
      });
    } else {
      Toast.show({
        text: "Your post must include an image",
        textStyle: { color: "#f3d34a", textAlign: "center" },
        duration: 3000,
        position: "top"
      });
      this.setState({ makingPost: false });
    }
  };

  render() {
    return (
      <Container contentContainerStyle={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <KeyboardAvoidingView>
            <Form style={styles.form}>
              <Text style={styles.title}>Post Your Item!</Text>
              <View style={styles.whiteBox}>
                <Item style={styles.item}>
                  <ImagePickerComponent images={this.images} />
                </Item>
                <Item style={styles.item}>
                  <Input
                    style={styles.input}
                    multiline={true}
                    maxLength={50}
                    placeholder="Optional item description"
                    value={this.state.description}
                    onChange={this.handleDiscriptionChange}
                  />
                </Item>
                <Item style={styles.btnBox}>
                  <Button
                    onPress={
                      this.state.makingPost === false ? this.disableBtn : null
                    }
                    style={styles.postBtn}
                  >
                    <Text> Post </Text>
                  </Button>
                  <Button
                    onPress={() => this.props.navigation.navigate("Give")}
                    style={styles.cancelBtn}
                  >
                    <Text>Cancel</Text>
                  </Button>
                </Item>
              </View>
            </Form>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}
