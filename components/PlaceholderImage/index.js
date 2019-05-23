import React from "react";
import { Image, Dimensions } from "react-native";
const dimensions = Dimensions.get('window');

function PlaceholderImage(props) {
  return (
    <Image
      source={require("../../assets/images/bee.png")}
      style={{
        height: 300,
        width: dimensions.width * 0.915,
        borderRadius: 15,
        opacity: props.opacity === 1 ? 0.5 : 0
      }}
    />
  );
}

export default PlaceholderImage;
