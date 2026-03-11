import { Text, View } from "react-native";
import CalcStyle from "./ui/CalcStyle";
import CalcButton from "./ui/CalcButton";
import { CalcButtonTypes } from "./model/CalcButtonTupes";

export default function Calc() {
    return <View style={CalcStyle.pageContainer}>
        <Text style={CalcStyle.pageTitle}>Calculator</Text>
        <Text style={CalcStyle.expretion}>23+45 = </Text>
        <Text style={CalcStyle.result}>68</Text>
        <View style={CalcStyle.memoryRow} >
            <Text>Memory button</Text>
        </View>
        <View style={CalcStyle.KeyBoard}>
            <View style={CalcStyle.buttonRow}>
                <CalcButton text="%" />
                <CalcButton text="CE" />
                <CalcButton text="C"  />
                <CalcButton text={"\u232B"} />
            </View>
            <View style={CalcStyle.buttonRow}>
                <CalcButton text={"\u00b9/\u2093"}/>
                <CalcButton text={"x\u00B2"}/>
                <CalcButton text={"\u00B2\u221ax\u0305"}/>
                <CalcButton text={"\u00F7"} />
            </View>
            <View style={CalcStyle.buttonRow}>
                <CalcButton text="9"buttonType={CalcButtonTypes.digit} />
                <CalcButton text="8"buttonType={CalcButtonTypes.digit} />
                <CalcButton text="7"buttonType={CalcButtonTypes.digit} />
                <CalcButton text={"\u00D7"}/>
            </View>
            <View style={CalcStyle.buttonRow}>
                <CalcButton text="4"buttonType={CalcButtonTypes.digit} />
                <CalcButton text="5"buttonType={CalcButtonTypes.digit} />
                <CalcButton text="6"buttonType={CalcButtonTypes.digit} />
                <CalcButton text={"\u2212"}/>
            </View>
            <View style={CalcStyle.buttonRow}>
                <CalcButton text="1"buttonType={CalcButtonTypes.digit} />
                <CalcButton text="2"buttonType={CalcButtonTypes.digit} />
                <CalcButton text="3"buttonType={CalcButtonTypes.digit} />
                <CalcButton text={"\uFF0B"}/>
            </View>
            <View style={CalcStyle.buttonRow}>
                <CalcButton text={"\u207a\u2215\u208b"}buttonType={CalcButtonTypes.digit} />
                <CalcButton text="0"buttonType={CalcButtonTypes.digit} />
                <CalcButton text="."buttonType={CalcButtonTypes.digit} />
                <CalcButton text={"\uFF1D"} buttonType={CalcButtonTypes.equal} />
            </View>
        </View>
    </View>;
}