import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";

const CalcStyle = StyleSheet.create({
    displayLand: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    keyboardLand: {
        flex: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4.0,
        paddingHorizontal: 8.0,
        paddingVertical: 4.0,
    },
    sidePanel: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 8.0,
    },
    mainPanel: {
        flex: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 4.0,
    },
    buttonsRowLand: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4.0,
    },
    displayLeftLand: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    resultLand: {
        flex: 1,
        // backgroundColor: "#282828",
        color: "#F7FFFF",
        textAlign: "right",
        marginRight: 10.0,
    },

    pageContainer: {
        flex: 1,
        backgroundColor: "#1B2125",
        width: "100%",
    },
    display: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    keyboard: {
        flex: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 4.0,
        marginHorizontal: 6.0,
        marginVertical: 8.0,
    },
    pageTitle: {
        fontWeight: 600,
        color: Colors.primaryTextColor,
    },
    expression: {
        color: "#A5AABD",
        fontSize: 20.0,
        textAlign: "right",
        marginRight: 10.0,
        marginTop: 10.0,
    },
    result: {
        color: "#F7FFFF",
        textAlign: "right",
        marginRight: 10.0,
        marginVertical: 15.0,
    },
    memoryRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: "#333",
        paddingVertical: 10.0,
    },
    buttonsRow: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4.0,
    },
    
});

export default CalcStyle;