import { BackHandler, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import AppContentStyle from "./AppContentStyle";
import Home from "../../pages/home/Home";
import { useEffect, useState } from "react";
import IRoute from "../../features/model/IRoute";
import Calc from "../../pages/calc/Calc";
import Not_Found from "../../features/model/Not Found";
const startPage:IRoute = {
    slug: 'home',
};

export default function AppContent() {
    const {width, height} = useWindowDimensions();
    const [history, setHistory] = useState<Array<IRoute>>([]);
    const [page, setPage] = useState<IRoute>(startPage);

    const navigate = (route:IRoute):void => {
        if(route.slug == "-1") {
            // console.log(`history.length = ${history.length}`);
            if(history.length > 0) {
                const prevPage = history.pop();
                setPage(prevPage!);
                setHistory(history);
            }
            else {
                BackHandler.exitApp();
                // console.log("BackHandler.exitApp();")
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
        console.log(history);
        const handler = BackHandler.addEventListener(
            'hardwareBackPress', () => {
                // console.log("back press");
                navigate({slug: '-1'});
                return true;
            });
        return () => handler.remove();    
    }, [history]);

    return <View style={AppContentStyle.container}>
        { width < height && 
            <View style={AppContentStyle.topBar}>
                <TouchableOpacity onPress={() => navigate({slug: '-1'})}>
                    <Text style={AppContentStyle.topBarBack}>
                        〈
                    </Text>    
                </TouchableOpacity>
                <Text style={AppContentStyle.topBarTitle}>Mobile-P33</Text>
                <View style={AppContentStyle.topBarIcon}></View>
            </View>
        }

        <View style={AppContentStyle.pageWidget}>
            { page.slug == "home" ? <Home />
            : page.slug == "calc" ? <Calc />
            : page.slug == "" ? <Not_Found />
            : <Not_Found />
            }
        </View>

        { width < height && 
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
                <TouchableOpacity onPress={() => navigate({slug: 'home'})}>
                    <Image style={AppContentStyle.bottomBarIcon} 
                        source={require('../asset/home.png')}/>
                </TouchableOpacity>
            </View>
        }
    </View>;
}
