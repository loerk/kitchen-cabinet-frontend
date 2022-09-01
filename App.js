import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// custom theme
import customTheme from "./src/theme";

// custom components
import Dashboard from "./src/components/Dashboard";
import Cabinet from "./src/components/Cabinet";

import { Provider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Provider store={store}>
        <SafeAreaProvider>
          {/* <Dashboard /> */}

          <Cabinet />
        </SafeAreaProvider>
      </Provider>
    </NativeBaseProvider>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
}); */
