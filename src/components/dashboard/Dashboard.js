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
} from 'native-base';

import {
  useGetCabinetItemsQuery,
  useGetRecipeByIngredientsQuery,
} from '../../features/api/apiSlice';

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

  let content;

  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    console.log(items);
    const { data: recipes } = useGetRecipeByIngredientsQuery(
      items.map((item) => item.name).join(',')
    );
    console.log(recipes);
    content = recipes /* .map((recipe) => (
      <Text key={recipe._id}>{recipe.title}</Text> 
    )) */;
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
          Items in your cabinet:{' '}
        </Text>
        <View>{content}</View>
      </Center>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });

export default Dashboard;
