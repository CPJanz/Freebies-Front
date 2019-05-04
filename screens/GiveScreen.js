//this code creates the GIVE page

import React, { Component } from 'react';
import GiveCard from '../components/GiveCard';
import { Container, Header, Content, Form, Item, Input, Text, Button, Card, CardItem, Body, Textarea} from 'native-base';
import * as firebase from 'firebase';
import API from '../utils/API';

export default class GiveScreen extends Component {
    state = {
        images = [],
        userId = null,
        location = null,
        description = ""
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                location: position.coords
            });
        });
    }

    chooseImage() {
        this.uploadImage("https://picsum.photos/id/237/200/300");
    }

    uploadImage = async(uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child("my-image");
        return ref.put(blob);
      }

    newItem() {
        API.postNewItem({
            images: this.state.images,
            giverId: this.state.userId,
            location: {
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude
                },
            description: this.state.description
        })
        // can add promise function here, depending on if we want some action taken after an item is added
    }

    render() {
        // sampleData for give item card content
        // TODO: plug into backend 
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
                    <Button style={{ margin: 50 }}>
                        <Text>
                            New Post
                        </Text>
                    </Button>


{/*  placeholder for add new item/POST code */}
        {/* TODO: move to the right place */}
        <Container>
            <Content>
        <Card>
        <CardItem header>
          <Text>Post an Item</Text>
        </CardItem>
        <CardItem>
          <Body>
          <Form>
            <Textarea rowSpan={5} bordered placeholder="Optional item description" />
          </Form>
          </Body>
        </CardItem>
        <CardItem footer>
          
        </CardItem>
        {/* button to submit posting */}
        <Button onPress={this.chooseImage}><Text>Upload Image</Text></Button>
        <Button primary onPress={this.newItem}><Text> Post </Text></Button>
     </Card>
     </Content>
     </Container>


                    {sampleData.map((data, i) => {
                        return (<GiveCard key={i} textBody={data.textBody} numberOfStars={data.numberOfStars} image={data.image} />)
                    })}

                </Content>
            </Container>
        );
    }
}


