import React from "react";
import { Button, Text } from "react-native";

function RepostButton(props) {
  return props.distanceInfo.showTaken ? (
    <Button onPress={props.onPress} title="Repost" />
  ) : (
    <Text>{props.distanceInfo.distance}</Text>
  );
}

export default RepostButton;
