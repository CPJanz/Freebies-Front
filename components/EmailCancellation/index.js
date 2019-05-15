import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'native-base'
import email from 'react-native-email'
 
export default class EmailCancel extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Button transparent onPress={this.handleEmail}>
                    <Text>here.</Text> 
                </Button> 
            </View>
        )
    }
 
    handleEmail = () => {
        const to = ['freebeezconnect@gmail.com'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            subject: 'Cancel my Freebeez Account'
        }).catch(console.error)
    }
}
 
const styles = StyleSheet.create({
    container: {
        marginLeft: -230,
        marginBottom: -13,
       fontSize: 10,
       
    }
})