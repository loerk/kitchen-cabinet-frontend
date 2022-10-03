import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';
import 'react-native-get-random-values';
import { uuidv4 } from '@firebase/util';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import {
  Avatar,
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from 'native-base';

import { useGetRecipeByIngredientsQuery } from '../../features/api/apiSlice';

import { RecipeCard } from '../utils/RecipeCard';

import { AuthContext } from '../../authNavigation/AuthProvider';
import ExpiryList from '../utils/ExpiryList';

function ExpirySuggestions({ items }) {
  const { cabinetId } = useContext(AuthContext);

  const [ingredients, setIngredients] = useState('');

  const payload = { cabinetId, ingredients };
  const { data: suggestedRecipes, isLoading } = useGetRecipeByIngredientsQuery(
    ingredients.length ? payload : skipToken
  );

  const reduced = items?.reduce((acc, curr) => {
    const date = new Date();
    const timeDifference = Math.round(
      (+new Date(curr.expiryDate) - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    let key = '';
    if (timeDifference < 0) {
      key = 'superUrgent';
      return { ...acc, [key]: [...(acc[key] ?? []), curr] };
    } else if (timeDifference < 10) {
      key = 'urgent';
      return { ...acc, [key]: [...(acc[key] ?? []), curr] };
    } else if (timeDifference < 30) {
      key = 'middle';
      return { ...acc, [key]: [...(acc[key] ?? []), curr] };
    }

    return acc;
  }, {});
  const getSoonRecipes = () => {
    setIngredients(reduced.middle.map((item) => item.name).join());
  };
  const getUrgentRecipes = () => {
    setIngredients(reduced.urgent.map((item) => item.name).join());
  };
  const getSuperUrgentRecipes = () => {
    setIngredients(reduced.superUrgent.map((item) => item.name).join());
  };
  if (!items) return;
  return (
    <Box>
      <Heading
        fontSize="2xl"
        style={{ fontWeight: 'bold', marginTop: 5, marginBottom: 3 }}
        textAlign={'center'}
      >
        Expiration Overview
      </Heading>
      <SafeAreaView>
        <ScrollView mx={3} horizontal={true} pb={5}>
          {reduced?.superUrgent && (
            <ExpiryList
              title={'Expired'}
              isLoading={isLoading}
              arr={reduced.superUrgent}
              action={getSuperUrgentRecipes}
            />
          )}
          {reduced?.urgent && (
            <ExpiryList
              title={'Expiring soon'}
              isLoading={isLoading}
              arr={reduced.urgent}
              action={getUrgentRecipes}
            />
          )}
          {reduced?.middle && (
            <ExpiryList
              title={'Expiring within 2 weeks'}
              isLoading={isLoading}
              arr={reduced.middle}
              action={getSoonRecipes}
            />
          )}
        </ScrollView>
        {ingredients && (
          <Box>
            <ScrollView horizontal={true}>
              {suggestedRecipes?.map((recipe) => {
                return <RecipeCard key={uuidv4()} item={recipe} />;
              })}
            </ScrollView>
          </Box>
        )}
      </SafeAreaView>
    </Box>
  );
}
export default ExpirySuggestions;
