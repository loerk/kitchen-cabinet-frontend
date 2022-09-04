import {
  Spinner,
  Text,
  FlatList,
  Box,
  VStack,
  Pressable,
  Center,
  ScrollView,
} from "native-base";

import { useGetIngredientsListQuery } from "../../features/api/apiSlice";

export const IngredientsList = ({ ingredient, selected, setSelected }) => {
  const {
    data: ingredients,
    isLoading,
    isError,
  } = useGetIngredientsListQuery({ ingredient: ingredient.toLowerCase() });

  if (ingredient.length < 3) return null;

  if (isLoading) {
    return <Spinner text="Loading ..." />;
  }
  if (isError) {
    return <Text>An error occurred when fetching ingredient</Text>;
  }

  return (
    <ScrollView w={["200", "300"]} h="80">
      <FlatList
        data={ingredients}
        renderItem={({ item: ingredient }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "muted.50",
            }}
            borderColor="muted.800"
          >
            <Pressable
              _pressed={{
                bg: "primary.200",
              }}
              bg="primary.100"
              cursor="pointer"
              flex={1}
              onPress={() => {
                setSelected({ name: ingredient.name, id: ingredient.id });
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
