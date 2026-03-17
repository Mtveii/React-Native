import { StyleSheet } from "react-native";
import Colors from "../../../features/config/Colors";


const RateStyle = StyleSheet.create({
    pageContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%"

    },
    pageTittle:{
        color: Colors.primaryTextColor,
        fontWeight: 600,
        textAlign: "center",
        fontSize: 20.0,
        marginVertical:10.0,
    },
    rateLineEvent:{
        backgroundColor: "#444"
    },
    rateLineOdd:{
        backgroundColor: "#555"
    },
    rateLine:{
        display: "flex",
        flexDirection: "row",
        borderBottomColor: "#555",
        borderBottomWidth: 1.0,
        margin: 1.0,
    },
    rateCc:{
        flex: 1,
    },
    rateTxt:{
        flex: 5,
    },
    rateRate:{
        flex: 1.3,
        backgroundColor: "#644949a4"
    },


});

export default RateStyle;