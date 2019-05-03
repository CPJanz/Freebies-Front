//this code creates the FIND page

import React, { Component } from 'react';
import FindCard from '../components/FindCard.js';
import { Container, Header, Content, Form, Item, Input, Text, Button, View } from 'native-base';

export default class FindScreen extends Component {
    render() {
        // sampleData for find item card content
        // TODO: plug into backend
        var sampleData = [
            {
                textBody: "This is the optional item description",
                numberOfStars: 1000,
                image: "https://bell-environmental.com/wp-content/uploads/2012/05/freesofa-forpickup1.jpg"
            },
            {
                textBody: "This is the optional item description",
                numberOfStars: 1000,
                image: "https://bell-environmental.com/wp-content/uploads/2012/05/freesofa-forpickup1.jpg"
            },
            {
                textBody: "This is the optional item description",
                numberOfStars: 1000,
                image: "https://bell-environmental.com/wp-content/uploads/2012/05/freesofa-forpickup1.jpg"
            }
        ];

        return (
            <Container>
                <Content>
                    {sampleData.map((data, i) => {
                        return (<FindCard key={i} textBody={data.textBody} numberOfStars={data.numberOfStars} image={data.image} />)
                    })}
                </Content>
            </Container>
        );
    }
}
