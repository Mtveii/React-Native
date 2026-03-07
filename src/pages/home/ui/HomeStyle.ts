import { StyleSheet } from "react-native";

const HomeStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,
        alignItems: "center",
        display: "flex",
    },
    pageTitle: {
        fontWeight: 600,
        fontSize: 24,
        marginBottom: 20,

    },
    CardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: 330,
    },
    CardItem: {
        width: 95.0,
        height: 110.0,
        backgroundColor: "#eee",
        marginBottom: 20,
    },
    CardImg: {
        width: 95.0,
        height: 95.0,
        backgroundColor: "#acacac",
    },
    CardTitle: {
        fontSize: 12,
        textAlign: "center",
    },
});

export default HomeStyle;
