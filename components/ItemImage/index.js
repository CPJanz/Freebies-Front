import React from "react";
import ImageScroll from "../ImageScroll";
import PlaceholderImage from "../PlaceholderImage";
import { Image } from "react-native-expo-image-cache";
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
          <PlaceholderImage opacity={this.props.opacity} />
          <Image
            style={{
              height: 300,
              flex: 1,
              borderRadius: 15,
              opacity: this.props.opacity,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0
            }}
            {...{
              uri: this.props.images[0]
            }}
          />
        </View>
      );
    }
  }
}
