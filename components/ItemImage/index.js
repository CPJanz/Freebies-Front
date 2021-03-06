import React from "react";
import ImageScroll from "../ImageScroll";
import { Image } from "react-native-expo-image-cache";
import { View } from "native-base";
import { Dimensions } from "react-native";
import PlaceholderImage from "../PlaceholderImage";
const imageWidth = Dimensions.get("window").width * 0.915;

export default class ItemImage extends React.Component {
  render() {
    if (this.props.images.length > 1) {
      return (
        <ImageScroll images={this.props.images} opacity={this.props.opacity} scroll={this.props.scroll}/>
      );
    } else {
      return (
        <View>
          <PlaceholderImage opacity={this.props.opacity} />
          <Image
            style={{
              height: 300,
              width: imageWidth,
              flex: 1,
              borderRadius: 15,
              opacity: this.props.opacity,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0
            }}
            {...{ uri: this.props.images[0] }}
          />
        </View>
      );
    }
  }
}
