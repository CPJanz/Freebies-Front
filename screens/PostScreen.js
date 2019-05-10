import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import ImagePickerComponent from "../components/Camera";
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
    Input,
    Toast
} from "native-base";
import * as firebase from "firebase";
import uuid from "uuid";
import API from "../utils/API";

export default class PostScreen extends Component {
    images = [];
    state = {
        userId: null,
        latitude: null,
        longitude: null,
        description: "",
        uploaded: [],
        showToast: false
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
    };

    setUserId = async () => {
        let id = await AsyncStorage.getItem("userToken");
        this.setState({
            userId: id
        });
    };

    uploadImage = async uri => {
        console.log("IMAGES FROM CAMERA BEFORE FIREBASE ", this.images)
        // generates a random image ID for firebase
        var imageID = uuid.v4() + ".jpg";
        // creates a blob (binary image format)
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
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

        if (this.state.uploaded.length > 0) {
            // route back to give screen when item is posted
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
            
        } else {
            Toast.show({
                text: "Your post must include an image",
                buttonText: "Okay",
                duration: 3000,
                position: "top"
              })
        }
    };

    render() {
        return (
        <Container 
            contentContainerStyle={{
                backgroundColor: "#c2dfe3",
            }}>
        <Content 
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                backgroundColor: "#c2dfe3",
            }}>
        <Form style={{
            backgroundColor: "#c2dfe3",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
            }}>
            <View style={{
            padding: 15,
            backgroundColor: "white",
            width: "92%"
            }}>
            <Item style={{ borderColor: "transparent" }}>
                <ImagePickerComponent images={this.images} />
            </Item>
            <Item style={{ borderColor: "transparent" }}>
                <Input
                    style={{ 
                        margin: 15,
                        padding: 20,
                        borderLeftWidth: 1,
                        borderTopWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1
                    }}
                    multiline={true}
                    maxLength={150}
                    placeholder="Optional item description"
                    value={this.state.description}
                    onChange={this.handleDiscriptionChange}
                />
            </Item>
            <Item style={{
                borderColor: "transparent",
                flexDirection: "row",
                justifyContent: "center",
                padding: 10
                }}>
                <Button
                    onPress={this.postItem}
                    style={{
                        marginRight: 20,
                        backgroundColor: "#f3d34a"
                    }}>
                    <Text> Post </Text>
                </Button>
                <Button
                    onPress={() => this.props.navigation.navigate("Give")}
                    style={{
                        backgroundColor: "#f3d34a"
                    }}>
                    <Text>Cancel</Text>
                </Button>
            </Item>
            </View>
        </Form>
        </Content>
        </Container>
        )
    }
};