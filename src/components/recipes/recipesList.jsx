import { View, Text, Spinner } from "native-base";

import { StyleSheet } from "react-native";

import { useGetRecipeByIngredientsQuery } from "../../redux/apiSlice";

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
  } = useGetRecipeByIngredientsQuery("tomato");

  let content;

  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = items.map((item) => <CabinetExcerpt key={item.id} item={item} />);
  } else if (isError) {
    content = <Text>{error.toString()}</Text>;
  }
  console.log(items[1].title);
  return (
    <View style={styles.container}>
      <Text>RecipeList</Text>
      {items.map((item) => (
        <Text>{item.title}</Text>
      ))}
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
