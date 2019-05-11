import React from "react";
import { Button, Text } from "native-base";


function RepostButton(props) {
  // return props.distanceInfo.showTaken ? (
  //   <Button onPress={props.onPress} title="Repost" />
  // ) : (
  //   <Text>{props.distanceInfo.distance}</Text>
  // );

  return <Button 
  transparent
  onPress={props.onPress}><Text style={{color: "#FFFFFF", fontSize: 22, fontWeight: "bold", marginRight: -20, marginTop: -10}}>Repost</Text>
  </Button>;
  
}

export default RepostButton;
