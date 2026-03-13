import { Text, View } from "react-native";
import CalcStyle from "./ui/CalcStyle";
import CalcButton from "./ui/CalcButton";
import { CalcButtonTypes } from "./model/CalcButtonTypes";
import { useState } from "react";
import { CalcOperations } from "./model/CalcOperations";

const maxDigits = 20;
const dotSymbol = ",";
const minusSymbol = "\u2212";

interface ICalcState {
    expression: string;
    result: string;
    isNeedClear: boolean;
    operation?: CalcOperations;
    prevArgument?: number;
    isNeedClearEntry: boolean;
}

const initCalcState: ICalcState = {
    expression: "",
    result: "0",
    isNeedClear: true,
    isNeedClearEntry: false,
};

export default function Calc() {
    const [calcState, setCalcState] = useState<ICalcState>(initCalcState);

    const resToNum = (res: string): number => {
        return Number(res.replace(dotSymbol, ".").replace(minusSymbol, "-"));
    };

    const numToRes = (num: number): string => {
        return num.toString().replace(".", dotSymbol).replace("-", minusSymbol);
    };

    const equalClick = () => {
        if (!calcState.operation) return;

        const current = resToNum(calcState.result);
        const prev = calcState.prevArgument ?? 0;

        const result =
            calcState.operation === CalcOperations.add
                ? prev + current
                : calcState.operation === CalcOperations.sub
                ? prev - current
                : calcState.operation === CalcOperations.mul
                ? prev * current
                : calcState.operation === CalcOperations.div
                ? prev / current
                : current;

        setCalcState({
            ...calcState,
            result: numToRes(result),
            expression: `${calcState.expression} ${calcState.result} =`,
            operation: undefined,
            prevArgument: undefined,
            isNeedClear: true,
        });
    };

    const operButtonClick = (oper: CalcOperations, face: string) => {
        setCalcState({
            ...calcState,
            operation: oper,
            expression: `${calcState.result} ${face}`,
            prevArgument: resToNum(calcState.result),
            isNeedClearEntry: true,
        });
    };

    const digitClick = (text: string) => {
        let res = calcState.result;

        if (res === "0" || calcState.isNeedClear || calcState.isNeedClearEntry) {
            res = "";
        }

        if (res.length < maxDigits + (res.includes(dotSymbol) ? 1 : 0)) {
            res += text;
        }

        setCalcState({
            ...calcState,
            result: res,
            expression: calcState.isNeedClear ? "" : calcState.expression,
            isNeedClear: false,
            isNeedClearEntry: false,
        });
    };

    const clearClick = () => {
        setCalcState(initCalcState);
    };

    const clearEntryClick = () => {
        setCalcState({
            ...calcState,
            result: "0",
        });
    };

    const backspaceClick = () => {
        let len = calcState.result.length;
        let res = len > 1 ? calcState.result.substring(0, len - 1) : "0";

        if (res === minusSymbol) {
            res = "0";
        }

        setCalcState({
            ...calcState,
            result: res,
        });
    };

    const dotClick = (text: string) => {
        if (!calcState.result.includes(text)) {
            setCalcState({
                ...calcState,
                result: calcState.result + text,
            });
        }
    };

    const invClick = () => {
        let arg = resToNum(calcState.result);
        arg = 1 / arg;

        setCalcState({
            ...calcState,
            result: numToRes(arg),
            expression: `1 / ${calcState.result} =`,
            isNeedClear: true,
        });
    };

    const pmClick = () => {
        if (calcState.result === "0") return;

        const res = calcState.result.startsWith(minusSymbol)
            ? calcState.result.substring(1)
            : minusSymbol + calcState.result;

        setCalcState({
            ...calcState,
            result: res,
        });
    };

    const resultFontSize =
        calcState.result.length <= 11 ? 60 : 660 / calcState.result.length;

    return (
        <View style={CalcStyle.pageContainer}>
            <Text style={CalcStyle.pageTitle}>Calculator</Text>
            <Text style={CalcStyle.expression}>{calcState.expression}</Text>
            <Text style={[CalcStyle.result, { fontSize: resultFontSize }]}>
                {calcState.result}
            </Text>

            <View style={CalcStyle.memoryRow}>
                <Text>Memory buttons</Text>
            </View>

            <View style={CalcStyle.keyboard}>
                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="%" onPress={() => console.log("Press")} />
                    <CalcButton text="CE" onPress={clearEntryClick} />
                    <CalcButton text="C" onPress={clearClick} />
                    <CalcButton text="\u232B" onPress={backspaceClick} />
                </View>

                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="\u00b9/\u2093" onPress={invClick} />
                    <CalcButton text={"x\u00b2"} />
                    <CalcButton text="\u00B2\u221ax\u0305" />
                    <CalcButton
                        text="\u00F7"
                        onPress={(face: string) =>
                            operButtonClick(CalcOperations.div, face)
                        }
                    />
                </View>

                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="7" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                    <CalcButton text="8" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                    <CalcButton text="9" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                    <CalcButton
                        text="\u00D7"
                        onPress={(face: string) =>
                            operButtonClick(CalcOperations.mul, face)
                        }
                    />
                </View>

                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="4" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                    <CalcButton text="5" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                    <CalcButton text="6" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                    <CalcButton
                        text="\u2212"
                        onPress={(face: string) =>
                            operButtonClick(CalcOperations.sub, face)
                        }
                    />
                </View>

                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="1" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                    <CalcButton text="2" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                    <CalcButton text="3" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                    <CalcButton
                        text="\uFF0B"
                        onPress={(face: string) =>
                            operButtonClick(CalcOperations.add, face)
                        }
                    />
                </View>

                <View style={CalcStyle.buttonsRow}>
                    <CalcButton text="\u207a\u2215\u208b" buttonType={CalcButtonTypes.digit} onPress={pmClick} />
                    <CalcButton text="0" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                    <CalcButton text={dotSymbol} buttonType={CalcButtonTypes.digit} onPress={dotClick} />
                    <CalcButton text="\uFF1D" buttonType={CalcButtonTypes.equal} onPress={equalClick} />
                </View>
            </View>
        </View>
    );
}