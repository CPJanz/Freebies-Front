import React from "react";
import { Button, Text } from "react-native";

function DistanceHud(props) {
  return props.distanceInfo.showTaken ? (
    <Button
      onPress={props.onPress}
      title={props.taken ? "Take It!" : "Un Take It!"}
    />
  ) : (
    <Text>{props.distanceInfo.distance}</Text>
  );
}

export default DistanceHud;
