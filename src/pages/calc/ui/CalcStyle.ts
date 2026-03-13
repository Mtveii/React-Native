import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";

const CalcStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: "#1B2125",
        width: "100%",
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
        // fontSize: 60.0,
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
    keyboard: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 4.0,
        marginHorizontal: 6.0,
        marginVertical: 8.0,
    },
    buttonsRow: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 4.0,
    },
});

export default CalcStyle;
