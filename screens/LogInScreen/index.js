//this code creates the user log in page

import React from "react";
import API from "../../utils/API";
import styles from "./style"
import { AsyncStorage } from "react-native";
import { Container, Content, Form, Item, Input, Text, Button, View, Toast } from "native-base";
import AppName from "../../components/AppName";

export default class LogInScreen extends React.Component {
  state = {
    email: "",
    errorMessage: "",
    showToast: false
  };

  signInAsync = async () => {
    console.log("email", this.state.email);
    const thisthing = await AsyncStorage.getItem("userToken");
    console.log("userId:", thisthing);
    if (this.state.email.length === 0) {
      this.setState({ errorMessage: "Please enter an email address." });
      Toast.show({
        text: "Please enter an email address.",
        textStyle: { color: "#f3d34a", textAlign: "center" },
        duration: 3000,
        position: "top"
      })
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
          Toast.show({
            text: "No account associated with that email!",
            textStyle: { color: "#f3d34a", textAlign: "center" },
            duration: 3000,
            position: "top"
          })
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
          Toast.show({
            text: "There is an account with that email already",
            textStyle: { color: "#f3d34a", textAlign: "center" },
            duration: 3000,
            position: "top"
          })
        }
      });
    } else {
      console.log("Not a valid email address");
      this.setState({
        errorMessage: "Please enter a valid email address"
      });
      Toast.show({
        text: "Please enter a valid email address",
        textStyle: { color: "#f3d34a", textAlign: "center" },
        duration: 3000,
        position: "top"
      });
    }
  };

  validateEmail = email => {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
  };

  render() {
    return (
      <Container style={styles.container} >
        <AppName style={styles.appName} />
        <Content scrollEnabled={false} style={styles.content}>
          <Form style={{marginBottom: 40}}>
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
            <Text >{this.state.errorMessage} </Text>
            {/* <Item last>
                  <Input placeholder="Password" />
                </Item> */}
          </Form >
          <Button transparent onPress={this.signInAsync} style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Button>
          <Button transparent onPress={this.signUpAsync} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
