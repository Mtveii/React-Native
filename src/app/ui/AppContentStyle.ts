import { StyleSheet } from "react-native";
import Colors from "../../features/config/Colors";
// import { Color } from "react-native";

const AppContentStyle = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
    },
    topBar: {
        backgroundColor: "#333",
        height: 50.0,  // dip - density independent pixel
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    topBarIcon: {
        backgroundColor: "#bbbbbb00",
        height: 42.0,
        marginHorizontal: 10.0,
        width: 42.0,
    },
    topBarBack: {
        fontSize: 38.0,
        color: Colors.primaryTextColor,
        marginLeft: 8.0,   
        marginTop: -6.0,       
        // lineHeight: 1.2,
        
    },
    topBarTitle: {
        color: Colors.primaryTextColor,
        flex: 1,
        fontSize: 16.75,
        fontWeight: 700,
        textAlign: "center",
    },
    pageWidget: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: Colors.primaryTextColor,
    },
    bottomBar: {
        backgroundColor: "#333",
        height: 60.0,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    bottomBarIcon: {
        tintColor: "#bbb",
        height: 42.0,
        width: 42.0,
    },

});

export default AppContentStyle;

/*
Д.З. На головному віджеті сторінки розмітити "прелоадер" 
товарів у вигляді напівпрозорих квадратів з плейсхолдерами
назви під ними

 *****     *****
 *****     *****
 *****     *****
 -----     -----

 *****     *****
 *****     *****
 *****     *****
 -----     -----

 *****     *****
 *****     *****
 *****     *****
 -----     -----

*/