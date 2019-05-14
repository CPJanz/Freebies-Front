import React from 'react'
import { StyleSheet, Button, View } from 'react-native'
import email from 'react-native-email'
 
export default class Email extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Button title="email" onPress={this.handleEmail} />
            </View>
        )
    }
 
    handleEmail = () => {
        const to = ['emailaddresshere'] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            subject: 'Freebeez Question or Comment'
        }).catch(console.error)
    }
}
 
const styles = StyleSheet.create({
    container: {
       marginTop: -10,
       marginLeft: -5,
       fontSize: 80

       
    }
})