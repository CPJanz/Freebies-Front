import React from "react";
import { ScrollView, Image, View } from "react-native";

function PlaceholderImage(props) {
  return (
    <Image
      source={require("../../assets/images/bee.png")}
      style={{
        height: 300,
        width: 340,
        borderRadius: 15,
        opacity: props.opacity === 1 ? 0.5 : 0
      }}
    />
  );
}

export default PlaceholderImage;
