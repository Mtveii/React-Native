import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";

const HomeStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    pageTitle: {
        color: Colors.primaryTextColor,
        fontWeight: 600,
        textAlign: "center",
        fontSize: 20.0,
        marginVertical: 10.0,
    },
    navItem: {
        borderWidth: 1.0,
        borderColor: Colors.primaryTextColor,
        borderRadius: 5.0,
        marginHorizontal: 20.0,
        marginVertical: 10.0,
        padding: 10.0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    navImage: {
        tintColor: Colors.primaryTextColor,
        width: 50.0,
        height: 50.0,
        marginRight: 10.0,
    },
    navText: {
        color: Colors.primaryTextColor,
        fontSize: 18.0,
    }
});

export default HomeStyle;