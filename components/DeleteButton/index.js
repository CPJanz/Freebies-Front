import React from "react";
import { Button, Text } from "native-base";

function RepostButton(props) {
  return (
    <Button transparent onPress={props.onPress}>
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 22,
          fontWeight: "bold",
          marginLeft: -13,
          marginTop: -17
        }}
      >
        Delete
      </Text>
    </Button>
  );
}

export default RepostButton;
