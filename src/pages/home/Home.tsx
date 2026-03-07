import { Text, View } from "react-native";
import HomeStyle from "./ui/HomeStyle";

export default function Home() {
    return <View style={HomeStyle.pageContainer}>
        <Text style={HomeStyle.pageTitle}>Hello, World!</Text>

        <View style={HomeStyle.CardContainer}>
            <View style={HomeStyle.CardItem}><View style={HomeStyle.CardImg}></View><Text style={HomeStyle.CardTitle}>#####</Text></View>
            <View style={HomeStyle.CardItem}><View style={HomeStyle.CardImg}></View><Text style={HomeStyle.CardTitle}>#####</Text></View>
            <View style={HomeStyle.CardItem}><View style={HomeStyle.CardImg}></View><Text style={HomeStyle.CardTitle}>#####</Text></View>
            </View>
        <View style={HomeStyle.CardContainer}>
            <View style={HomeStyle.CardItem}><View style={HomeStyle.CardImg}></View><Text style={HomeStyle.CardTitle}>#####</Text></View>
            <View style={HomeStyle.CardItem}><View style={HomeStyle.CardImg}></View><Text style={HomeStyle.CardTitle}>#####</Text></View>
            <View style={HomeStyle.CardItem}><View style={HomeStyle.CardImg}></View><Text style={HomeStyle.CardTitle}>#####</Text></View>
            </View>
        <View style={HomeStyle.CardContainer}>
            <View style={HomeStyle.CardItem}><View style={HomeStyle.CardImg}></View><Text style={HomeStyle.CardTitle}>#####</Text></View>
            <View style={HomeStyle.CardItem}><View style={HomeStyle.CardImg}></View><Text style={HomeStyle.CardTitle}>#####</Text></View>
            <View style={HomeStyle.CardItem}><View style={HomeStyle.CardImg}></View><Text style={HomeStyle.CardTitle}>#####</Text></View>
        </View>

    </View>;    
}