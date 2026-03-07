import { BackHandler, Image, Text, TouchableOpacity, View } from "react-native";
import AppContentStyle from "./AppContentStyle";
import Home from "../../pages/home/Home";
import { useEffect, useState } from "react";
import IRoute from "../../features/model/IRoute";
import Calc from "../../pages/calc/Calc";

const startPage:IRoute = {
    slug: 'home',
};

export default function AppContent() {
    const [history, setHistory] = useState<Array<IRoute>>([]);
    const [page, setPage] = useState<IRoute>(startPage);

    const navigate = (route:IRoute):void => {
        if(route.slug == "-1") {
            if(history.length > 0) {
                const prevPage = history.pop();
                setPage(prevPage!);
                setHistory(history);
            }
            else {
                BackHandler.exitApp();
            }
        }
        else if(route.slug != page.slug) {
            // Перехід на нову сторінку - збереження поточної
            // сторінки в історії та зміна поточної сторінки
            setHistory([...history, page]);
            setPage(route);
        }
    };

    useEffect(() => {
        const handler = BackHandler.addEventListener(
            'hardwareBackPress', () => {
                navigate({slug: '-1'});
                return true;
            });
        return () => handler.remove();    
    }, []);

    useEffect(() => {console.log(history)}, [history]);

    return <View style={AppContentStyle.container}>
        <View style={AppContentStyle.topBar}>
            <View style={AppContentStyle.topBarIcon}></View>
            <Text style={AppContentStyle.topBarTitle}>Mobile-P33</Text>
            <View style={AppContentStyle.topBarIcon}></View>
        </View>

        <View style={AppContentStyle.pageWidget}>
            { page.slug == "home" ? <Home />
            : page.slug == "calc" ? <Calc />
            : <Text>Not Found</Text>
            }
        </View>        

        <View style={AppContentStyle.bottomBar}>
            <TouchableOpacity onPress={() => navigate({slug: 'home'})}>
                <Image style={AppContentStyle.bottomBarIcon} 
                    source={require('../asset/home.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate({slug: 'calc'})}>
                <Image style={AppContentStyle.bottomBarIcon} 
                    source={require('../asset/calc.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate({slug: 'home'})}>
                <Image style={AppContentStyle.bottomBarIcon} 
                    source={require('../asset/home.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate({slug: 'calc'})}>
                <Image style={AppContentStyle.bottomBarIcon} 
                    source={require('../asset/calc.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate({slug: '-1'})}>
                <Image style={AppContentStyle.bottomBarIcon} 
                    source={require('../asset/home.png')}/>
            </TouchableOpacity>
        </View>
    </View>;
}
/*
Д.З. Створити сторінку "404", додати кнопку меню, що імітує
перехід на неіснуючу сторінку. 
*/