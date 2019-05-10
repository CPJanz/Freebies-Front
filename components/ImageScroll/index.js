import React from "react";
import { ScrollView, Image, View } from "react-native";
import PlaceholderImage from "../PlaceholderImage";

function ImageScroll(props) {
  return (
    <View>
      <PlaceholderImage opacity={props.opacity} />
      <ScrollView
        style={{
          borderRadius: 15,
          opacity: props.opacity,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: 0
        }}
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
    </View>
  );
}

export default ImageScroll;
