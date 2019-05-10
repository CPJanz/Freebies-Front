import { StyleSheet} from 'react-native';


export default styles = StyleSheet.create({
    topLeft: {
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "transparent"
        
    },
    topRight: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "transparent"
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(255,255,255,.5)",
        width: "100%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    }
})