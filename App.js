
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// custom theme
import customTheme from './src/theme';

// custom components
import Dashboard from './src/components/Dashboard';
import Cabinet from './src/components/Cabinet';
import Profile from './src/components/Profile';
import Footer from './src/components/Footer';


import { Provider } from "react-redux";
import RecipesList from "./src/components/recipes/recipesList";
import store from "./src/redux/store";

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NativeBaseProvider theme={customTheme}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Cabinet" component={Cabinet} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
          </NavigationContainer>
          <Footer />
        </SafeAreaProvider>
      </Provider>
    </NativeBaseProvider>
  );
}

