import { Text, Touchable, TouchableOpacity, TextInput} from "react-native";
import { View } from "react-native";
import RateStyle from "./ui/RateStyle";
import INbuRate from "../../app/entities/NbuRate/model/INbuRate";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import NbuRateApi from "../../app/entities/NbuRate/api/NbuRateApi";
import DatePicker from "react-native-date-picker";


export default function Rate() {
    const [rates, setRates] = useState<Array<INbuRate>>([]);
    const [shownRates, setShownRates] = useState<Array<INbuRate>>([]);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState(false)
    const [search, setSeatch] = useState<string>("")
    
    useEffect (() => {
        NbuRateApi.getCurrentRates().then(setRates);
    }, []);

    useEffect(() => {
        if(search.length > 0){
            setShownRates(rates.filter(r => r.cc.includes));
        }else {
            setShownRates(rates);
        }
    }, [search]);

    return <View style={RateStyle.pageContainer}>

        <View style={RateStyle.pageTitleRow}>
            <TextInput 
                style={RateStyle.search}
                value={search}
                onChangeText={setSeatch}
            />

            <Text style={RateStyle.pageTittle}>Курси НБУ</Text>

            <TouchableOpacity onPress={() => setOpen(true)}>
                <Text style={RateStyle.pageDate}>{date.toDateString()}</Text>
            </TouchableOpacity>
        </View>     


        <ScrollView>
            {shownRates.map((rete, i)=> <View key={rete.cc} 
                style={[RateStyle.rateLine,
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