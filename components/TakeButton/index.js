import React from "react";
import { Button } from "react-native";

function TakeButton(props) {
  return (
    <Button
      onPress={props.onPress}
      title={props.available ? "Take" : "Put Back"}
    />
  );
}

export default TakeButton;
