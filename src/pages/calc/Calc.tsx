import { Text, useWindowDimensions, View } from "react-native";
import CalcStyle from "./ui/CalcStyle";
import CalcButton from "./ui/CalcButton";
import { CalcButtonTypes } from "./model/CalcButtonTypes";
import { useState } from "react";
import { CalcOperations } from "./model/CalcOperations";




const maxDigits = 20;
const dotSymbol = ",";
const minusSymbol = "\u2212";

interface ICalcState {
    expression: string,
    result: string,
    isNeedClear: boolean,
    operation?: CalcOperations,
    prevArgument?: number,
    isNeedClearEntry: boolean,
};

const initCalcState:ICalcState = {
    expression: "",
    result: "0",
    isNeedClear: true,
    isNeedClearEntry: false,
}

    export default function Calc() {
        const [calcState, setCalcState] = useState<ICalcState>(initCalcState);

        // врахування конфігурації: поворот екрану (орієнтація пристрою)
        const {width, height} = useWindowDimensions();

        // #region Functions
    const calculate = () => {
        if (!calcState.operation) return NaN;

        const current = resToNum(calcState.result);
        const prev = calcState.prevArgument ?? 0;

        switch (calcState.operation) {
            case CalcOperations.add: return prev + current;
            case CalcOperations.sub: return prev - current;
            case CalcOperations.mul: return prev * current;
            case CalcOperations.div: return prev / current;
            case CalcOperations.pow: return Math.pow(prev, current);
            case CalcOperations.sqrt: return Math.sqrt(prev);
            default: return NaN;
        }
    };

    const unaryOperation = (oper: CalcOperations, symbol: string) => {
        const current = resToNum(calcState.result);
        let result = current;
        let expression = "";

        switch (oper) {
            case CalcOperations.pow:
                result = Math.pow(current, 2);
                expression = `${calcState.result}² =`;
                break;
            case CalcOperations.sqrt:
                result = Math.sqrt(current);
                expression = `√${calcState.result} =`;
                break;
            default:
                return;
        }

        setCalcState({
            ...calcState,
            result: numToRes(result),
            expression,
            operation: undefined,
            prevArgument: undefined,
            isNeedClear: true,
        });
    };

const equalClick = () => {
    if (!calcState.operation) return;

    const result = calculate();

    setCalcState({
        ...calcState,
        result: numToRes(result),
        expression: `${calcState.expression} ${calcState.result} =`,
        operation: undefined,
        prevArgument: undefined,
        isNeedClear: true,
    });
};
 
    const operButtonClick = (oper:CalcOperations, symbol:string) => {
        setCalcState({...calcState,
            operation: oper,
            expression: `${calcState.result} ${symbol}`,
            prevArgument: resToNum(calcState.result),
            isNeedClearEntry: true,
        })
    };
    
    const resToNum = (res:string):number => { 
        return Number(res
            .replace(dotSymbol, '.')
            .replace(minusSymbol, '-')
        );
    };

    const numToRes = (num:number):string => {
        return num.toString()
            .replace('.', dotSymbol)
            .replace('-', minusSymbol);
    };

    const invClick = () => {
        let arg = resToNum(calcState.result);
        arg = 1.0 / arg;
        setCalcState({...calcState,
            result: numToRes(arg),
            expression: `1 / ${calcState.result} =`,
            isNeedClear: true
        });
    };

    const digitClick = (text:string) => {
        let res = calcState.result;
        if(res == '0' || calcState.isNeedClear || calcState.isNeedClearEntry) {
            res = '';
        }
        let digitCount = res.replace(/[^0-9]/g, '').length;
        if(digitCount < maxDigits) {
            res += text;
        }
        setCalcState({...calcState,
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
       setCalcState({...calcState,
            result: "0",
       });
    };

    const backspaceClick = () => {
        // відкорегувати на залишок символа "-" (він не повинен залишатись сам)
        let len = calcState.result.length;
        let res = len > 1 ? calcState.result.substring(0, len - 1) : "0";
        if(res == minusSymbol) {
            res = '0';
        }
        setCalcState({...calcState,
            result: res,
       });
    }

    const dotClick = (text:string) => {   // десятична точка: додається в кінець АЛЕ якщо її немає раніше
        if(!calcState.result.includes(text)) {
            setCalcState({...calcState,
                result: calcState.isNeedClear || calcState.isNeedClearEntry
                    ? "0" + text
                    : calcState.result + text,
                expression: calcState.isNeedClear ? "" : calcState.expression,
                isNeedClear: false,
                isNeedClearEntry: false,
            });
        }
    };

    const pmClick = () => {   // зміна знаку: додається "-" до початку числа, якщо його немає, інакше прибирається
        if(calcState.result == '0') return;
        if(calcState.isNeedClear) {
            clearClick();
            return;
        }
        if(calcState.isNeedClearEntry) {
            clearEntryClick();
            return;
        }
        let res = calcState.result.startsWith(minusSymbol)
        ? calcState.result.substring(1)
        : minusSymbol + calcState.result;

        setCalcState({...calcState,
            result: res,
        });
    };
    // #endregion
    
    const resultFontSize = calcState.result.length <= 11 ? 60.0 : 660.0 / calcState.result.length;

    // розмітка при вертикальному положенні пристрою
    const PortraitView = () => <View style={CalcStyle.pageContainer}>
        <View style={CalcStyle.display}>
            <Text style={CalcStyle.pageTitle}>Calculator</Text>
            <Text style={CalcStyle.expression}>{calcState.expression}</Text>
            <Text style={[CalcStyle.result, {fontSize: resultFontSize}]}>{calcState.result}</Text>
        </View>    

        <View style={CalcStyle.keyboard}>
            <View style={CalcStyle.memoryRow}>
                <Text>Memory buttons</Text>
            </View>
            <View style={CalcStyle.buttonsRow}>
                <CalcButton text="%" onPress={() => console.log("Press")}/>
                <CalcButton text="CE" onPress={clearEntryClick} />
                <CalcButton text="C" onPress={clearClick} />
                <CalcButton text={"\u232B"} onPress={backspaceClick}/>
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"\u00b9/\u2093"} onPress={invClick}/>
                <CalcButton text={"x\u00b2"}  onPress={(face) => unaryOperation(CalcOperations.pow, face)}/>
                <CalcButton text={"\u00B2\u221ax\u0305"}  onPress={(face) => unaryOperation(CalcOperations.sqrt, face)}/>
                <CalcButton text={"\u00F7"} onPress={(face) => operButtonClick(CalcOperations.div, face)} />
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text="7" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="8" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="9" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u00D7"} onPress={(face) => operButtonClick(CalcOperations.mul, face)}/>
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text="4" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="5" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="6" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u2212"} onPress={(face) => operButtonClick(CalcOperations.sub, face)} />
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text="1" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="2" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="3" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\uFF0B"} onPress={(face) => operButtonClick(CalcOperations.add, face)}/>
            </View>
             <View style={CalcStyle.buttonsRow}>
                <CalcButton text={"\u207a\u2215\u208b"} buttonType={CalcButtonTypes.digit} onPress={pmClick} />
                <CalcButton text="0" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={dotSymbol} buttonType={CalcButtonTypes.digit} onPress={dotClick}/>
                <CalcButton text={"\uFF1D"} buttonType={CalcButtonTypes.equal} onPress={equalClick} />
            </View>
        </View>
    </View>; 

    // розмітка при горизонтальному положенні пристрою
    const LandscapeView = () => <View style={CalcStyle.pageContainer}>
        <View style={CalcStyle.displayLand}>
            <View style={CalcStyle.displayLeftLand}>
                <Text style={CalcStyle.pageTitle}>Calculator</Text>
                <Text style={CalcStyle.expression}>{calcState.expression}</Text>
                <View style={CalcStyle.memoryRow}>
                    <Text>Memory buttons</Text>
                </View>
            </View>
            <Text style={[CalcStyle.resultLand, {fontSize: resultFontSize}]}>{calcState.result}</Text>
        </View>

        <View style={CalcStyle.keyboardLand}>
            <View style={CalcStyle.buttonsRowLand}>
                <CalcButton text="%" onPress={() => console.log("Press")}/>
                <CalcButton text="7" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="8" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="9" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u00F7"} onPress={(face) => operButtonClick(CalcOperations.div, face)} />
                <CalcButton text="C" onPress={clearClick} />
            </View>
            <View style={CalcStyle.buttonsRowLand}>
                <CalcButton text={"\u00b9/\u2093"} onPress={invClick}/>
                <CalcButton text="4" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="5" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="6" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u00D7"} onPress={(face) => operButtonClick(CalcOperations.mul, face)}/>
                <CalcButton text="CE" onPress={clearEntryClick} />
            </View>
            <View style={CalcStyle.buttonsRowLand}>
                <CalcButton text={"x\u00b2"} onPress={(face) => unaryOperation(CalcOperations.pow, face)} />
                <CalcButton text="1" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="2" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text="3" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={"\u2212"} onPress={(face) => operButtonClick(CalcOperations.sub, face)} />
                <CalcButton text={"\u232B"} onPress={backspaceClick}/>
            </View>
            <View style={CalcStyle.buttonsRowLand}>
                <CalcButton text={"\u00B2\u221ax\u0305"} onPress={(face) => unaryOperation(CalcOperations.sqrt, face)} />
                <CalcButton text={"\u207a\u2215\u208b"} buttonType={CalcButtonTypes.digit} onPress={pmClick} />
                <CalcButton text="0" buttonType={CalcButtonTypes.digit} onPress={digitClick} />
                <CalcButton text={dotSymbol} buttonType={CalcButtonTypes.digit} onPress={dotClick}/>
                <CalcButton text={"\uFF0B"} onPress={(face) => operButtonClick(CalcOperations.add, face)}/>
                <CalcButton text={"\uFF1D"} buttonType={CalcButtonTypes.equal} onPress={equalClick} />
            </View>
        </View>
    </View>;

    // Задача: у ландшафтному режимі додати колонку кнопок sinx, cosx, tanx, ctgx


    return width < height ? PortraitView() : LandscapeView();
}

