import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// custom theme
import customTheme from './src/theme';

// custom components
import Dashboard from './src/components/Dashboard';
import Cabinet from './src/components/Cabinet';

export default function App() {
  
  return (
    <NativeBaseProvider theme={customTheme}>
      <SafeAreaProvider>
        {/* <Dashboard /> */}
        <Cabinet />
      </SafeAreaProvider>
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
