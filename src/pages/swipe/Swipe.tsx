import { GestureResponderEvent, Modal, Pressable, Text, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import SwipeStyle from "./ui/SwipeStyle"; 
import { ReactNode, useEffect, useRef, useState } from "react";
import { MoveDirection } from "./model/MoveDirection";
import { Alert } from "react-native";

interface IModalButton{
    title: string,
    onPress: () => void,
    style?: Object,
}

interface IModalData {
    title: string,
    massage: string,
    button?: Array<IModalButton>
}

export default function Swipe() {
    const {width, height} = useWindowDimensions();
    const shortestSide = Math.min(width, height);
    const fieldSize = 0.96 * shortestSide;
    const tileSize = fieldSize / 4.0;
    const [text, setText] = useState<string>("");
    const [field, setField] = useState<Array<number>>([1,2,3,4,5,6,7,0,9,10,11,8,13,14,15,12])//(Array.from({ length: 16 }, (_, i) => (i + 1 ) % 16));
    const [difficulty, setDifficulty] = useState<number>(1);
    const [modalDate, setModalDate] = useState<IModalData | null>(null)
    // #region gesture detection
    const makeMove = (direction:MoveDirection) => {
        let emptyTileIndex = field.findIndex(i => i == 0);
        let otherTileIndex;
        switch(direction) {
            case MoveDirection.right :
                otherTileIndex = emptyTileIndex % 4 == 0 ? -1 : emptyTileIndex - 1;
                break;
            case MoveDirection.left :
                otherTileIndex = emptyTileIndex % 4 == 3 ? -1 : emptyTileIndex + 1;
                break;
            case MoveDirection.up :
                otherTileIndex = emptyTileIndex >= 12 ? -1 : emptyTileIndex + 4;
                break;
            case MoveDirection.down :
                otherTileIndex = emptyTileIndex < 4 ? -1 : emptyTileIndex - 4;
                break;
        }
        if(otherTileIndex == -1) {
            setText("Рух неможливий");
        }
        else {
            field[emptyTileIndex] = field[otherTileIndex];
            field[otherTileIndex] = 0;
            setField([...field]);
        }
    };

    const onSwipeRight = () => makeMove(MoveDirection.right);
    const onSwipeLeft = () =>  makeMove(MoveDirection.left);
    const onSwipeTop = () =>  makeMove(MoveDirection.up);
    const onSwipeBottom = () =>  makeMove(MoveDirection.down);
    const isPortrait = width < height;
    const continueGame = useRef<boolean>(false);

    const gameOver = () =>{

        setModalDate({
            title: "Victory",
            massage: "good",
            button: [{
                title: "New Game",
                onPress: () => {continueGame.current = false;},
                style: SwipeStyle.buttonOpen
            },{
                title: "Continue",
                onPress: () => {continueGame.current = false;}
                
            }]
        }){
        onPress: () => {
            if(difficulty< 4){
                setDifficulty(difficulty + 1);
            }
            else {
                continueGame.current = true
            }}}};
    }

    const gameOverAlert = () => {

        Alert.alert('Victory', 'You Win!\nStart new Game', [{
            
        //     text: 'New Game',
        //     onPress: () => {
        //         continueGame.current = false;
        //     },
        //     style:'cancel',
        // },{
        //     text: 'Continue',
        //     onPress: () => {
        //         if(difficulty< 4){
        //             setDifficulty(difficulty + 1);
        //         }
        //         else {
        //             continueGame.current = true
        //         }}}]);
        
    }]

    useEffect(() => {
        let vic = true;
        for(let i = 0; i < 4 * difficulty; i += 1){
            if(field[i] != (i + 1) % 16){
                vic = false
                
            }    
        }
        
        if(vic && !continueGame.current){
            
            gameOver();
        }

    }, [field]);

    const onDifficultyLeft  = () => {if(difficulty > 1) setDifficulty(difficulty - 1)};
    const onDifficultyRight = () => {if(difficulty < 4) setDifficulty(difficulty + 1)};

    return <View style={[SwipeStyle.pageContainer, {flexDirection: isPortrait ? "column" : "row"}]}>
        
        <Swipeable onSwipeLeft={onDifficultyLeft} onSwipeRight={onDifficultyRight}>
            <View style={[SwipeStyle.difficultyContainer, {
                marginTop: isPortrait ? 40.0 : 0,
                marginLeft: isPortrait ? 0 : 40.0,
            }]}>
                <View style={[SwipeStyle.difficultySelector, {
                    flexDirection:isPortrait ? "row" : "column",
                    height:  isPortrait ? tileSize : fieldSize,
                    width: isPortrait ? fieldSize : tileSize,
                }]}>
                    <View style={[difficulty == 1 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>                   
                        <Text style={SwipeStyle.tileText}>1</Text>                   
                    </View>

                    <View style={[difficulty == 2 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>                  
                        <Text style={SwipeStyle.tileText}>2</Text>
                    </View>

                    <View style={[difficulty == 3 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>
                        <Text style={SwipeStyle.tileText}>3</Text>
                    </View>

                    <View style={[difficulty == 4 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>
                        <Text style={SwipeStyle.tileText}>4</Text> 
                    </View>
                </View>
            </View>
        </Swipeable>

        <Text>Swipe: {text}</Text>

        <Swipeable onSwipeRight={onSwipeRight} onSwipeLeft={onSwipeLeft} onSwipeBottom={onSwipeBottom} onSwipeTop={onSwipeTop} >
            <View style={[SwipeStyle.gameField, {width: fieldSize, height: fieldSize}]}>
                {field.map(i => 
                <View key={i} style={[SwipeStyle.tileContainer, {width: tileSize, height: tileSize}]}>
                    {i != 0 && <View style={SwipeStyle.tile}>
                        <Text style={true ? SwipeStyle.tileTextInPlace : SwipeStyle.tileText}>{i}</Text>
                    </View>} 
                </View>)}
            </View>
        </Swipeable>

        <View style={[SwipeStyle.difficultyContainer, {
            marginTop: isPortrait ? 40.0 : 0,
            marginLeft: isPortrait ? 0 : 40.0,
        }]}>
            <View style={[SwipeStyle.difficultySelector, {
                flexDirection:isPortrait ? "row" : "column",
                height:  isPortrait ? tileSize : fieldSize,
                width: isPortrait ? fieldSize : tileSize,
            }]}>
                <Pressable onPress={() => setDifficulty(1)} style={[difficulty == 1 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>                   
                    <Text style={SwipeStyle.tileText}>1</Text>                   
                </Pressable>

                <Pressable onPress={() => setDifficulty(2)} style={[difficulty == 2 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>                  
                    <Text style={SwipeStyle.tileText}>2</Text>
                </Pressable>

                <Pressable onPress={() => setDifficulty(3)} style={[difficulty == 3 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>
                    <Text style={SwipeStyle.tileText}>3</Text>
                </Pressable>

                <Pressable onPress={() => setDifficulty(4)} style={[difficulty == 4 ? SwipeStyle.difficultyItemSelected : SwipeStyle.difficultyItem]}>
                    <Text style={SwipeStyle.tileText}>4</Text> 
                </Pressable>
            </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDate != null}
          onRequestClose={() => {
            setModalDate(null);
          }}>
          <View style={SwipeStyle.centeredView}>
            <View style={SwipeStyle.modalView}>
              <Text style={SwipeStyle.modalTitle}>{modalDate?.title}</Text>
              <Text style={SwipeStyle.modalText}>{modalDate?.massage}</Text>
              {modalDate?.button
              ?modalDate.button.map(btn => <Pressable key={btn.title}
                    style={[SwipeStyle.button, btn.style ??  SwipeStyle.buttonClose]}
                    onPress={() =>{ setModalDate(null); btn.onPress()}}>
                    <Text style={SwipeStyle.textStyle}>{btn.title}</Text>
                </Pressable>)
                :<Pressable
                    style={[SwipeStyle.button, SwipeStyle.buttonClose]}
                    onPress={() => setModalDate(null)}>
                    <Text style={SwipeStyle.textStyle}>Hide Modal</Text>
                </Pressable>}
            </View>
          </View>
        </Modal>
    </View>;
}


function Swipeable(
    {onSwipeRight, onSwipeLeft, onSwipeTop, onSwipeBottom, onUrecognized, children}: 
    {onSwipeRight?:()=>void, 
        onSwipeLeft?:()=>void, 
        onSwipeTop?:()=>void, 
        onSwipeBottom?:()=>void,
        onUrecognized?:(reason:string)=>void,
    children: ReactNode}) {

        const minSwipeLength = 100.0;
        const minSwipeVelocity = 100.0 / 400.0;   // 100 пікселів за 400 мілісекунд

        const eventBegin = useRef<GestureResponderEvent|null>(null);

        const onGestureBegin = (event: GestureResponderEvent) => {
            /*
            event.nativeEvent.pageX/Y - відлік від меж пристрою (сторінки)
            event.nativeEvent.locationX/Y - від меж блоку-детектора
            */
            eventBegin.current = event;
        };
        const onGestureEnd = (event: GestureResponderEvent) => {
            const e1 = eventBegin.current;
            if(e1) {                
                const dx = event.nativeEvent.pageX - e1.nativeEvent.pageX;
                const dy = event.nativeEvent.pageY - e1.nativeEvent.pageY;
                const dt = event.nativeEvent.timestamp - e1.nativeEvent.timestamp;
                // є три рішення: жест є горизонтальним, вертикальним або невизначеним (у межах похибок) 
                const lenX = Math.abs(dx);   
                const lenY = Math.abs(dy);
                if(lenX > 2 * lenY) {
                    // Горизонтальні жести також поділяємо на три варіанти:
                    // свайп ліворуч, праворуч або не свайп (закороткий або заповільний)
                    if(lenX < minSwipeLength) {
                        if(onUrecognized) onUrecognized("Horizontal: too short");
                    }
                    else if(lenX / dt < minSwipeVelocity) {
                        if(onUrecognized) onUrecognized("Horizontal: too slow");
                    }
                    else if(dx < 0) {
                        if(onSwipeLeft) onSwipeLeft();
                    }
                    else {
                        if(onSwipeRight) onSwipeRight();
                    }
                }
                else if(lenY > 2 * lenX) {
                    if(lenY < minSwipeLength) {
                        if(onUrecognized) onUrecognized("Vertical: too short");
                    }
                    else if(lenY / dt < minSwipeVelocity) {
                        if(onUrecognized) onUrecognized("Vertical: too slow");
                    }
                    else if(dy < 0) {
                        if(onSwipeTop) onSwipeTop();
                    }
                    else {
                        if(onSwipeBottom) onSwipeBottom();
                    }
                }
                else {
                    if(onUrecognized) onUrecognized("Diagonal");
                }
            }        
        };
    return <TouchableWithoutFeedback onPressIn={onGestureBegin} onPressOut={onGestureEnd}>
        {children}
    </TouchableWithoutFeedback>;
}
