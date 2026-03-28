import { View, Text, useWindowDimensions, Touchable, GestureResponderEvent, TouchableWithoutFeedback, TextBase, } from 'react-native';
import SwipeStyle from './ui/SwipeStyle';
import { useState } from 'react';

let eventBegin:GestureResponderEvent|null;
const minSwipeLength = 10;
const minSwipeVelocity = 100 / 400.0;


export default function Swipe (){
    const {width, height} = useWindowDimensions();
    const shortestSide = Math.min(width, height);
    const fieldSize = 0.96 * shortestSide;
    const titleSize = fieldSize / 4;
    const [text, setText] = useState<string>("")
    const [field, setField] = useState<Array<number>>(Array.from({length: 16}, (_, i) => (3 * i + 5) % 16));

    const onSwipeRight = () => {
        let emptiIndex = field.findIndex(i => i == 0);


        if (emptiIndex % 4 == 0) {
            setText("Can't swipe right");
            return;
        }
        field[emptiIndex] = field[emptiIndex - 1];
        field[emptiIndex - 1] = 0;
        setField([...field]);
    }
    const onSwipeLeft = () => {
        let emptiIndex = field.findIndex(i => i == 0);


        if (emptiIndex % 4 == 3) {
            setText("Can't swipe left");
            return;
        }
        field[emptiIndex] = field[emptiIndex + 1];
        field[emptiIndex + 1] = 0;
        setField([...field]);
    }
    const onSwipeUp = () => {
        let emptiIndex = field.findIndex(i => i == 0);


        if (emptiIndex % 4 == 0) {
            setText("Can't swipe right");
            return;
        }
        field[emptiIndex] = field[emptiIndex - 1];
        field[emptiIndex - 1] = 0;
        setField([...field]);
    }
    const onSwipeDown = () => {
        let emptiIndex = field.findIndex(i => i == 0);


        if (emptiIndex % 4 == 3) {
            setText("Can't swipe left");
            return;
        }
        field[emptiIndex] = field[emptiIndex + 1];
        field[emptiIndex + 1] = 0;
        setField([...field]);
    }

    const onGestureBegin = (event: GestureResponderEvent) => {
        eventBegin = event
    }
    const onGestureEnd = (event: GestureResponderEvent) => {
        if(eventBegin) {
            const dx = event.nativeEvent.pageX - eventBegin.nativeEvent.pageX;
            const dy = event.nativeEvent.pageY - eventBegin.nativeEvent.pageY ;
            const dt = event.nativeEvent.timestamp - eventBegin.nativeEvent.timestamp;

            const lenX = Math.abs(dx);
            const lenY = Math.abs(dy);
            let result = "";

            if (lenX >  2 * lenY) {
               if (lenX < minSwipeLength) {
                    result = "Swipe too short";
                }
                else if (lenX / dt < minSwipeVelocity) {
                    result = "Swipe too slow";
                }
                else if (dx > 0) {
                    onSwipeRight();
                }
                else {

                    onSwipeLeft();
                }
            }
            else if (lenY > 2 * lenX) {
                if (lenX < minSwipeLength) {
                    result = "Swipe too short";
                }
                else if (lenY / dt < minSwipeVelocity) {
                    result = "Swipe too slow";
                }
                else if (dy > 0) {
                    onSwipeLeft();
                }
                else {
                    onSwipeRight();
                }
                }
            else {
                result = "Diagonal Swipe";
            }
            setText(`dX=${dx} dY=${dy} dt=${dt} (${result})` );
        }
    }

    return <View style= {[SwipeStyle.pageContainer, {flexDirection: width < height ? "column" : "row", alignItems: "center"}]} >
        <Text>Swipe: {text}</Text>
        <TouchableWithoutFeedback onPressIn={onGestureBegin} onPressOut={onGestureEnd}>
            <View style = {[SwipeStyle.gameField, {width: fieldSize, height: fieldSize}]}>
                {field.map(i => 
                    <View style={[SwipeStyle.tittle, {width: titleSize, height: titleSize}]}>
                        {i != 0 && <View style={SwipeStyle.tile}>
                                <Text style={SwipeStyle.tettleText}>{i }</Text>
                            </View>}
                    </View>)}
            </View>
        </TouchableWithoutFeedback>
    </View>;
}