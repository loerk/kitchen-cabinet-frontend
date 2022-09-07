import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Divider,
  StatusBar,
  useColorMode,
  Heading,
  Text,
  Spinner,
  Center,
  Image,
  ScrollView,
} from 'native-base';

/* import {
     useGetRecipeByIngredientsQuery,
} from '../../features/api/apiSlice'; */
/* import { skipToken } from '@reduxjs/toolkit/query/react'; */

import getCabinetItems from '../../helpers/getCabinetItems';

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'black' : 'white';
  const user = { username: 'Manfred' }; // to hold the user's data

  /*   const { data: recipes } = useGetRecipeByIngredientsQuery( isSuccess ?
    items.map((item) => item.name).join(',') : skipToken ); */
  /*  content = recipes && recipes.map((recipe) => (
      <Text key={recipe.id}>{recipe.title} ( Used Ingredients: {recipe.usedIngredientCount} ) {/* {recipe.missedIngredients.map((item) => (<Text key={}>{item}</Text>))} */
  /* )); */

  const cabinetItems = getCabinetItems();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: bgColor, color: !bgColor }]}
    >
      <StatusBar
        barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Text>Welcome</Text>
      <Heading>{user.username && `${user.username}`}</Heading>
      <Divider />
      <Center>
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>
          Suggested Recipes:{' '}
        </Text>
        <ScrollView>{cabinetItems}</ScrollView>
      </Center>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default Dashboard;
