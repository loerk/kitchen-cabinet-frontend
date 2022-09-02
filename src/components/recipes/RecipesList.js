import { View, Text, Spinner } from "native-base";

import { StyleSheet } from "react-native";

import { useGetFilteredRecipesQuery } from "../../features/api/apiSlice";

let CabinetExcerpt = ({ item }) => {
  return <Text>{item.title}</Text>;
};

export default function RecipesList() {
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFilteredRecipesQuery({
    query: "banana",
    type: "breakfast",
  });

  let content;

  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = items.results.map((item) => (
      <CabinetExcerpt key={item.id} item={item} />
    ));
  } else if (isError) {
    content = <Text>{error.toString()}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>RecipeList</Text>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
