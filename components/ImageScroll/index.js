import React from "react";
import { ScrollView, View } from "react-native";
import PlaceholderImage from "../PlaceholderImage";
import { Image } from "react-native-expo-image-cache";
import { Dimensions } from "react-native";
const imageWidth = Dimensions.get("window").width * 0.915;

function ImageScroll(props) {
  return (
    <View>
      <ScrollView
        style={{
          borderRadius: 15,
          opacity: props.opacity
        }}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={imageWidth} //your element width
        snapToAlignment={"center"}
      >
        {props.images.map((image, key) => {
          preview = { uri: image.preview };
          uri = { uri: image.uri };
          return (
            <Image
              style={{ height: 300, width: imageWidth, flex: 1 }}
              key={key}
              {...{ ...this.preview, ...this.uri }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default ImageScroll;
