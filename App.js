import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
// custom theme
import customTheme from "./src/theme";
// stack navigator
import AppNavigator from "./AppNavigator";
// custom components
import Footer from "./src/components/Footer";

// redux
import { Provider } from "react-redux";
import store from "./src/app/store";

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Provider store={store}>
        <SafeAreaProvider>
          {/* <Dashboard /> */}
          <NavigationContainer>
            <AppNavigator />
            <Footer />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </NativeBaseProvider>
  );
}
