import React from "react";
import { Image, View } from "react-native";
import styles from "./style"

export default class AppName extends React.Component {
  render() {
      return (
        <Image source={require("../../assets/images/AppName.png")} 
        style={[this.props.style, {resizeMode: "contain"}]}>
        </Image>
      );
    }
}
