import React from "react";
import { Image, View } from "react-native";
import styles from "./style"

export default class AppName extends React.Component {
  render() {
      return (
        <View styles={styles.container}>
        <Image source={require("../../assets/images/logoTest.png")}>
        </Image>
        </View>
      );
    }
}
