//this code creates the GIVE page

import React from 'react';

import GiveCard from '../components/GiveCard';

import { Container, Header, Content, Form, Item, Input, Text, Button } from 'native-base';

export default class GiveScreen extends React.Component {
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
                <Content>
                    <Button style={{ margin: 50 }}>
                        <Text>
                            New Post
                        </Text>
                    </Button>

                    {sampleData.map((data, i) => {
                        return (<GiveCard key={i} textBody={data.textBody} numberOfStars={data.numberOfStars} image={data.image} />)
                    })}

                </Content>
            </Container>
        );
    }
}
