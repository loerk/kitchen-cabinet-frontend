import {
  Spinner,
  Text,
  FlatList,
  Box,
  Pressable,
  ScrollView,
} from "native-base";

import { useGetIngredientsListQuery } from "../../features/api/apiSlice";

export const IngredientsList = ({
  ingredientQuery,
  setIngredientQuery,
  selectedIngredient,
  setSelectedIngredient,
}) => {
  const {
    data: ingredients,
    isLoading,
    isError,
  } = useGetIngredientsListQuery({ ingredient: ingredientQuery.toLowerCase() });

  if (ingredientQuery.length < 3) return null;

  if (isLoading) {
    return <Spinner text="Loading ..." />;
  }
  if (isError) {
    return <Text>An error occurred when fetching ingredient</Text>;
  }

  return (
    <ScrollView w={200} h="50">
      <FlatList
        data={ingredientQuery === selectedIngredient.name ? [] : ingredients}
        renderItem={({ item: ingredient }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
          >
            <Box maxW="300">
              <Select
                selectedValue={service}
                minWidth="200"
                accessibilityLabel="Choose Service"
                placeholder="Choose Service"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setService(itemValue)}
              >
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
                <Select.Item label="Cross Platform Development" value="cross" />
                <Select.Item label="UI Designing" value="ui" />
                <Select.Item label="Backend Development" value="backend" />
              </Select>
            </Box>

            <Pressable
              _pressed={{
                bg: "primary.400",
              }}
              cursor="pointer"
              flex={1}
              onPress={() => {
                setSelectedIngredient({
                  ...selectedIngredient,
                  name: ingredient.name,
                  id: ingredient.id,
                });
                setIngredientQuery(ingredient.name);
              }}
            >
              <Text
                _dark={{
                  color: "black.300",
                }}
                py={1}
                px={2}
                color="black.300"
                bold
              >
                {ingredient.name}
              </Text>
            </Pressable>
          </Box>
        )}
        keyExtractor={(ingredient) => ingredient.id}
      />
    </ScrollView>
  );
};
