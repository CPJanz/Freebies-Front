import React from "react";
import ImageScroll from "../ImageScroll";
import { Image } from "react-native";
import { View } from "native-base";

export default class ItemImage extends React.Component {
  render() {
    if (this.props.images.length > 1) {
      return (
        <ImageScroll images={this.props.images} opacity={this.props.opacity} />
      );
    } else {
      return (
        <View>
          <Image
            source={require("../../assets/images/bee.png")}
            style={{
              height: 300,
              width: 340,
              opacity: this.props.opacity === 1 ? 1 : 0
            }}
          />
          <Image
            source={{ uri: this.props.images[0] }}
            style={{
              height: 300,
              width: 340,
              flex: 1,
              borderRadius: 15,
              opacity: this.props.opacity,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0
            }}
          />
        </View>
      );
    }
  }
}
