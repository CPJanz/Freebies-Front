import { StyleSheet} from 'react-native';
import { white } from 'ansi-colors';


export default styles = StyleSheet.create({
    topLeft: {
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor:"rgba(225, 225, 225, .9)",
        width: "50%",
        height: "15%",
        borderTopLeftRadius: 15,
        marginTop: 0,
        paddingTop: 9,
        fontSize: 22,
        fontWeight: "bold"
    },

    topRight: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "50%",
        height: "15%",
        backgroundColor:"rgba(225, 225, 225,.9)",
        borderTopRightRadius: 15,
        marginTop: 0,
        paddingTop: 5,
        flex: 1,
        justifyContent: "flex-end",
        fontSize: 22
    },
    
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(225, 225, 225,.8)",
        width: "100%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    }
})