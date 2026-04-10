import { GestureResponderEvent, Modal, Pressable, Text, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import SwipeStyle from "./ui/SwipeStyle"; 
import { ReactNode, useEffect, useRef, useState } from "react";
import { MoveDirection } from "./model/MoveDirection";
import { Animated, Easing } from "react-native";

interface IModalButton {    
    title: string,
    onPress: () => void,
    style?: Object
}

interface IModalData {
    title: string,
    message: string,
    buttons?: Array<IModalButton>,
}

export default function Swipe() {
    const {width, height} = useWindowDimensions();
    const shortestSide = Math.min(width, height);
    const fieldSize = 0.96 * shortestSide;
    const tileSize = fieldSize / 4.0;
    const [text, setText] = useState<string>("");
    const [field, setField] = useState<Array<number>>([
        1, 2, 3, 0,
        5, 6, 7, 4,
        9, 10,11,8,
        13,14,15,12]);
    const [difficulty, setDifficulty] = useState<number>(1);
    const isPortrait = width < height;
    const continueGame = useRef<boolean>(false);
    const [modalData, setModalData] = useState<IModalData|null>(null);

    const positions = useRef<Record<number, { x: Animated.Value; y: Animated.Value }>>({});

    if (Object.keys(positions.current).length === 0) {
        field.forEach((value, index) => {
            if (value === 0) return;
            const row = Math.floor(index / 4);
            const col = index % 4;
            positions.current[value] = {
                x: new Animated.Value(col),
                y: new Animated.Value(row),
            };
        });
    }

    // #region gesture detection
    const makeMove = (direction: MoveDirection) => {
        let emptyTileIndex = field.findIndex(i => i === 0);
        let otherTileIndex = -1;

        switch (direction) {
            case MoveDirection.right:
                otherTileIndex = emptyTileIndex % 4 === 0 ? -1 : emptyTileIndex - 1;
                break;
            case MoveDirection.left:
                otherTileIndex = emptyTileIndex % 4 === 3 ? -1 : emptyTileIndex + 1;
                break;
            case MoveDirection.up:
                otherTileIndex = emptyTileIndex >= 12 ? -1 : emptyTileIndex + 4;
                break;
            case MoveDirection.down:
                otherTileIndex = emptyTileIndex < 4 ? -1 : emptyTileIndex - 4;
                break;
        }

        if (otherTileIndex === -1) {
            setText("Рух неможливий");
            return;
        }

        const toRow = Math.floor(emptyTileIndex / 4);
        const toCol = emptyTileIndex % 4;
        const movingValue = field[otherTileIndex];
        const anim = positions.current[movingValue];

        Animated.parallel([
            Animated.timing(anim.x, {
                toValue: toCol,
                duration: 200,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(anim.y, {
                toValue: toRow,
                duration: 200,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
        ]).start(() => {
            setField(prev => {
                const newField = [...prev];
                newField[emptyTileIndex] = newField[otherTileIndex];
                newField[otherTileIndex] = 0;
                return newField;
            });
        });
    };

    const onSwipeRight  = () => makeMove(MoveDirection.right);
    const onSwipeLeft   = () => makeMove(MoveDirection.left);
    const onSwipeTop    = () => makeMove(MoveDirection.up);
    const onSwipeBottom = () => makeMove(MoveDirection.down);
    // #endregion

    const showVictoryModal = () => {
        setModalData({
            title: "Перемога! 🎉",
            message: "Ви виграли!\nПочати нову гру або продовжити?",
            buttons: [
                {
                    title: "Нова гра",
                    onPress: () => { continueGame.current = false; },
                    style: SwipeStyle.buttonOpen,
                },
                {
                    title: "Продовжити",
                    onPress: () => {
                        if (difficulty < 4) {
                            setDifficulty(d => d + 1);
                        } else {
                            continueGame.current = true;
                        }
                    },
                    style: SwipeStyle.buttonClose,
                },
            ],
        });
    };

    useEffect(() => {
        const count = 4 * difficulty;
        let vic = true;
        for (let i = 0; i < count; i++) {
            if (field[i] !== i + 1) {
                vic = false;
                break;
            }
        }
        if (difficulty === 4 && field[15] !== 0) {
            vic = false;
        }

        if (vic && !continueGame.current) {
            showVictoryModal();
        }
    }, [field]);

    const onDifficultyLeft  = () => { if (difficulty > 1) setDifficulty(d => d - 1); };
    const onDifficultyRight = () => { if (difficulty < 4) setDifficulty(d => d + 1); };

    return (
        <View style={[SwipeStyle.pageContainer, {flexDirection: isPortrait ? "column" : "row"}]}>

            <Swipeable onSwipeLeft={onDifficultyLeft} onSwipeRight={onDifficultyRight}>
                <View style={[SwipeStyle.difficultyContainer, {
                    marginTop: isPortrait ? 40.0 : 0,
                    marginLeft: isPortrait ? 0 : 40.0,
                }]}>
                    <View style={[SwipeStyle.difficultySelector, {
                        flexDirection: isPortrait ? "row" : "column",
                        height:  isPortrait ? tileSize : fieldSize,
                        width: isPortrait ? fieldSize : tileSize,
                    }]}>
                        {[1, 2, 3, 4].map(n => (
                            <Pressable
                                key={n}
                                onPress={() => setDifficulty(n)}
                                style={difficulty === n
                                    ? SwipeStyle.difficultyItemSelected
                                    : SwipeStyle.difficultyItem}
                            >
                                <Text style={SwipeStyle.tileText}>{n}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </Swipeable>

            <Text>Swipe: {text}</Text>

            <Swipeable 
                onSwipeRight={onSwipeRight} 
                onSwipeLeft={onSwipeLeft} 
                onSwipeBottom={onSwipeBottom} 
                onSwipeTop={onSwipeTop}
            >
                <View style={[SwipeStyle.gameField, {
                    width: fieldSize, 
                    height: fieldSize,
                    position: "relative",
                }]}>
                    {field.map((value) => {
                        if (value === 0) return null;

                        const anim = positions.current[value];
                        const translateX = anim.x.interpolate({
                            inputRange: [0, 3],
                            outputRange: [0, tileSize * 3],
                        });
                        const translateY = anim.y.interpolate({
                            inputRange: [0, 3],
                            outputRange: [0, tileSize * 3],
                        });

                        return (
                            <Animated.View
                                key={value}
                                style={[
                                    SwipeStyle.tile,
                                    {
                                        position: "absolute",
                                        width: tileSize,
                                        height: tileSize,
                                        transform: [{ translateX }, { translateY }],
                                    },
                                ]}
                            >
                                <Text style={SwipeStyle.tileText}>{value}</Text>
                            </Animated.View>
                        );
                    })}
                </View>
            </Swipeable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalData != null}
                onRequestClose={() => setModalData(null)}
            >
                <View style={SwipeStyle.centeredView}>
                    <View style={SwipeStyle.modalView}>
                        <Text style={SwipeStyle.modalTitle}>{modalData?.title}</Text>
                        <Text style={SwipeStyle.modalText}>{modalData?.message}</Text>
                        {modalData?.buttons
                            ? modalData.buttons.map(btn => (
                                <Pressable
                                    key={btn.title}
                                    style={[SwipeStyle.button, btn.style ?? SwipeStyle.buttonClose]}
                                    onPress={() => { setModalData(null); btn.onPress(); }}
                                >
                                    <Text style={SwipeStyle.textStyle}>{btn.title}</Text>
                                </Pressable>
                            ))
                            : (
                                <Pressable
                                    style={[SwipeStyle.button, SwipeStyle.buttonClose]}
                                    onPress={() => setModalData(null)}
                                >
                                    <Text style={SwipeStyle.textStyle}>Закрити</Text>
                                </Pressable>
                            )
                        }
                    </View>
                </View>
            </Modal>

        </View>
    );
}


function Swipeable({
    onSwipeRight, onSwipeLeft, onSwipeTop, onSwipeBottom, onUrecognized, children
}: {
    onSwipeRight?: () => void,
    onSwipeLeft?: () => void,
    onSwipeTop?: () => void,
    onSwipeBottom?: () => void,
    onUrecognized?: (reason: string) => void,
    children: ReactNode,
}) {
    const minSwipeLength   = 100.0;
    const minSwipeVelocity = 100.0 / 400.0;
    const eventBegin = useRef<GestureResponderEvent | null>(null);

    const onGestureBegin = (event: GestureResponderEvent) => {
        eventBegin.current = event;
    };

    const onGestureEnd = (event: GestureResponderEvent) => {
        const e1 = eventBegin.current;
        if (!e1) return;

        const dx = event.nativeEvent.pageX - e1.nativeEvent.pageX;
        const dy = event.nativeEvent.pageY - e1.nativeEvent.pageY;
        const dt = event.nativeEvent.timestamp - e1.nativeEvent.timestamp;
        const lenX = Math.abs(dx);   
        const lenY = Math.abs(dy);

        if (lenX > 2 * lenY) {
            if (lenX < minSwipeLength)          onUrecognized?.("Horizontal: too short");
            else if (lenX / dt < minSwipeVelocity) onUrecognized?.("Horizontal: too slow");
            else if (dx < 0)                    onSwipeLeft?.();
            else                                onSwipeRight?.();
        } else if (lenY > 2 * lenX) {
            if (lenY < minSwipeLength)          onUrecognized?.("Vertical: too short");
            else if (lenY / dt < minSwipeVelocity) onUrecognized?.("Vertical: too slow");
            else if (dy < 0)                    onSwipeTop?.();
            else                                onSwipeBottom?.();
        } else {
            onUrecognized?.("Diagonal");
        }
    };

    return (
        <TouchableWithoutFeedback onPressIn={onGestureBegin} onPressOut={onGestureEnd}>
            {children}
        </TouchableWithoutFeedback>
    );
}