import { Image, Text, TouchableOpacity, View } from "react-native";
import HomeStyle from "./ui/HomeStyle";
import { useContext } from "react";
import { AppContext } from "../../features/context/AppContext";

export default function Home() {
    const {navigate} = useContext(AppContext);


    return <View style={HomeStyle.pageContainer}>
        <Text style={HomeStyle.pageTitle}>React Native</Text>
        <TouchableOpacity onPress={() => navigate({slug: 'calc'})}>
            <Image 
                source = {require('../../features/asset/calc.png')}
                style={HomeStyle.navImage}/>
            <Text style={HomeStyle.navText}>Канкулятор</Text>
        </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate({slug: 'rate'})}>
            <Image 
                source = {require('../../features/asset/rate.png')}
                style={HomeStyle.navImage}/>
            <Text style={HomeStyle.navText}>Канкулятор</Text>
        </TouchableOpacity>
        
    </View>;
}
