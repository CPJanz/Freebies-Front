import { StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        
    },

    appName: {
        marginTop:"30%",
        height:150
    },

    content: {
        width:"80%"
    },

    button: {
        textAlign:"center",
        alignSelf: "center"
    },

    buttonText: {
        paddingBottom: 30,
        bottom: 0,
        color: "#F3D34A",
        fontSize: 24,
        justifyContent: "space-between"
    }
})