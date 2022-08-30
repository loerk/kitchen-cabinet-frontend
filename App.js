import { StatusBar } from "expo-status-bar";
import { Button } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { toggleTheme } from "./redux/themeSlize";
export default function App() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  console.log(theme);
  return (
    <Provider store={store}>
      <View
        style={[
          styles.container,
          theme === "dark"
            ? { backgroundColor: "red" }
            : { backgroundColor: "blue" },
        ]}
      >
        <Text>kitchen cabinet</Text>
        <Button onPress={() => dispatch(toggleTheme("dark"))}>
          toggle theme
        </Button>
        <StatusBar style="auto" />
      </View>
    </Provider>
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
