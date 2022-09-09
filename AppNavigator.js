import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

// custom components
import Dashboard from './src/components/dashboard/Dashboard';
import ShoppingList from './src/components/ShoppingList';
import Cabinet from './src/components/cabinet/Cabinet';
import Diagrams from './src/components/Diagrams';

import { CabinetAddItemForm } from './src/components/cabinet/CabinetAddItemForm';

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
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
              color={focused ? 'black' : 'gray'}
            />
          );
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: '10%' },
        tabBarItemStyle: { padding: 5 },
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Cabinet" component={Cabinet} />
      <Tab.Screen name="Add" component={CabinetAddItemForm} />
      <Tab.Screen name="Shopping List" component={ShoppingList} />
      <Tab.Screen name="Diagrams" component={Diagrams} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
