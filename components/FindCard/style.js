import { StyleSheet} from 'react-native';


export default styles = StyleSheet.create({
    topLeft: {
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "rgba(255,255,255,.5)",
        borderRadius: 0,
        borderBottomRightRadius: 50
    },
    topRight: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "rgba(255,255,255,.5)",
        borderRadius: 0,
        borderBottomLeftRadius: 50
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(255,255,255,.5)",
        width: "100%"
    }
    });