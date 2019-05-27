import React from "react";
import ImageScroll from "../ImageScroll";
import { Image } from "react-native-expo-image-cache";
import { View } from "native-base";
import { Dimensions } from "react-native";
const imageWidth = Dimensions.get("window").width * 0.915;

export default class ItemImage extends React.Component {
  preview = { uri: this.props.images[0].preview };
  uri = { uri: this.props.images[0].uri };

  render() {
    if (this.props.images.length > 1) {
      return (
        <ImageScroll images={this.props.images} opacity={this.props.opacity} />
      );
    } else {
      return (
        <View>
          <Image
            style={{
              height: 300,
              width: imageWidth,
              flex: 1,
              borderRadius: 15,
              opacity: this.props.opacity
            }}
            {...{ ...this.preview, ...this.uri }}
          />
        </View>
      );
    }
  }
}
