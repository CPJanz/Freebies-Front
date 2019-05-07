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

import AppName from "../components/AppName";

export default class LogInScreen extends React.Component {
  state = {
    email: "",
    errorMessage: ""
  };

  signInAsync = async () => {
    console.log("email", this.state.email);
    const thisthing = await AsyncStorage.getItem("userToken");
    console.log("userId:", thisthing);
    API.signIn(this.state.email).then(dbResult => {
      console.log("dbresult", JSON.stringify(dbResult));
      if (dbResult.data[0]._id) {
        console.log("id", dbResult.data[0]._id);
        AsyncStorage.setItem("userToken", dbResult.data[0]._id);
        this.props.navigation.navigate("App");
      } else {
        console.log("No account associated with that email!");
        this.setState({
          errorMessage: "No account associated with that email!"
        });
      }
    });
  };

  signUpAsync = async () => {
    console.log("Clicked!");
    if (this.validateEmail(this.state.email)) {
      API.createUser(this.state.email).then(dbResult => {
        console.log("result", JSON.stringify(dbResult.data));
        if (dbResult.data !== false) {
          console.log(dbResult.data._id);
          AsyncStorage.setItem("userToken", dbResult.data._id);
          this.props.navigation.navigate("App");
        } else {
          console.log("There is an account with that email already");
          this.setState({
            errorMessage: "There is an account with that email already"
          });
        }
      });
    } else {
      console.log("Not a valid email address");
      this.setState({
        errorMessage: "Please enter a valid email address"
      });
    }
  };

  validateEmail = email => {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
  }

  render() {
    return (
      <Container>
        <AppName />
        <Content>   
          <Form>
            <Item>
              <Input
                type="text"
                placeholder="E-Mail"
                name="email"
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
            </Item>
            <Text>{this.state.errorMessage}</Text>
            {/* <Item last>
                            <Input placeholder="Password" />
                        </Item> */}
          </Form>
          <Button onPress={this.signInAsync}>
            <Text>Sign In</Text>
          </Button>
          <Button onPress={this.signUpAsync}>
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
