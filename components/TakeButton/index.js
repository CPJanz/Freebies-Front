import React from "react";
import { Button, Text } from "native-base";



function TakeButton(props) {
  return (
    <Button 
      transparent
      // color="#FF0000"
      onPress={props.onPress}
      // title= {props.available ? "TAKE" : "PUT BACK"}
    ><Text style={{color: "#FFFFFF", fontSize:"22", fontWeight: "bold"}}>{props.available ? "TAKE" : "PUT BACK"}</Text></Button>
  );
}

export default TakeButton;
