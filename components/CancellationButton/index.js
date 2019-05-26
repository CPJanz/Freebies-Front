import React, { Component } from "react"
import { AsyncStorage, StyleSheet, View } from "react-native"
import { Button, Text } from "native-base"
import email from "react-native-email"
import API from "../../utils/API"
 
export default class CancelAcct extends Component {
    state = {
        userId: null
    };

    setUserId = async () => {
        let id = await AsyncStorage.getItem("userToken");
        this.setState({
          userId: id
        });
    };

    deleteUserAcct = () => {
        this.setUserId().then(() => {
            API.deleteUser(this.state.userId)
                .then(() => this.props.navigation.navigate("Auth"));
        });
    };

    // handleEmail = () => {
    //     const to = ['freebeezconnect@gmail.com'] // string or array of email addresses
    //     email(to, {
    //         // Optional additional arguments
    //         subject: 'Cancelled User Account'
    //     }).catch(console.error);
    // };

    render() {
        return (
            <View style={styles.container}>
                <Button transparent onPress={this.deleteUserAcct}>
                    <Text>here.</Text> 
                </Button> 
            </View>
        );
    };
};
 
const styles = StyleSheet.create({
    container: {
        marginLeft: -230,
        marginBottom: -13,
       fontSize: 10,
       
    }
})