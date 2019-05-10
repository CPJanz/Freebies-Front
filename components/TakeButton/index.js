import React from "react";
import { Button } from "react-native";

function TakeButton(props) {
  return (
    <Button
      color="#F3D34A"
      onPress={props.onPress}
      title={props.available ? "Take" : "Put Back"}
    />
  );
}

export default TakeButton;
