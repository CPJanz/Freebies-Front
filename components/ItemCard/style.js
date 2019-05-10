import { StyleSheet} from 'react-native';
import { white } from 'ansi-colors';


export default styles = StyleSheet.create({
    topLeft: {
        position: "absolute",
        top: 0,
        left: 0,
<<<<<<< HEAD
        backgroundColor:"transparent",
        color: "#424242",
=======
        backgroundColor: "transparent"
        
>>>>>>> 1af87d4020b4601c243dd449dee6121307b84de7
    },
    topRight: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor:"transparent",
        color: "#424242"
    },
    
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(225, 225, 225,.65)",
        width: "100%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    }
})