import { View, Text, useWindowDimensions, Touchable, GestureResponderEvent, TouchableWithoutFeedback, TextBase, } from 'react-native';
import SwipeStyle from './ui/SwipeStyle';
import { useState } from 'react';

let eventBegin:GestureResponderEvent|null;


export default function Swipe (){
    const {width, height} = useWindowDimensions();
    const shortestSide = Math.min(width, height);
    const fieldSize = 0.96 * shortestSide;
    const [text, setText] = useState<string>("")

    const onGestureBegin = (event: GestureResponderEvent) => {
        eventBegin = event
    }
    const onGestureEnd = (event: GestureResponderEvent) => {
        if(eventBegin) {
            setText(`dX=${ event.nativeEvent.locationX - eventBegin.nativeEvent.locationX} dY=${event.nativeEvent.locationY - eventBegin.nativeEvent.locationY}` );
        }
    }

    return <View style= {{flexDirection: width < height ? "column" : "row", alignItems: "center"}}>
        <Text>Swipe: {text}</Text>
        <TouchableWithoutFeedback onPressIn={onGestureBegin} onPressOut={onGestureEnd}>
            <View style = {{width: fieldSize, height: fieldSize, backgroundColor: "#555"}}></View>
        </TouchableWithoutFeedback>
    </View>;
}