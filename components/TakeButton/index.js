import React from "react";
import { Stylesheet, Button } from "react-native";
import styles from "./style"


function TakeButton(props) {
  return (
    <Button
      color="#C2DFE3"
      font-weight="bold"
      onPress={props.onPress}
      title={props.available ? "TAKE" : "PUT BACK"}
    />
  );
}

export default TakeButton;
