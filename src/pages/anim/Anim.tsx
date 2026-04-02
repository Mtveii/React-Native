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

    const trans1xValue = useRef(new Animated.Value(0.0)).current;
    const trans1yValue = useRef(new Animated.Value(0.0)).current;

    const trans1Press = () => {
        Animated.parallel([
            Animated.sequence([
                Animated.timing(trans1xValue, {
                    toValue: 100.0,
                    useNativeDriver: true, 
                    duration: 300,
                }),
                Animated.timing(trans1xValue, {
                    toValue: -100.0,
                    useNativeDriver: true, 
                    duration: 600,
                }),
                Animated.timing(trans1xValue, {
                    toValue: 0.0,
                    useNativeDriver: true, 
                    duration: 300,
                })
            ]),
            Animated.sequence([
                Animated.timing(trans1yValue, {
                    toValue: 50.0,
                    useNativeDriver: true, 
                    duration: 150,
                }),
                Animated.timing(trans1yValue, {
                    toValue: -50.0,
                    useNativeDriver: true, 
                    duration: 300,
                }),
                Animated.timing(trans1yValue, {
                    toValue: 50.0,
                    useNativeDriver: true, 
                    duration: 300,
                }),
                Animated.timing(trans1yValue, {
                    toValue: -50.0,
                    useNativeDriver: true, 
                    duration: 300,
                }),
                Animated.timing(trans1yValue, {
                    toValue: 0.0,
                    useNativeDriver: true, 
                    duration: 150,
                })
            ]),
        ])

        
        .start();
    };

    
    const rot1Value = useRef(new Animated.Value(0.0)).current;
    const rot1Press = () => {
            Animated.sequence([
                Animated.timing(rot1Value, {
                    toValue: 90.0,
                    useNativeDriver: true, 
                    duration: 300,
                }),
                Animated.timing(rot1Value, {
                    toValue: -90.0,
                    useNativeDriver: true, 
                    duration: 600,
                }),
                Animated.timing(rot1Value, {
                    toValue: 0.0,
                    useNativeDriver: true, 
                    duration: 300,
                })
            ]).start();
    };

    const rot2Value = useRef(new Animated.Value(0.0)).current;
    const rot2Press = () => {
            Animated.sequence([
                Animated.timing(rot2Value, {
                    toValue: 90.0,
                    useNativeDriver: true, 
                    duration: 300,
                }),
                Animated.timing(rot2Value, {
                    toValue: -90.0,
                    useNativeDriver: true, 
                    duration: 600,
                }),
                Animated.timing(rot2Value, {
                    toValue: 0.0,
                    useNativeDriver: true, 
                    duration: 300,
                })
            ]).start();
    };


    const fin1Value = useRef(new Animated.Value(1)).current;
    const q = useRef(false); // було let q = true

    const fin1Press = () => {
        q.current = !q.current;

        if (q.current) {
            animate();
        }
    };

    const animate = () => {
        Animated.timing(fin1Value, {
            toValue: 1.5,
            duration: 900,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(fin1Value, {
                toValue: 1,
                duration: 900,
                useNativeDriver: true,
            }).start(() => {
                if (q.current) {
                    animate(); // повтор
                }
            });
        });
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
                    { transform: [
                        {translateX: trans1xValue},
                        
                        {translateY: trans1yValue},
                        {scale: trans1xValue.interpolate({
                            inputRange: [-50, 0, 50],
                            outputRange: [0.75, 1, 1.33]
                        })}
                    ] }
                    ]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>змішення</Text>
                </Animated.View>
            </Pressable> 

            <Pressable style={AnimStyle.block} onPress={rot1Press} >
                <Animated.View style={[
                    AnimStyle.block,
                    { transform: [
                        {rotate: rot1Value.interpolate({
                            inputRange: [-90, 0, 90],
                            outputRange: ["-90deg", "0deg", "90deg"]
                        })},
                    ] }
                    ]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Нахил</Text>
                </Animated.View>
            </Pressable>
        </View>
    
        <View style={AnimStyle.row}>            
            <Pressable style={AnimStyle.anim} onPress={rot2Press}>
                <Animated.View style={[
                    AnimStyle.block,
                    { transform: [
                        {translateX: rot2Value},
                        {rotate: rot2Value.interpolate({
                            inputRange: [-90, 0, 90],
                            outputRange: ["-90deg", "0deg", "90deg"]
                        })},
    
                        {scale: rot2Value.interpolate({
                            inputRange: [-50, 0, 50],
                            outputRange: [1, 1, 1]
                        })}
                    ] }
                    ]}>
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>Змішення з нахилом</Text>
                </Animated.View>
            </Pressable> 
            <Pressable style={AnimStyle.block} onPress={fin1Press}>
                <Animated.View
                    style={[
                        AnimStyle.block,
                        { transform: [{ scale: fin1Value }] },
                    ]}
                >
                    <View style={AnimStyle.demo}></View>
                    <Text style={AnimStyle.subtitle}>фінал</Text>
                </Animated.View>
            </Pressable>
        </View>


    </View>;

};












