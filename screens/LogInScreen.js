//this code creates the user log in page

import React from "react";
import API from "../utils/API";

import { AsyncStorage } from "react-native";

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button
} from "native-base";

export default class LogInScreen extends React.Component {
  state = {
    email: null
  };
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
    API.signIn(this.state.email).then(dbResult => {
      if (dbResult) {
        AsyncStorage.setItem("userToken", dbResult[0]._id);
        this.props.navigation.navigate("App");
      } else {
        console.log("email already exists!");
      }
    });
    // await AsyncStorage.setItem('userToken', 'abc');
    // this.props.navigation.navigate('App');
  };
}
