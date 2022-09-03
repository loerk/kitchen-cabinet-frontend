import { Spinner, Text, FlatList, Box, VStack } from "native-base";
import { useGetIngredientsListQuery } from "../../features/api/apiSlice";

export const IngredientsList = ({ ingredient }) => {
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
    <FlatList
      data={ingredients}
      renderItem={({ item: ingredient }) => (
        <Box
          borderBottomWidth="1"
          _dark={{
            borderColor: "muted.50",
          }}
          borderColor="muted.800"
          pl={["0", "4"]}
          pr={["0", "5"]}
          py="2"
        >
          <VStack>
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              bold
            >
              {ingredient.name}
            </Text>
          </VStack>
        </Box>
      )}
      keyExtractor={(ingredient) => ingredient.id}
    />
  );
};
