import { Text, View } from "react-native";
import CalcStyle from "./ui/CalcStyle";

export default function Calc() {
    return <View style={CalcStyle.pageContainer}>
        <Text style={CalcStyle.pageTitle}>Calculator</Text>
    </View>;
}