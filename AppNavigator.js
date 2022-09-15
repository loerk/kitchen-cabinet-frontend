import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useColorMode } from 'native-base';
import { useLinkTo } from '@react-navigation/native';

// custom components
import Dashboard from './src/components/dashboard/Dashboard';
import ShoppingList from './src/components/ShoppingList';
import Cabinet from './src/components/cabinet/Cabinet';
import Diagrams from './src/components/Diagrams';
import Loading from './src/components/Loading';
import Profile from './src/components/Profile';
// auth components
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AuthStack from './src/authNavigation/AuthNavigator';
import { AuthContext } from './src/authNavigation/AuthProvider';

import { CabinetAddItemForm } from './src/components/cabinet/CabinetAddItemForm';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const colorMode = useColorMode();
  const linkTo = useLinkTo();

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
                  color={focused ? '#891D47' : 'gray'}
                />
              );
            },
            tabBarActiveTintColor: '#891D47',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { height: '10%' },
            tabBarItemStyle: { padding: 5 },

            headerStyle: {
              backgroundColor: '#FCF5EA',
            },
            headerTintColor: '#891D47',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen name="Home" component={Dashboard} />
          <Tab.Screen
            name="Cabinet"
            component={Cabinet}
            options={{
              headerRight: () => (
                <EvilIcons
                  name="user"
                  size={34}
                  color={
                    colorMode === 'light' ? 'secondary.100' : 'primary.100'
                  }
                />
              ),
            }}
          />
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
