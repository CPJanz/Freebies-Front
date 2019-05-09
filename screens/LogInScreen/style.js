import { StyleSheet} from 'react-native';
import React, { Component } from 'react';
import { yellow } from 'ansi-colors';

export default styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        // backgroundColor: "#feffea"
    //    justifyContent: "center"
    // alignItems: "center",
    // alignContent: "center",
    // margin: 0
    },

    email: {
       backgroundColor: "#424242",
    //    alignSelf: "flex-start",
    //    marginLeft: 0
    },

    signInButton: {
    //    backgroundColor: "rgba(240, 300, 75, .5)",
    //    borderColor: "#424242",
    //    alignContent: "center",
    display: "flex",
    justifyContent: "center"
    // alignItems: "center"
    },

    signInText: {
        color: "#F3D34A",
        fontSize: 25,
        justifyContent: "space-between"
        // alignItems: "center"
        // textAlign: "center"
        // justifyContent: "center"
    },

    signUpButton: {
        justifyContent: "center"
    },

    signUpText: {
        color: "#F3D34A",
        fontSize: 24,
        justifyContent: "space-between"
    }
})