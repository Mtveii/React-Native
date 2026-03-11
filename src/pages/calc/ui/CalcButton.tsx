import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { CalcButtonTypes } from "../model/CalcButtonTupes";

export default function CalcButton({buttonType, text} : 
    {buttonType?: CalcButtonTypes, text?: string}) {

    const containerStyle =
         buttonType === CalcButtonTypes.digit ? [CalcButtonStyle.container, CalcButtonStyle.digitContainer] 
        :buttonType === CalcButtonTypes.equal ? [CalcButtonStyle.container, CalcButtonStyle.equalContainer] 
        :CalcButtonStyle.functionContainer; 

    const textStyle =
         buttonType === CalcButtonTypes.digit ? [CalcButtonStyle.text, CalcButtonStyle.digitText] 
        :buttonType === CalcButtonTypes.equal ? [CalcButtonStyle.text, CalcButtonStyle.equalText] 
        :CalcButtonStyle.functionText; 

    return <TouchableOpacity style ={[CalcButtonStyle.container, containerStyle]}>
        <Text style={[CalcButtonStyle.text, textStyle]}>{text}</Text>
    </TouchableOpacity>;
}

const CalcButtonStyle = StyleSheet.create({
    container: {
        backgroundColor: "#2C333E",
        borderRadius: 6.0,
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    digitContainer: {
        backgroundColor :"#353A4E",
    },
    functionContainer: {
        backgroundColor :"#2C333E",
    },
    equalContainer: {
        backgroundColor :"#4CC3FE",
    },
    text: {
        color: "#D3DBE2",
    },
    digitText: {
        color: "#D3DBE2",
    },
    functionText: {
        color: "#AAAA",
    },
    equalText: {
        color: "#333",
    }
    
});