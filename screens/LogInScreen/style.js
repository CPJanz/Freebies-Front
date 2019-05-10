import { StyleSheet} from 'react-native';
import React, { Component } from 'react';
import { yellow, bold } from 'ansi-colors';

export default styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        // alignContent: "center"
        justifyContent: "center"
    },

    logo: {  
    },

    invisibleText: {
        color: "transparent"
    },

    invisibleTextSign: {
        color: "transparent",
        fontSize: 5
    },

    email: {
       alignSelf: "stretch",
    //    color: "#FF0000"
    },

    signInText: {
        color: "#F3D34A",
        fontSize: 25,
        fontWeight: "bold",
        // justifyContent: "space-between"
    },

    signUpText: {
        paddingBottom: 30,
        bottom: 0,
        color: "#F3D34A",
        fontSize: 25,
        fontWeight: "bold",
        // justifyContent: "space-between"
    }
})