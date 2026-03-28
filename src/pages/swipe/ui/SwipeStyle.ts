import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";


const SwipeStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: "center",
    },
    gameField: {
        backgroundColor: "#555 ",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",

    },
    tittle:{
        backgroundColor: "#444",
        alignContent: "center",
        justifyContent: "center",
    },
    tettleText: {
        color: Colors.primaryTextColor,
        fontSize: 30,
    },
    tile: {
        flex: 1,
        backgroundColor: "#333",
        alignContent: "center",
        justifyContent: "center",
        margin: 2.0,
    },
    tileContainer: {
        alignContent: "center",
        justifyContent: "space-between",
    }
})


export default SwipeStyle;