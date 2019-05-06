import React from "react";
import { ScrollView, Image } from "react-native";

export default class ItemImage extends React.Component {
  render() {
    if (this.props.images.length > 1) {
      return (
        <ScrollView
          horizontal={true}
          decelerationRate={0}
          snapToInterval={300} //your element width
          snapToAlignment={"center"}
        >
          {this.props.images.map((image, key) => {
            return (
              <Image
                source={{ uri: image }}
                style={{ height: 200, width: 300, flex: 1 }}
                key={key}
              />
            );
          })}
        </ScrollView>
      );
    } else {
      return (
        <Image
          source={{ uri: this.props.images[0] }}
          style={{ height: 200, width: 300, flex: 1 }}
        />
      );
    }
  }
}
