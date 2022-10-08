import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';
import 'react-native-get-random-values';
import { uuidv4 } from '@firebase/util';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Box, Heading, ScrollView } from 'native-base';

import { useGetRecipeByIngredientsQuery } from '../../features/api/apiSlice';

import { RecipeCard } from '../utils/RecipeCard';

import { AuthContext } from '../../authNavigation/AuthProvider';
import ExpiryList from '../utils/ExpiryList';

function ExpirySuggestions({ cabinetItems }) {
  const { cabinetId } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState('');
  const payload = { cabinetId, ingredients };
  const { data: suggestedRecipes, isLoading } = useGetRecipeByIngredientsQuery(
    ingredients.length ? payload : skipToken
  );

  const sortedCabinetItems = cabinetItems?.reduce((acc, curr) => {
    const date = new Date();
    const CURRENT_DATE = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const expired = +new Date(CURRENT_DATE) > +new Date(curr.expiryDate);
    const remainingDaysLeft = Math.round(
      (+new Date(curr.expiryDate) - +new Date(CURRENT_DATE)) /
        (1000 * 60 * 60 * 24)
    );
    const twoWeeksLeft = Math.abs(remainingDaysLeft) <= 14;
    const fiveDaysLeft = Math.abs(remainingDaysLeft) <= 5;

    let key = '';
    if (expired) {
      key = 'expired';
      return { ...acc, [key]: [...(acc[key] ?? []), curr] };
    } else if (twoWeeksLeft) {
      key = 'twoWeeksLeft';
      return { ...acc, [key]: [...(acc[key] ?? []), curr] };
    } else if (fiveDaysLeft) {
      key = 'fiveDaysLeft';
      return { ...acc, [key]: [...(acc[key] ?? []), curr] };
    }

    return acc;
  }, {});
  const getSoonRecipes = () => {
    setIngredients(
      sortedCabinetItems.twoWeeksLeft.map((item) => item.name).join()
    );
  };
  const getUrgentRecipes = () => {
    setIngredients(
      sortedCabinetItems.fiveDaysLeft.map((item) => item.name).join()
    );
  };
  const getSuperUrgentRecipes = () => {
    setIngredients(sortedCabinetItems.expired.map((item) => item.name).join());
  };
  if (!cabinetItems) return;
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
          {sortedCabinetItems?.expired && (
            <ExpiryList
              title={'Expired'}
              isLoading={isLoading}
              arr={sortedCabinetItems.expired}
              action={getSuperUrgentRecipes}
            />
          )}
          {sortedCabinetItems?.fiveDaysLeft && (
            <ExpiryList
              title={'Expiring soon'}
              isLoading={isLoading}
              arr={sortedCabinetItems.fiveDaysLeft}
              action={getUrgentRecipes}
            />
          )}
          {sortedCabinetItems?.twoWeeksLeft && (
            <ExpiryList
              title={'Expiring within 2 weeks'}
              isLoading={isLoading}
              arr={sortedCabinetItems.twoWeeksLeft}
              action={getSoonRecipes}
            />
          )}
        </ScrollView>
        {ingredients && (
          <Box>
            <ScrollView horizontal={true}>
              {suggestedRecipes?.map((recipe) => {
                return <RecipeCard key={uuidv4()} recipe={recipe} />;
              })}
            </ScrollView>
          </Box>
        )}
      </SafeAreaView>
    </Box>
  );
}
export default ExpirySuggestions;
