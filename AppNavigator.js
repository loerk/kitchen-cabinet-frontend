import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorMode } from 'native-base';

// custom components
import Dashboard from './src/components/dashboard/Dashboard';
import Cabinet from './src/components/cabinet/Cabinet';
import Diagrams from './src/components/diagrams/Diagrams';
import Loading from './src/components/Loading';
import { CabinetAddItemForm } from './src/components/cabinet/CabinetAddItemForm';
import ShoppingList from './src/components/shoppinglist/Shoppinglist';
import FavoritesScreen from './src/components/profile/FavoritesScreen';
import SettingsScreen from './src/components/profile/AppSettingsScreen';
import DietPreferencesScreen from './src/components/profile/UserPreferencesScreen';

// auth components
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AuthStack from './src/authNavigation/AuthNavigator';
import { AuthContext } from './src/authNavigation/AuthProvider';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

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
              if (route.name === 'Dashboard') {
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
          <Tab.Screen name="Dashboard" component={DashboardScreenNavigator} />
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
        name="DashboardScreen"
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
        component={ProfileStack}
      />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  const { colorMode } = useColorMode();
  return (
    <TopTab.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        tabBarActiveTintColor: colorMode === 'dark' ? '#FCF5EA' : 'black',
        tabBarStyle: {
          height: '10%',
          backgroundColor: colorMode === 'dark' ? '#515050' : '#FCF5EA',
        },
        tabBarIndicatorStyle: {
          backgroundColor: colorMode === 'dark' ? '#FCF5EA' : '#891D47',
        },
      }}
    >
      <TopTab.Screen name="Favorites" component={FavoritesScreen} />
      <TopTab.Screen
        name="Diet Preferences"
        component={DietPreferencesScreen}
      />
      <TopTab.Screen name="Settings" component={SettingsScreen} />
    </TopTab.Navigator>
  );
};
