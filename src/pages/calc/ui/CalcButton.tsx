import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { CalcButtonTypes } from "../model/CalcButtonTypes";

export default function CalcButton({buttonType, text, onPress} :
    {buttonType?: CalcButtonTypes, text: string, onPress?: (text:string) => void}
) {
    const containerStyle = 
        buttonType == CalcButtonTypes.digit ? CalcButtonStyle.digitContainer
      : buttonType == CalcButtonTypes.equal ? CalcButtonStyle.equalContainer
      : CalcButtonStyle.funcContainer;

    const textStyle = 
        buttonType == CalcButtonTypes.digit ? CalcButtonStyle.digitText
      : buttonType == CalcButtonTypes.equal ? CalcButtonStyle.equalText
      : CalcButtonStyle.funcText;

    return <TouchableOpacity style={[CalcButtonStyle.container, containerStyle]} 
                onPress={() => { if(onPress) onPress(text) }}>
        <Text style={[CalcButtonStyle.text, textStyle]}>{text}</Text>
    </TouchableOpacity>;
}

const CalcButtonStyle = StyleSheet.create({
    container: {
        borderRadius: 5.0,
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    digitContainer: {
        backgroundColor: "#353A4E",
    },
    funcContainer: {
        backgroundColor: "#2C333E",
    },
    equalContainer: {
        backgroundColor: "#4CC3FE",
    },
    text: {
        fontSize: 28.0,
    },
    digitText: {
        color: "#D3DBE2",
    },
    funcText: {
        color: "#AAA",
    },
    equalText: {
        color: "#333",
    },
});
/*
Д.З. Кнопки управління памяттю калькулятора (MC MR M+ M- MS Mv)
- створити перелік (на базі константного об'єкту) MemoryButtonTypes.{enabled, disabled}
- створити компонент (TSX) - кнопку, що дозволяє зазначати тип та вмість (текст)
- розмістити кнопки, зазначити їх активність
Не забувати скріншоти
*/