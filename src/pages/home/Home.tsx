import { Text, View } from "react-native";
import HomeStyle from "./ui/HomeStyle";

export default function Home() {
    return <View style={HomeStyle.pageContainer}>
        <Text style={HomeStyle.pageTitle}>Hello, World!</Text>
    </View>;
}