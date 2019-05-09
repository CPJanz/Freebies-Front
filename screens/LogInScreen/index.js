//this code creates the user log in page

import React from "react";
import API from "../../utils/API";
import styles from "./style"

import { AsyncStorage } from "react-native";

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  View
} from "native-base";

import AppName from "../../components/AppName";

export default class LogInScreen extends React.Component {
  state = {
    email: "",
    errorMessage: ""
  };

  signInAsync = async () => {
    console.log("email", this.state.email);
    const thisthing = await AsyncStorage.getItem("userToken");
    console.log("userId:", thisthing);
    if (this.state.email.length === 0) {
      this.setState({ errorMessage: "Please enter an email address." });
    } else {
      API.signIn(this.state.email).then(async dbResult => {
        console.log("dbresult", JSON.stringify(dbResult));
        if (dbResult.data.length) {
          console.log("id", dbResult.data[0]._id);
          AsyncStorage.setItem("userToken", dbResult.data[0]._id);
          await AsyncStorage.setItem("userEmail", this.state.email);
          this.props.navigation.navigate("App");
        } else {
          console.log("No account associated with that email!");
          this.setState({
            errorMessage: "No account associated with that email!"
          });
        }
      });
    }
  };

  signUpAsync = async () => {
    console.log("Clicked!");
    if (this.validateEmail(this.state.email)) {
      API.createUser(this.state.email).then(async dbResult => {
        console.log("result", JSON.stringify(dbResult.data));
        if (dbResult.data !== false) {
          console.log(dbResult.data._id);
          AsyncStorage.setItem("userToken", dbResult.data._id);
          await AsyncStorage.setItem("userEmail", this.state.email);
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
  };

  render() {
    return (
      <View style={styles.container}>
      <Container >
        <AppName />
        <Content>
          <View style={styles.email}>
          <Form>
            <Item >
              <Input 
                type="text"
                placeholder="E-Mail"
                name="email"
                value={this.state.email}
                onChangeText={text =>
                  this.setState({ email: text.toLowerCase() })
                }
              />
            </Item>
            <Text>{this.state.errorMessage}</Text>
            {/* <Item last>
                            <Input placeholder="Password" />
                        </Item> */}
          </Form>
          </View>
          <Button transparent onPress={this.signInAsync} style={styles.signInButton}>
            <Text style={styles.signInText}>          Sign In</Text>
          </Button>
          <Button transparent onPress={this.signUpAsync} style={styles.signUpButton}>
            <Text style={styles.signUpText}>          Sign Up</Text>
          </Button>
        </Content>
      </Container>
      </View>
    );
  }
}
