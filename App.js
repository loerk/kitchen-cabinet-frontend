import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import RecipesList from "./components/recipes/recipesList";
import store from "./redux/store";

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <RecipesList />
        </View>
      </Provider>
    </NativeBaseProvider>
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
