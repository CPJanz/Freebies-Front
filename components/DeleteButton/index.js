import React from "react";
import { Button, Text } from "native-base";

function DeleteButton(props) {
  return (
    <Button transparent onPress={props.onPress}>
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 22,
          fontWeight: "bold",
          marginLeft: -13,
          marginTop: -17,
          textShadowColor: "#424242",
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 5
        }}
      >
        Delete
      </Text>
    </Button>
  );
}

export default DeleteButton;
