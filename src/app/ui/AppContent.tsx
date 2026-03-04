import { Text,      View} from "react-native";
import AppConstStyle from "./AppContentStyle";

export default function AppContent(){

    return <View style = {AppConstStyle.container}>
        <View style = {AppConstStyle.TopBar}>
            <Text style = {AppConstStyle.TopBarIcon}></Text>
            <Text style = {AppConstStyle.TopBarTitle}>Mobile</Text>
            <Text style = {AppConstStyle.TopBarIcon}></Text>
        </View>

        <View style ={AppConstStyle.pegeWiget}>
            <Text style = {AppConstStyle.text}>Hellow world</Text>
        </View>

        
        <View style = {AppConstStyle.ButonBar}>
            <Text style = {AppConstStyle.ButonBarIcon}></Text>
            <Text style = {AppConstStyle.ButonBarIcon}></Text>
            <Text style = {AppConstStyle.ButonBarIcon}></Text>
            <Text style = {AppConstStyle.ButonBarIcon}></Text>
            <Text style = {AppConstStyle.ButonBarIcon}></Text>
        </View>
    </View>;
}