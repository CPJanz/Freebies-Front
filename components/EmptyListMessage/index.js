import React from "react";
import { Image, View, Text } from "react-native";

function EmptyListMessage(props) {
  return (
    <View
      style={{
        flex: 0.2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: props.topPadding || 200
      }}
    >
      <Text style={{ fontSize: 25, paddingBottom: 0.5 * props.topPadding }}>
        {props.message}
      </Text>
      <Image
        source={require("../../assets/images/bee.png")}
        style={{ width: 125, height: 125 }}
      />
    </View>
  );
}

export default EmptyListMessage;
