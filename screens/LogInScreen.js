//this code creates the user log in page

import React from 'react';

import {
    AsyncStorage
} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Text, Button } from 'native-base';

export default class LogInScreen extends React.Component {
    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Email" />
                        </Item>
                        {/* <Item last>
                            <Input placeholder="Password" />
                        </Item> */}
                        
                    </Form>
                    <Button onPress={this.signInAsync}>
                        <Text>Sign In</Text>
                    </Button>
                </Content>
            </Container>
        );
    }

    signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}