import React from "react";
import { ScrollView, Image, Text } from "react-native";

function ImageScroll(props) {
  return (
    <ScrollView style={{ borderRadius: 15 }}
      horizontal={true}
      decelerationRate={0}
      snapToInterval={400} //your element width
      snapToAlignment={"center"}
    >
      {props.images.map((image, key) => {
        return (
          <Image
            source={{ uri: image }}
            style={{ height: 300, width: 400, flex: 1 }}
            key={key}
          />
        );
      })}
    </ScrollView>
  );
}

export default ImageScroll;
