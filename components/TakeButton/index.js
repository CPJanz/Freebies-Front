import React from "react";
import { Button, Text } from "native-base";

function TakeButton(props) {
  return (
    <Button 
      transparent
      onPress={props.onPress}
      // title= {props.available ? "TAKE" : "PUT BACK"}
    ><Text style={{color: "#FFFFFF", fontSize:"22", fontWeight: "bold", marginLeft: -13, marginTop: -17}}>{props.available ? "Take" : "Put Back"}</Text></Button>
  );
}

export default TakeButton;
