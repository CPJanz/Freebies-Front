//this code creates the GIVE page

import React, { Component } from 'react';
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
        userId: null,
        location: null,
        description: ""
      };

    //uploads the image to firebase
    uploadImage = async (uri) => {       

        // generates a random image ID for firebase
        var imageID = uuid.v4() + ".jpg";
        // fetches the image from local storage  
        var response = await fetch(uri);
        // creates a blob (binary image format)
        var blob = await response.blob();
        // creates a reference based off of the generated image ID 
        var ref = firebase.storage().ref().child(imageID);
        // sends the blob to firebase
        var snapshot = await ref.put(blob, {contentType : "image/jpeg"});
        // finalizes the uploaded blob
        blob.close();
        // returns the URL of the uploaded image
        return await snapshot.ref.getDownloadURL();
    }

    //sets the post item state enabling the display on the post item UI to update
    state = {
        post : false,
        postText : "New Post"
    };

    // changes the text according to the state (see above)
    togglePost = () => {
        this.setState(
            {
                post : !this.state.post, 
                postText : !this.state.post ? "Close Post" : "New Post" 
            });
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                location: position.coords
            });
        });
    }

    // TODO: This code can be updated to call to backend for posting to MongoDB
    postItem = async () => {

        for (var i =0; i < this.images.length; i++)
        {
            console.log(this.images[i]);
            var uploadImageResult =  await this.uploadImage(this.images[i]);
            // TODO: store the resulting image URL in MongoDB
            console.log(uploadImageResult);
        }

        // TODO: store the description in Mongo DB
        console.log(this.state.description);

        this.togglePost();

        API.postNewItem({
            images: images,
            giverId: this.state.userId,
            location: {
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude
                },
            description: this.state.description
        })
        // can add promise function here, depending on if we want some action taken after an item is added
    
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


