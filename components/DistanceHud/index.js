import React from "react";
import { Button, Text } from "react-native";
import TakeButton from "../TakeButton";

function DistanceHud(props) {
  return props.distanceInfo.showTaken ? (
    <TakeButton onPress={props.onPress} available={props.available}/>
  ) : (
    <Text style={{color: "#FFFFFF", fontSize: 22, fontWeight: "bold"}}> {props.distanceInfo.distance}</Text>
  );
}

export default DistanceHud;
