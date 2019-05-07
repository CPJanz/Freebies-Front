import React from "react";
import ImageScroll from "../ImageScroll";
import { Image } from "react-native";

export default class ItemImage extends React.Component {
  render() {
    if (this.props.images.length > 1) {
      return <ImageScroll images={this.props.images} />;
    } else {
      return (
        <Image
          source={{ uri: this.props.images[0] }}
          style={{ height: 300, width: 340, flex: 1 }}
        />
      );
    }
  }
}
