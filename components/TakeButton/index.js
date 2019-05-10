import React from "react";
import { Stylesheet, Button } from "react-native";
import styles from "./style"


function TakeButton(props) {
  return (
    <Button
      color="#FFFFFF"
      fontWeight="bold"
      fontSize="22"
      onPress={props.onPress}
      title= {props.available ? "TAKE" : "PUT BACK"}
    />
  );
}

export default TakeButton;
