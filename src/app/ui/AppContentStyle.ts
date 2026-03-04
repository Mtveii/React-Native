import { StyleSheet } from "react-native";
import Colors from "../../features/config/Colors";

const AppConstStyle = StyleSheet.create({
    container:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%"
    },
    text:{
        color: Colors.primaryTextColor,
    },
    ButonBar:{
        backgroundColor: "#333",
        height: 60.0, 
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
    },
    TopBar:{
        backgroundColor: "#333",
        height: 50.0, 
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    TopBarIcon: {
        backgroundColor: "#bbb",
        height: 42.0, 
        width: 42.0,
        marginHorizontal: 10.0,
    },
    TopBarTitle:{
        color:"#f1f1f1",
        height: 42.0, 
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        width: 42.0,
        textAlign: "center",
    },
    ButonBarIcon:{
        backgroundColor: "#bbb",
        height: 42.0, 
         width: 42.0,
        marginHorizontal: 10.0,

    },
    pegeWiget:{
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: "#575757ff",

        
    }

})

export default AppConstStyle;