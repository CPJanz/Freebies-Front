import { StyleSheet} from 'react-native';

export default styles = StyleSheet.create({

  container: {
    backgroundColor: "#c2dfe3"
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#c2dfe3"
  },

  form: {
    backgroundColor: "#c2dfe3",
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    justifyContent: "center",
    color: "#424242",
    fontSize: 22,
    fontWeight: "bold",
    margin: 10
  },

  whiteBox: {
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "white",
    width: "85%"
  },

  item: {
    borderColor: "transparent"
  },

  input: {
    margin: 15,
    padding: 20,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1
  },

  btnBox: {
    borderColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10
  },

  postBtn: {
    marginRight: 20,
    backgroundColor: "#f3d34a"
  },

  cancelBtn: {
    backgroundColor: "#f3d34a"
  }

});