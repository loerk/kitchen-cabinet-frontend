import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// custom components
import Dashboard from './src/components/Dashboard';
import Cabinet from './src/components/Cabinet';
import Profile from './src/components/Profile';
import RecipesList from "./src/components/recipes/recipesList";

const Stack = createNativeStackNavigator();


const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="Cabinet" component={Cabinet} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigator;