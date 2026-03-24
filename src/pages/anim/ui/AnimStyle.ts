import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";


const AnimStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%"

    },
    title:{
        color: Colors.primaryTextColor,
        textAlign: "center",
    },
    anim: {
        flex: 1,
        minHeight: 120.0,
    },
    row:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        minHeight: 150.0,
    },
    block: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    demo: {
        backgroundColor: "#777",
        flex: 1,
        width: 100.0,
        minHeight: 100.0,
        marginVertical: 10.0,
    },
    subtitle:{
        color: Colors.primaryTextColor,
        textAlign: "center",
    }
})

export default AnimStyle;