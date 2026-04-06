import {
    GestureResponderEvent,
    Pressable,
    Text,
    TouchableWithoutFeedback,
    useWindowDimensions,
    View,
    Animated,
    Easing
} from "react-native";
import SwipeStyle from "./ui/SwipeStyle";
import { useState } from "react";

let eventBegin: GestureResponderEvent | null = null;

const minSwipeLength = 10.0;
const minSwipeVelocity = 100.0 / 400.0;

export default function Swipe() {
    const { width, height } = useWindowDimensions();
    const shortestSide = Math.min(width, height);
    const fieldSize = 0.96 * shortestSide;
    const tileSize = fieldSize / 4.0;

    const [text, setText] = useState<string>("");
    const [field, setField] = useState<Array<number>>(
        Array.from({ length: 16 }, (_, i) => (3 * i + 5) % 16)
    );
    const [difficulty, setdifficulty] = useState<number>(1);

    const [offsets] = useState(() =>
        Array.from({ length: 16 }, () => ({
            x: new Animated.Value(0),
            y: new Animated.Value(0),
        }))
    );

    const [isAnimating, setIsAnimating] = useState(false);

    const animateMove = (
        movingIndex: number,
        emptyTileIndex: number,
        axis: "x" | "y",
        value: number
    ) => {
        setIsAnimating(true);

        Animated.timing(offsets[movingIndex][axis], {
            toValue: value,
            duration: 250,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start(() => {
            // создаём новый массив (без мутации)
            const newField = [...field];
            newField[emptyTileIndex] = newField[movingIndex];
            newField[movingIndex] = 0;
            setField(newField);

            // даём React применить layout
            requestAnimationFrame(() => {
                offsets[movingIndex][axis].setValue(0);
                setIsAnimating(false);
            });
        });
    };

    const onSwipeRight = () => {
        if (isAnimating) return;

        const empty = field.findIndex(i => i === 0);
        if (empty % 4 === 0) return setText("Рух неможливий");

        animateMove(empty - 1, empty, "x", tileSize);
    };

    const onSwipeLeft = () => {
        if (isAnimating) return;

        const empty = field.findIndex(i => i === 0);
        if (empty % 4 === 3) return setText("Рух неможливий");

        animateMove(empty + 1, empty, "x", -tileSize);
    };

    const onSwipeUp = () => {
        if (isAnimating) return;

        const empty = field.findIndex(i => i === 0);
        if (empty >= 12) return setText("Рух неможливий");

        animateMove(empty + 4, empty, "y", -tileSize);
    };

    const onSwipeDown = () => {
        if (isAnimating) return;

        const empty = field.findIndex(i => i === 0);
        if (empty < 4) return setText("Рух неможливий");

        animateMove(empty - 4, empty, "y", tileSize);
    };

    const onGestureBegin = (event: GestureResponderEvent) => {
        eventBegin = event;
    };

    const onGestureEnd = (event: GestureResponderEvent) => {
        if (!eventBegin || isAnimating) return;

        const dx = event.nativeEvent.pageX - eventBegin.nativeEvent.pageX;
        const dy = event.nativeEvent.pageY - eventBegin.nativeEvent.pageY;
        const dt = event.nativeEvent.timestamp - eventBegin.nativeEvent.timestamp;

        const lenX = Math.abs(dx);
        const lenY = Math.abs(dy);

        if (lenX > 2 * lenY) {
            if (lenX < minSwipeLength) return setText("too short");
            if (lenX / dt < minSwipeVelocity) return setText("too slow");

            dx < 0 ? onSwipeLeft() : onSwipeRight();
        } else if (lenY > 2 * lenX) {
            if (lenY < minSwipeLength) return setText("too short");
            if (lenY / dt < minSwipeVelocity) return setText("too slow");

            dy < 0 ? onSwipeUp() : onSwipeDown();
        }
    };

    const isPortrait = width < height;

    return (
        <View
            style={[
                SwipeStyle.pageContainer,
                { flexDirection: isPortrait ? "column" : "row" },
            ]}
        >
            <Text>Swipe: {text}</Text>

            <TouchableWithoutFeedback
                onPressIn={onGestureBegin}
                onPressOut={onGestureEnd}
            >
                <View
                    style={[
                        SwipeStyle.gameField,
                        { width: fieldSize, height: fieldSize },
                    ]}
                >
                    {field.map((i, index) => (
                        <View
                            key={index}
                            style={[
                                SwipeStyle.tileContainer,
                                { width: tileSize, height: tileSize },
                            ]}
                        >
                            {i !== 0 && (
                                <Animated.View
                                    style={[
                                        SwipeStyle.tile,
                                        {
                                            transform: [
                                                { translateX: offsets[index].x },
                                                { translateY: offsets[index].y },
                                            ],
                                        },
                                    ]}
                                >
                                    <Text style={SwipeStyle.tileText}>{i}</Text>
                                </Animated.View>
                            )}
                        </View>
                    ))}
                </View>
            </TouchableWithoutFeedback>

            <View
                style={[
                    SwipeStyle.difficultiContainer,
                    {
                        marginTop: isPortrait ? 40 : 0,
                        marginLeft: isPortrait ? 0 : 40,
                    },
                ]}
            >
                <View
                    style={[
                        SwipeStyle.difficultiSelector,
                        {
                            flexDirection: isPortrait ? "row" : "column",
                            height: isPortrait ? tileSize : fieldSize,
                            width: isPortrait ? fieldSize : tileSize,
                        },
                    ]}
                >
                    {[1, 2, 3, 4].map(n => (
                        <Pressable
                            key={n}
                            onPress={() => setdifficulty(n)}
                            style={
                                difficulty === n
                                    ? SwipeStyle.difficultItemSelection
                                    : SwipeStyle.difficultItem
                            }
                        >
                            <Text style={SwipeStyle.tileText}>{n}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>
    );
}