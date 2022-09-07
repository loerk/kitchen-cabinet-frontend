import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// custom components
import Dashboard from './src/components/Dashboard';

import Profile from './src/components/Profile';
import RecipesList from './src/components/recipes/RecipesList';
import ShoppingList from './src/components/ShoppingList';
import Filters from './src/components/Filters';
import Favorites from './src/components/Favorites';
import Cabinet from './src/components/Cabinet';
import HomeScreen from './src/components/Authentication/HomeScreen';
import LoginScreen from './src/components/Authentication/LoginScreen';
import RegisterScreen from './src/components/Authentication/RegisterScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Group>
        <Stack.Screen name="Cabinet" component={Cabinet} />
        <Stack.Screen name="Recipes" component={RecipesList} />
        <Stack.Screen name="Shopping List" component={ShoppingList} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Filters" component={Filters} />
        <Stack.Screen name="Favorites" component={Favorites} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigator;
