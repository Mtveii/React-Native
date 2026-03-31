import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";

const SwipeStyle = StyleSheet.create({
    pageContainer: {
        alignItems:"center",
    },
    gameField: {
        backgroundColor: "#555",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        // justifyContent: "space-between",
    },
    tileContainer: {
        alignItems: "stretch",
        justifyContent: "space-between",
    },
    tile: {
        flex: 1,
        backgroundColor: "#333",
        alignItems: "center",
        justifyContent: "center",
        margin: 2.0,
    },
    tileText: {
        color: Colors.primaryTextColor,
        fontSize: 30.0,
    },
    tileTextsuccess:{},
    difficultiContainer:{
        marginVertical: 10.0,
    },
    difficultiSelector: {
        backgroundColor: "#555"
    },
    difficultiRow:{
        flex: 1,
        backgroundColor: "#333",
        alignItems: "center",
        justifyContent: "center",
        margin: 2.0,
    },
    difficultItemSelection:{
        flex: 1,
        backgroundColor: "#333",
        alignItems: "center",
        justifyContent: "center",
        margin: 1.0,
    },
    difficultItem: {
        flex: 1,
        backgroundColor: "#454545",
        alignItems: "center",
        justifyContent: "center",
        margin: 2.0,
    },
});

export default SwipeStyle;