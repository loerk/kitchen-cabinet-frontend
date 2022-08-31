import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import RecipesList from "./src/components/recipes/recipesList";
import store from "./src/redux/store";

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <View style={styles.container}>
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
