import { Animated, Pressable, Text, View } from "react-native";
import AnimStyle from "./ui/AnimStyle";
import { useRef } from "react";

// анімоване значення, величина якого буде змінюватись
// операційною системою пристрою. Розміщуємо поза функцією-компонентом
let fadeOutValue = new Animated.Value(1);

export default function Anim() {
    const fadeOutPress = () => {
        Animated.timing(fadeOutValue, {
            toValue: 0.09,
            useNativeDriver: true, 
            duration: 500,
        }).start();
    };

    // хук-референс, що дозволяє не змінювати об'єкт при
    // перезапуску функції
    const blinkValue = useRef(new Animated.Value(1.0)).current;
    const blinkPress = () => {
        Animated.sequence([
            Animated.timing(blinkValue, {
                toValue: 0.0,
                useNativeDriver: true, 
                duration: 500,
            }),
            Animated.timing(blinkValue, {
                toValue: 1.0,
                useNativeDriver: true, 
                duration: 500,
            })
        ]).start();
    };

    // анімації масштабу
    const scale1Value = useRef(new Animated.Value(1.0)).current;
    const scale1Press = () => {
        Animated.timing(scale1Value, {
            toValue: 0.8,
            useNativeDriver: true, 
            duration: 300,
        }).start();
    };
    const scale2Value = useRef(new Animated.Value(1.0)).current;
    const scale2Press = () => {
        Animated.timing(scale2Value, {
            toValue: 1.5,
            useNativeDriver: true, 
            duration: 300,
        }).start();
    };

    const trans1Value = useRef(new Animated.Value(0.0)).current;
    const trans1Press = () => {
        Animated.timing(trans1Value, {
            toValue: 50.0,
            useNativeDriver: true, 
            duration: 300,
        }),
        Animated.timing(trans1Value, {
            toValue: -100.0,
            useNativeDriver: true, 
            duration: 600,
        }),
        Animated.timing(trans1Value, {
            toValue: 50.0,
            useNativeDriver: true, 
            duration: 900,
        })
        .start();
    };



    return <View style={AnimStyle.pageContainer}>
        <Text style={AnimStyle.title}>Анімації</Text>
        <View style={AnimStyle.row}>            
            <Pressable style={AnimStyle.anim} onPress={fadeOutPress}>
                <Animated.View style={[AnimStyle.block,{opacity: fadeOutValue}]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>"Зникнення"</Text>
                </Animated.View>
            </Pressable>

            <Pressable style={AnimStyle.block} onPress={blinkPress}>
                <Animated.View style={[AnimStyle.block,{opacity: blinkValue}]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Блимання</Text>
                </Animated.View>
            </Pressable>
        </View>

        <View style={AnimStyle.row}>            
            <Pressable style={AnimStyle.anim} onPress={scale1Press}>
                <Animated.View style={[
                    AnimStyle.block,
                    { transform: [{scale: scale1Value}] }
                    ]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Масштаб</Text>
                </Animated.View>
            </Pressable> 

            <Pressable style={AnimStyle.block} onPress={scale2Press} >
                <Animated.View style={[
                    AnimStyle.block,
                    { transform: [
                        {scaleX: scale2Value},
                        {scaleY: scale2Value.interpolate({
                            inputRange: [1, 1.5],
                            outputRange: [1, 1 / 1.5]
                        })},
                    ] }
                    ]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Масштаб</Text>
                </Animated.View>
            </Pressable>
        </View>

         <View style={AnimStyle.row}>            
            <Pressable style={AnimStyle.anim} onPress={trans1Press}>
                <Animated.View style={[
                    AnimStyle.block,
                    { transform: [{translateX: trans1Value}] }
                    ]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>змішення</Text>
                </Animated.View>
            </Pressable> 

            <Pressable style={AnimStyle.block} onPress={scale2Press} >
                <Animated.View style={[
                    AnimStyle.block,
                    { transform: [
                        {scaleX: scale2Value},
                        {scaleY: scale2Value.interpolate({
                            inputRange: [1, 1.5],
                            outputRange: [1, 1 / 1.5]
                        })},
                    ] }
                    ]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Масштаб</Text>
                </Animated.View>
            </Pressable>
        </View>
    </View>;
};

