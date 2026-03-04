import {Text} from "react-native"
import AppContent from "./ui/AppContent";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AppStyle from "./ui/AppStyle";

export default function App() {
    
    return <>
    <SafeAreaProvider>
        <SafeAreaView edges={['top', 'bottom']} style = {AppStyle.safeArea}>
            <AppContent />
        </SafeAreaView>
    </SafeAreaProvider>;
    </>
}