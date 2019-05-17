import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'native-base'
import email from 'react-native-email'
 
export default class Email extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Button transparent onPress={this.handleEmail}>
                    <Text>email</Text> 
                </Button> 
            </View>
        )
    }
 
    handleEmail = () => {
        const to = ['freebeezconnect@gmail.com'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            subject: 'Freebeez Question or Comment'
        }).catch(console.error)
    }
}
 
const styles = StyleSheet.create({
    container: {
       marginTop: -12.5,
       marginLeft: -11,
       marginRight: -11,
       fontSize: 10,
       
    }
})