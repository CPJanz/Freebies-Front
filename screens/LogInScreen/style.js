import { StyleSheet} from 'react-native';
import React, { Component } from 'react';
import { yellow } from 'ansi-colors';

export default styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        // backgroundColor: "#feffea"
    //    justifyContent: "center"
    // alignItems: "center"
    },

    signInButton: {
    //    backgroundColor: "rgba(240, 300, 75, .5)",
    //    borderColor: "#424242",
    //    alignContent: "center",
    // justifyContent: "center"
    alignItems: "center"
    },

    signInText: {
        color: "#F3D34A",
        fontSize: 25,
        // textAlign: "center"
        // justifyContent: "center"
    },

    signUpButton: {

    },

    signUpText: {
        color: "#F3D34A",
        fontSize: 24
    }
})