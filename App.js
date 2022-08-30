import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { StyleProviderThemed } from './StyleProviderThemed';

export default function App() {
  return (
    <StyleProviderThemed>
    <View style={styles.container}>
      <Text>kitchen cabinet</Text>
      <StatusBar style="auto" />
    </View>
    </StyleProviderThemed>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
