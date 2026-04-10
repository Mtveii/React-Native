import { BackHandler, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import AppContentStyle from "./AppContentStyle";
import Home from "../../pages/home/Home";
import { useEffect, useState } from "react";
import IRoute from "../../features/model/IRoute";
import Calc from "../../pages/calc/Calc";
import Not_Found from "../../features/model/Not Found";
import { AppContext } from "../../features/context/AppContext";
import Rate from "../../pages/rate/Rate";
import Anim from "../../pages/anim/Anim";
import Swipe from "../../pages/swipe/Swipe";

const startPage:IRoute = {
    slug: 'home',
};

export default function AppContent() {
    const {width, height} = useWindowDimensions();
    const [history, setHistory] = useState<Array<IRoute>>([]);
    const [page, setPage] = useState<IRoute>(startPage);

    const navigate = (route:IRoute):void => {
        if (route.slug === "-1") {
            if (history.length > 0) {
                const newHistory = [...history];
                const prevPage = newHistory.pop();
                setHistory(newHistory);
                if (prevPage) {
                    setPage(prevPage);
                }
            } else {
                BackHandler.exitApp();
            }
        }
        else if (route.slug !== page.slug) {
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
    }, [history]);

    return (
        <AppContext.Provider value={{navigate}}>
            <View style={AppContentStyle.container}>
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
                    { page.slug === "home" ? <Home />
                    : page.slug === "calc" ? <Calc />
                    : page.slug === "rate" ? <Rate />
                    : page.slug === "anim" ? <Anim />
                    : page.slug === "swipe" ? <Swipe />
                    : <Not_Found />
                    }
                </View>

                { width < height && 
                    <View style={AppContentStyle.bottomBar}>
                        <TouchableOpacity onPress={() => navigate({slug: 'home'})}>
                            <Image style={AppContentStyle.bottomBarIcon} 
                                source={require('../../features/asset/home.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate({slug: 'calc'})}>
                            <Image style={AppContentStyle.bottomBarIcon} 
                                source={require('../../features/asset/calc.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate({slug: 'rate'})}>
                            <Image style={AppContentStyle.bottomBarIcon} 
                                source={require('../../features/asset/rate.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate({slug: 'anim'})}>
                            <Image style={AppContentStyle.bottomBarIcon} 
                                source={require('../../features/asset/rate.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate({slug: 'swipe'})}>
                            <Image style={AppContentStyle.bottomBarIcon} 
                                source={require('../../features/asset/swipe.png')}/>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </AppContext.Provider>
    );
}
