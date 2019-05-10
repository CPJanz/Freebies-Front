import React from "react";
import { Button, Text, StyleSheet } from "react-native";
import styles from "./style";


function RepostButton(props) {
  // return props.distanceInfo.showTaken ? (
  //   <Button onPress={props.onPress} title="Repost" />
  // ) : (
  //   <Text>{props.distanceInfo.distance}</Text>
  // );

  return <Button color="#FFFFFF" fontSize="22" onPress={props.onPress} title="Repost" title="Repost"/>;
  
}

export default RepostButton;
