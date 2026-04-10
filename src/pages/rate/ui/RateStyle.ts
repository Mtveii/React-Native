import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";


const RateStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: "#0e1220",
        paddingTop: 16,
        paddingHorizontal: 12,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
        width: "100%",
    },
    pageTitle: {
        color: Colors.primaryTextColor,
        fontWeight: "700",
        fontSize: 22,
        flex: 1,
    },
    dateButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "#1e2435",
        borderRadius: 12,
    },
    pageDate: {
        color: Colors.primaryTextColor,
        fontSize: 14,
    },
    search: {
        width: "100%",
        backgroundColor: "#161b2d",
        color: Colors.primaryTextColor,
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#2a334b",
        marginBottom: 16,
    },
    list: {
        width: "100%",
        flex: 1,
    },
    listContainer: {
        paddingBottom: 32,
        width: "100%",
    },
    rateLine: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 10,
    },
    rateLineEven: {
        backgroundColor: "#18203a",
    },
    rateLineOdd: {
        backgroundColor: "#1f2948",
    },
    rateTxt: {
        flex: 4,
        color: Colors.primaryTextColor,
        fontSize: 15,
    },
    rateCc: {
        flex: 1,
        color: Colors.primaryTextColor,
        textAlign: "center",
        fontWeight: "600",
    },
    rateRate: {
        flex: 1.2,
        color: Colors.successTextColor,
        textAlign: "right",
        fontWeight: "700",
    },
});

export default RateStyle;