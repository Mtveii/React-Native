import { GestureResponderEvent, Pressable, Text, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import SwipeStyle from "./ui/SwipeStyle"; 
import { useState } from "react";

let eventBegin:GestureResponderEvent|null = null;
const minSwipeLength = 10.0;
const minSwipeVelocity = 100.0 / 400.0;   // 100 пікселів за 400 мілісекунд

export default function Swipe() {
    const {width, height} = useWindowDimensions();
    const shortestSide = Math.min(width, height);
    const fieldSize = 0.96 * shortestSide;
    const tileSize = fieldSize / 4.0;
    const [text, setText] = useState<string>("");
    const [field, setField] = useState<Array<number>>(Array.from({ length: 16 }, (_, i) => (3*i + 5) % 16));
    const [difficulty , setdifficulty] = useState<number>(1)

    const onSwipeRight = () => {
        let emptyTileIndex = field.findIndex(i => i == 0);
        if(emptyTileIndex % 4 == 0) {
            setText("Рух неможливий");
            return;
        }
        field[emptyTileIndex] = field[emptyTileIndex - 1];
        field[emptyTileIndex - 1] = 0;
        setField([...field]);
    }
    const onSwipeLeft = () => {
        let emptyTileIndex = field.findIndex(i => i == 0);
        // свайп ліворуч переміщує на порожнє місце праву від нього тайлу

        if(emptyTileIndex % 4 == 3) {
            setText("Рух неможливий");
            return;
        }
        field[emptyTileIndex] = field[emptyTileIndex + 1];
        field[emptyTileIndex + 1] = 0;
        setField([...field]);
    }
    const onSwipeUp = () => {
        let emptyTileIndex = field.findIndex(i => i == 0);

        if(emptyTileIndex >= 12) {
            setText("Рух неможливий");
            return;
        }
        field[emptyTileIndex] = field[emptyTileIndex + 4];
        field[emptyTileIndex + 4] = 0;
        setField([...field]);
    }
    const onSwipeDoun = () => {
        let emptyTileIndex = field.findIndex(i => i == 0);

        if(emptyTileIndex < 4) {
            setText("Рух неможливий");
            return;
        }
        field[emptyTileIndex] = field[emptyTileIndex - 4];
        field[emptyTileIndex - 4] = 0;
        setField([...field]);
    }
    const f = ()=>{
        let emptyTileIndex = field.findIndex(i => i == 0);

        if (emptyTileIndex == ){
        
        }
    }

    const onGestureBegin = (event: GestureResponderEvent) => {
        /*
        event.nativeEvent.pageX/Y - відлік від меж пристрою (сторінки)
        event.nativeEvent.locationX/Y - від меж блоку-детектора
        */
        eventBegin = event;
    };
    const onGestureEnd = (event: GestureResponderEvent) => {
        if(eventBegin) {
            const dx = event.nativeEvent.pageX - eventBegin.nativeEvent.pageX;
            const dy = event.nativeEvent.pageY - eventBegin.nativeEvent.pageY;
            const dt = event.nativeEvent.timestamp - eventBegin.nativeEvent.timestamp;
            // є три рішення: жест є горизонтальним, вертикальним або невизначеним (у межах похибок) 
            const lenX = Math.abs(dx);   
            const lenY = Math.abs(dy);
            let result = "";
            if(lenX > 2 * lenY) {
                result = "Horizontal: ";
                // Горизонтальні жести також поділяємо на три варіанти:
                // свайп ліворуч, праворуч або не свайп (закороткий або заповільний)
                if(lenX < minSwipeLength) {
                    setText("too short");
                }
                else if(lenX / dt < minSwipeVelocity) {
                    setText("too slow");
                }
                else if(dx < 0) {
                    onSwipeLeft();
                }
                else {
                    onSwipeRight();
                }
            }
            else if(lenY > 2 * lenX) {
                result = "Vertical: ";
                if(lenY < minSwipeLength) {
                    setText("too short");
                }
                else if(lenY / dt < minSwipeVelocity) {
                    setText("too slow");
                }
                else if(dy < 0) {
                    onSwipeUp();
                }
                else {
                    onSwipeDoun();
                }
            }
            else {
                result = "Diagonal";
            }
            // setText( `\ndX=${dx}\ndY=${dy}\ndt=${dt}\n${result}` );
            // setText( `${result}` );
        }        
    };

    const isPortrait = width < height;
    return <View style={[SwipeStyle.pageContainer, {flexDirection: isPortrait ? "column" : "row"}]}>
        <Text>Swipe: {text}</Text>
        <TouchableWithoutFeedback onPressIn={onGestureBegin} onPressOut={onGestureEnd}>
            <View style={[SwipeStyle.gameField, {width: fieldSize, height: fieldSize}]}>
                {field.map(i => 
                <View style={[SwipeStyle.tileContainer, {width: tileSize, height: tileSize}]}>
                    {i != 0 && <View style={SwipeStyle.tile}>
                        <Text style={SwipeStyle.tileText}>{i}</Text>
                    </View>} 
                </View>)}
            </View>
        </TouchableWithoutFeedback>

        <View style={[SwipeStyle.difficultiContainer, {
            marginTop: isPortrait ? 40.0 : 0,
            marginLeft: isPortrait ? 0: 40.0
        }]}>
            <View style={[SwipeStyle.difficultiSelector, {
                flexDirection:isPortrait ? "row" :"column",
                height: isPortrait ? tileSize : fieldSize,
                width:isPortrait ? fieldSize : tileSize,
            }]}>
                <Pressable onPress={() => setdifficulty(1)} style={[difficulty == 1 ? SwipeStyle.difficultItemSelection : SwipeStyle.difficultItem]}><Text style={SwipeStyle.tileText}>1</Text></Pressable>
                <Pressable onPress={() => setdifficulty(2)} style={[difficulty == 2 ? SwipeStyle.difficultItemSelection : SwipeStyle.difficultItem]}><Text style={SwipeStyle.tileText}>2</Text></Pressable>
                <Pressable onPress={() => setdifficulty(3)} style={[difficulty == 3 ? SwipeStyle.difficultItemSelection : SwipeStyle.difficultItem]}><Text style={SwipeStyle.tileText}>3</Text></Pressable>
                <Pressable onPress={() => setdifficulty(4)} style={[difficulty == 4 ? SwipeStyle.difficultItemSelection : SwipeStyle.difficultItem]}><Text style={SwipeStyle.tileText}>4</Text></Pressable>
            </View>
        </View>
    </View>;
}
