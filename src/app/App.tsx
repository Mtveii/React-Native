import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppContent from "./ui/AppContent";
import AppStyle from "./ui/AppStyle";

export default function App() {
    
    return <SafeAreaProvider>
        <SafeAreaView 
            edges={['top', 'bottom']} 
            style={AppStyle.safeArea}>

            <AppContent />
            
        </SafeAreaView>
    </SafeAreaProvider>;
}
