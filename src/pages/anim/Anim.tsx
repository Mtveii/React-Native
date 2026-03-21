import { View, Text, Pressable, Animated } from "react-native";
import AnimStyle from "./ui/AnimStyle";
import { useRef } from "react";



let fadeOutValue = new Animated.Value(1);


export default function Anim() {
    const fadeOutPress = () => {
        Animated.timing(fadeOutValue, {
            toValue: 0.09,
            useNativeDriver: true,
            duration: 500,
        }).start();
    }

    const blinlValue = useRef(new Animated.Value(1.0)).current;
    const blinlkPress = () => {
        Animated.sequence([
            Animated.timing(blinlValue, {
                toValue: 0.0,
                useNativeDriver: true,
                duration: 500, 
            }),
            Animated.timing(blinlValue, {
                toValue: 1.0,
                useNativeDriver: true,
                duration: 500, 
            })
        ]).start();
    }


    const scale1Value = useRef(new Animated.Value(1.0)).current;
    const scale1Press = () => {
        Animated.timing(scale1Value, {
            toValue: 0.9,
            useNativeDriver: true,
            duration: 300,
        }).start();
    }
    const scale2Value = useRef(new Animated.Value(1.0)).current;
    const scale2Press = () => {
        Animated.timing(scale2Value, {
            toValue:1.5,
            useNativeDriver: true,
            duration: 300,
        }).start();
    }

    const scale3Value = useRef(new Animated.Value(1.0)).current;
    const scale3Press = () => {
        let mewscele = currentScale
        Animated.timing(scale3Value, {
            
            toValue: mewscele,
            useNativeDriver: true,
            duration: 300,
        }).start();
    }

    return <View style={AnimStyle.pageContainer}>
        <Text style={AnimStyle.tittle}>Анимации</Text>
        <View style={AnimStyle.row}>
            <Pressable style={AnimStyle.block} onPress={fadeOutPress}>
                <Animated.View style ={[AnimStyle.block,{opacity: fadeOutValue}] }>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtittle} >"Розчинення"</Text>
                </Animated.View>   
            </Pressable>
            
            <Pressable style={AnimStyle.block} onPress={blinlkPress}>
                <Animated.View style ={[AnimStyle.block,{opacity: blinlValue}] }>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtittle}>"Блимання"</Text>
                </Animated.View>   
            </Pressable>
        </View>
        
        <View style={AnimStyle.row}>
            <Pressable style={AnimStyle.block} onPress={scale1Press}>
                <Animated.View style ={[
                    AnimStyle.block, 
                    { transform: [{scale: scale1Value}] }
                    ]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtittle} >"Розчинення"</Text>
                </Animated.View>   
            </Pressable>
            
            <Pressable style={AnimStyle.block} onPress={scale2Press}>
                <Animated.View style ={[
                    AnimStyle.block, 
                    { transform: [
                        {scaleX: scale2Value}, 
                        {scaleY: scale2Value.interpolate({
                            inputRange: [1, 1.5],
                            outputRange: [1, 1 / 1.5]
                        })}
                    ] }
                    ]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtittle} >"Розчинення"</Text>
                </Animated.View>   
            </Pressable>
        </View>
            <View style={AnimStyle.row}>
                <Pressable style={AnimStyle.block} onPress={scale3Press}>
                    <Animated.View style ={[
                        AnimStyle.block, 
                        { transform: [
                            {scale: scale3Value.interpolate({
                                inputRange: [1, 1.5],
                                outputRange: [1, 1 / 1.5]
                            })}
                        ] }
                        ]}>
                        <View style={AnimStyle.demo}></View>
                        <Text style={AnimStyle.subtittle} >"Розчинення"</Text>
                    </Animated.View>   
                </Pressable>
            </View>
            
    </View>
}