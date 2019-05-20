import { StyleSheet } from "react-native";
import { white } from "ansi-colors";

export default (styles = StyleSheet.create({
  topLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, .001)",
    width: "50%",
    height: "15%",
    borderTopLeftRadius: 15,
    marginTop: 0,
    paddingTop: 9,
    fontSize: 22,
    fontWeight: "bold",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },

  topRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "50%",
    height: "15%",
    backgroundColor: "rgba(0, 0, 0, .001)",
    borderTopRightRadius: 15,
    marginTop: 0,
    paddingTop: 5,
    flex: 1,
    justifyContent: "flex-end",
    fontSize: 22,
    alignItems: "center",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, .001)",
    width: "100%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  }
}));
