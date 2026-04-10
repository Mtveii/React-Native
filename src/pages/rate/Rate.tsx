import { Text, TouchableOpacity, TextInput, View, ScrollView } from "react-native";
import RateStyle from "./ui/RateStyle";
import INbuRate from "../../app/entities/NbuRate/model/INbuRate";
import { useEffect, useState } from "react";
import NbuRateApi from "../../app/entities/NbuRate/api/NbuRateApi";
import DatePicker from "react-native-date-picker";

export default function Rate() {
    const [rates, setRates] = useState<Array<INbuRate>>([]);
    const [shownRates, setShownRates] = useState<Array<INbuRate>>([]);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        NbuRateApi.getRates(date).then(setRates);
    }, [date]);

    useEffect(() => {
        if (search.length > 0) {
            setShownRates(
                rates.filter(r =>
                    r.cc.toLowerCase().includes(search.toLowerCase()) ||
                    r.txt.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setShownRates(rates);
        }
    }, [search, rates]);

    return (
        <View style={RateStyle.pageContainer}>
            <View style={RateStyle.header}>
                <Text style={RateStyle.pageTitle}>Курси НБУ</Text>
                <TouchableOpacity style={RateStyle.dateButton} onPress={() => setOpen(true)}>
                    <Text style={RateStyle.pageDate}>{date.toDateString()}</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={RateStyle.search}
                value={search}
                onChangeText={setSearch}
                placeholder="Пошук валюти або назви"
                placeholderTextColor="#bbb"
                clearButtonMode="while-editing"
            />

            <ScrollView style={RateStyle.list} contentContainerStyle={RateStyle.listContainer}>
                {shownRates.map((rate, i) => (
                    <View
                        key={rate.cc}
                        style={[
                            RateStyle.rateLine,
                            i % 2 === 0 ? RateStyle.rateLineEven : RateStyle.rateLineOdd,
                        ]}
                    >
                        <Text style={RateStyle.rateTxt}>{rate.txt}</Text>
                        <Text style={RateStyle.rateCc}>{rate.cc}</Text>
                        <Text style={RateStyle.rateRate}>{rate.rate}</Text>
                    </View>
                ))}
            </ScrollView>

            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={selectedDate => {
                    setOpen(false);
                    setDate(selectedDate);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </View>
    );
}
