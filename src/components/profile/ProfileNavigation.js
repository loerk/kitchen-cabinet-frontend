import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack } from 'native-base';
import FavoritesScreen from './FavoritesScreen';
import SettingsScreen from './AppSettingsScreen';
import DietPreferencesScreen from './UserPreferencesScreen';

const TopTab = createMaterialTopTabNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <TopTab.Navigator>
        <TopTab.Screen name="Favorites" component={FavoritesScreen} />
        <TopTab.Screen
          name="Diet Preferences"
          component={DietPreferencesScreen}
        />
        <TopTab.Screen name="Settings" component={SettingsScreen} />
      </TopTab.Navigator>
    </Stack.Navigator>
  );
}
