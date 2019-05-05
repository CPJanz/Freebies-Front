//this code creates the GIVE page

import React, { Component } from 'react';
import { AsyncStorage } from "react-native";
import GiveCard from '../components/GiveCard';
import ImagePickerComponent from '../components/Camera';
import { Container, Header, Content, Form, Item, Input, Text, Button, Card, CardItem, Body, Textarea } from 'native-base';
//brings in firebaseDB
import * as firebase from 'firebase';
//uuid is used to generate a unique identifier for each image
import uuid from 'uuid';
import API from '../utils/API';

//this code renders the Give screen
export default class GiveScreen extends Component {
    //stores the image URLs from the users camera/image library in an array
    images = [];
    state = {
        postedItems: [],
        userId: null,
        latitude: null,
        longitude: null,
        description: "",
        uploaded: [],
        //sets the post item state enabling the display on the post item UI to update
        post : false,
        postText : "New Post"
      };

    //   when give screen loads, state will set with the users location, id, and previously posted items
    componentDidMount = () => {
        this.getLocation();
        this.setUserId();
        this.getPostedItems();
    }
    
    getLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });
    }

    setUserId = async() => {
        let id = await AsyncStorage.getItem('userToken');
        this.setState({
            userId: id
        })
    }

    getPostedItems = () => {
        API.findGiven("5ccf4fd082e8c20017ecf205")
            .then(res => this.setState({ postedItems: res.data }))
            .catch(err => console.log(err));
        console.log(this.state.postedItems);
    }

    //uploads the image to firebase
    uploadImage = async (uri) => {

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
            reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });

        // creates a reference based off of the generated image ID 
        var ref = firebase.storage().ref().child(imageID);
        // sends the blob to firebase
        var snapshot = await ref.put(blob, {contentType : "image/jpg"});
        // finalizes the uploaded blob
        blob.close();
        // returns the URL of the uploaded image
        return await snapshot.ref.getDownloadURL();
    }

    // changes the text according to the state (see above)
    togglePost = () => {
        this.setState(
            {
                post : !this.state.post, 
                postText : !this.state.post ? "Close Post" : "New Post" 
            });
    }

    // TODO: This code can be updated to call to backend for posting to MongoDB
    postItem = async () => {
        let uploadArr = [];
        for (var i =0; i < this.images.length; i++)
        {
            console.log(this.images[i]);
            var uploadImageResult =  await this.uploadImage(this.images[i]);
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
    }

    // updates the description each time the user modifies the description text box
    handleDiscriptionChange = (event) => {
        this.state.description = event.nativeEvent.text;
    }

    // renders the UI to the screen
    render() {

        let {post, postText} = this.state;

        // sampleData for give item card content
        // TODO: plug into Mongo DB
        var sampleData = [
            {
                textBody: "This is the optional item description",
                numberOfStars: 1000,
                image: "https://blogs.massaudubon.org/yourgreatoutdoors/wp-content/uploads/sites/20/2012/08/FreeLawnmower-small-2.jpg"
            },
        ];


        return (
            <Container>
                {/* button to open form to post an item */}
                <Content>
                    <Button style={{ margin: 50 }} onPress={this.togglePost}>
                        <Text>
                            {postText}
                        </Text>
                    </Button>

                    {/* inserts image picker UI */}
                    {post &&                                        
                    <Container>
                        <Content>
                            <Card>
                                <CardItem header>
                                    <Text>Post an Item</Text>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <ImagePickerComponent images = {this.images} />
                                        <Textarea rowSpan={5} bordered placeholder="Optional item description" value={this.state.description}  onChange={this.handleDiscriptionChange}  />
                                    </Body>
                                </CardItem>
                                <CardItem footer>

                                </CardItem>
                                <Button onPress={this.postItem} primary><Text> Post </Text></Button>
                            </Card>
                        </Content>
                    </Container>
                    }
        
                    {/* displays sample data on UI */}
                    {sampleData.map((data, i) => {
                        return (<GiveCard key={i} textBody={data.textBody} numberOfStars={data.numberOfStars} image={data.image} />)
                    })}

                </Content>
            </Container>
        );
    }
}
