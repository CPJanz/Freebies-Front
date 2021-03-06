import React, { Component } from "react";
import { AsyncStorage, KeyboardAvoidingView } from "react-native";
import ImagePickerComponent from "../../components/Camera";
import { ImageManipulator } from "expo";
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
import Firebase from "../../utils/Firebase";
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
      const resizedImage = await ImageManipulator.manipulateAsync(
        this.images[i],
        [{ resize: { height: 300 } }],
        { format: "jpeg" }
      );

      const uploadImageResult = await Firebase.uploadImage(resizedImage.uri);
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
                <Item style={styles.item}>
                  <Text style={styles.charCount}>
                    {this.state.description.length} / 50
                  </Text>
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
