import React from 'react';
import { useGetCabinetItemsQuery } from '../features/api/apiSlice';
import { Text, Spinner, Image } from 'native-base';

/**
 * @param {String} cabinetID
 * @desc A function to get all items in a cabinet by cabinet id
 * @return list of items
 */
const getCabinetItems = (cabinetID) => {
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCabinetItemsQuery(cabinetID);

  if (isLoading) {
    return <Spinner text="Loading..." />;
  } else if (isSuccess) {
    return items.map((item) => {
      return {
        item,
        formatted: (
          <Text key={item.id}>
            {item.name}{' '}
            <Image
              key={item.id}
              source={{
                uri: `https://spoonacular.com/cdn/ingredients_500x500/${item.image}`,
              }}
              alt="ingredient image"
              size="sm" // sizes: "xs", "sm", "md", "lg", "xl", "2xl"
            />
          </Text>
        ),
      };
    });
  } else if (isError) {
    return <Text>{error.toString()}</Text>;
  }
};

export default getCabinetItems;
