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
    
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    };

    useEffect (() => {
        const formattedDate = formatDate(date);
        NbuRateApi.getRatesByDate(formattedDate).then(setRates);
    }, [date]);

useEffect(() => {
    if (search.length > 0) {
        // Добавляем вызов .includes(search) и приведение к регистру
        setShownRates(
            rates.filter(r => 
                r.cc.toLowerCase().includes(search.toLowerCase()) || 
                r.txt.toLowerCase().includes(search.toLowerCase())
            )
        );
    } else {
        setShownRates(rates);
    }
}, [search, rates]); // Добавили rates в зависимости

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