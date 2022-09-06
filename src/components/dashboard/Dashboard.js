import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Divider,
  StatusBar,
  useColorMode,
  View,
  Heading,
  Text,
  Spinner,
  Center,
  Image,
  ScrollView,
} from 'native-base';

import {
  useGetCabinetItemsQuery,
  /*   useGetRecipeByIngredientsQuery, */
} from '../../features/api/apiSlice';
/* import { skipToken } from '@reduxjs/toolkit/query/react'; */

const Dashboard = () => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === 'dark' ? 'black' : 'white';
  const user = { username: 'Manfred' }; // to hold the user's data

  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCabinetItemsQuery('6315f1e0801fa7692c1bb736');

  /*   const { data: recipes } = useGetRecipeByIngredientsQuery( isSuccess ?
    items.map((item) => item.name).join(',') : skipToken ); */

  let content;

  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    console.log(items);
    content = items.map((item) => {
      console.log(item.image);
      return (
        <Text key={item.id}>
          {item.name}{' '}
          <Image
            key={item.id}
            source={{
              uri: `https://spoonacular.com/cdn/ingredients_500x500/${item.image}`,
            }}
            alt="ingredient image"
            size="xl"
          />
        </Text>
      );
    }); /* }</Text>  */

    /*  content = recipes && recipes.map((recipe) => (
      <Text key={recipe.id}>{recipe.title} ( Used Ingredients: {recipe.usedIngredientCount} ) {/* {recipe.missedIngredients.map((item) => (<Text key={}>{item}</Text>))} */
    /* )); */
  } else if (isError) {
    content = <Text>{error.toString()}</Text>;
  }

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
        <ScrollView>{content}</ScrollView>
      </Center>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default Dashboard;
