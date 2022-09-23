import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { MaterialIcons } from '@expo/vector-icons';
// custom components
import Dashboard from './src/components/dashboard/Dashboard';

import Cabinet from './src/components/cabinet/Cabinet';
import Diagrams from './src/components/diagrams/Diagrams';
import Loading from './src/components/Loading';
import Profile from './src/components/Profile';
// auth components
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AuthStack from './src/authNavigation/AuthNavigator';
import { AuthContext } from './src/authNavigation/AuthProvider';

import { CabinetAddItemForm } from './src/components/cabinet/CabinetAddItemForm';
import Favorites from './src/components/Favorites';
import { useColorMode } from 'native-base';
import ShoppingList from './src/shoppinglist/ShoppingList';
//const colorMode = useColorMode();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AppNavigator = () => {
  const { user, setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const { colorMode } = useColorMode();
  // Handle user state changes
  function AuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }
  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, AuthStateChanged);
    return subscriber;
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = 'home-filled';
              } else if (route.name === 'Cabinet') {
                iconName = 'kitchen';
              } else if (route.name === 'Add') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name === 'Shopping List') {
                iconName = 'list-alt';
              } else if (route.name === 'Diagrams') {
                iconName = 'stacked-bar-chart';
              }

              return (
                <MaterialIcons
                  name={iconName}
                  size={24}
                  color={
                    focused && colorMode === 'dark'
                      ? '#FCF5EA'
                      : focused
                      ? '#515050'
                      : 'grey'
                  }
                />
              );
            },
            headerShown: false,
            tabBarActiveTintColor: colorMode === 'dark' ? '#FCF5EA' : 'black',
            tabBarStyle: {
              height: '10%',
              backgroundColor: colorMode === 'dark' ? '#515050' : '#FCF5EA',
            },
            tabBarItemStyle: { padding: 5 },
          })}
        >
          <Tab.Screen name="Home" component={DashboardScreenNavigator} />
          <Tab.Screen name="Cabinet" component={Cabinet} />
          <Tab.Screen name="Add" component={CabinetAddItemForm} />
          <Tab.Screen name="Shopping List" component={ShoppingList} />
          <Tab.Screen name="Diagrams" component={Diagrams} />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </>
  );
};

export default AppNavigator;

export const DashboardScreenNavigator = () => {
  const { colorMode } = useColorMode();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTintColor: colorMode === 'dark' ? '#FCF5EA' : '#515050',
          headerStyle: {
            backgroundColor: colorMode === 'dark' ? '#515050' : '#FCF5EA',
          },
        }}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTintColor: colorMode === 'dark' ? '#FCF5EA' : '#515050',
          headerStyle: {
            backgroundColor: colorMode === 'dark' ? '#515050' : '#FCF5EA',
          },
        }}
        name="Favorites"
        component={Favorites}
      />
    </Stack.Navigator>
  );
};
