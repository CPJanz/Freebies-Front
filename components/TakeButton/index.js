import React from "react";
import { Button, Text } from "react-native";

function TakeButton(props) {
  return (
    <Button
      onPress={props.onPress}
      title={props.available ? "Take" : "Un Take"}
    />
  );
}

export default TakeButton;
