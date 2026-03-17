import { Text, Touchable, TouchableOpacity } from "react-native";
import { View } from "react-native";
import RateStyle from "./ui/RateStyle";
import INbuRate from "../../app/entities/NbuRate/model/INbuRate";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import NbuRateApi from "../../app/entities/NbuRate/api/NbuRateApi";
import DatePicker from "react-native-date-picker";

export default function Rate() {
    const [rates, setRates] = useState<Array<INbuRate>>([]);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState(false)
    
    useEffect (() => {
        NbuRateApi.getCurrentRates().then(setRates);
    }, []);

    return <View style={RateStyle.pageContainer}>
        <View>
            <Text style={RateStyle.pageContainer}></Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
                <Text>{date.toDateString()}</Text>
            </TouchableOpacity>
        </View>


        <ScrollView>
            {rates.map((rete, i)=> <View key={rete.cc} style={[RateStyle.rateLine,
                    (i & 1 ? RateStyle.rateLineOdd: RateStyle.rateLineEvent)]}>
                 <Text style={RateStyle.rateTxt}>{rete.txt}</Text>
                <Text style={RateStyle.rateCc}>{rete.cc}</Text>               
                <Text style={RateStyle.rateRate}>{rete.rate}</Text>
            </View>)}
            
        </ScrollView>
        
        <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
            setOpen(false)
            setDate(date)
            }}
            onCancel={() => {
            setOpen(false)
            }}
        />
    </View>
}